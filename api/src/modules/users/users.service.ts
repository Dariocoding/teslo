import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOperator, Not, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { handleDBErrors } from 'src/common/utils/handleDBErros';
import { isUUID } from 'class-validator';
import { validateEmail } from 'src/common/utils';
import { MailService } from 'src/mail/mail.service';
import { RecoverPasswordDto, RequestPasswordEmailDto, CreateUserDto, UpdateUserDto } from './dto';
import { v4 as UUID } from 'uuid';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		private readonly mailService: MailService,
		private readonly configService: ConfigService
	) {}

	async create(createUserDto: CreateUserDto) {
		try {
			const { password, ...userData } = createUserDto;

			const user = this.userRepository.create({
				...userData,
				password: this.hashPassword(password),
			});

			await this.userRepository.save(user);
			delete user.password;

			return user;
		} catch (error) {
			handleDBErrors(error);
		}
	}

	findAll() {
		return this.userRepository.find({
			where: { isDeleted: Not(true) as FindOperator<true> },
			order: { dateCreated: 'DESC' },
		});
	}

	async findOne(term: string) {
		let user: User;
		if (isUUID(term)) {
			user = await this.userRepository.findOneBy({
				iduser: term,
				isDeleted: false,
			});
		} else if (validateEmail(term)) {
			user = await this.userRepository.findOne({
				where: { email: term.toLowerCase().trim(), isDeleted: false },
			});
		}

		if (!user) throw new NotFoundException('User not found');

		return user;
	}

	async findByEmailAndToken(email: string, token: string) {
		const user = await this.userRepository.findOneBy({
			email: email.trim().toLowerCase(),
			token,
		});

		if (!user) throw new NotFoundException('User not found');

		return user;
	}

	async update(iduser: string, updateUserDto: UpdateUserDto) {
		try {
			await this.findOne(iduser);

			if (updateUserDto.password) {
				updateUserDto.password = this.hashPassword(updateUserDto.password);
			}

			if (updateUserDto.email) {
				updateUserDto.email = updateUserDto.email
					.trim()
					.toLocaleLowerCase();
			}

			await this.userRepository.update({ iduser }, updateUserDto);
			return this.findOne(iduser);
		} catch (error) {
			handleDBErrors(error);
		}
	}

	async remove(iduser: string) {
		const user = await this.findOne(iduser);
		await this.userRepository.update({ iduser }, { isDeleted: true });
		return user;
	}

	async sendRequestPassword(requestPasswordEmailDto: RequestPasswordEmailDto) {
		const { email } = requestPasswordEmailDto;
		const user = await this.findOne(email);

		const token = UUID();

		await this.userRepository.update({ iduser: user.iduser }, { token });

		const HOST_APP = this.configService.get('HOST_APP');
		const url = `${HOST_APP}/recover-password/${token}/${email}`;

		await this.mailService.forgetPassword({ urlRecovery: url, user });
	}

	async recoverPassword(recoverPasswordDto: RecoverPasswordDto) {
		const { password, passwordConfirm, email, token, iduser } = recoverPasswordDto;

		if (password !== passwordConfirm) {
			throw new BadRequestException('Passwords do not match');
		}

		const user = await this.userRepository.findOneBy({
			email,
			token,
			iduser,
		});

		if (!user) {
			throw new NotFoundException(
				'This user does not exist or the tokens do not match'
			);
		}

		await this.userRepository.update(
			{ iduser },
			{ token: null, password: this.hashPassword(password) }
		);
	}

	private hashPassword(password: string) {
		return bcrypt.hashSync(password, 10);
	}
}
