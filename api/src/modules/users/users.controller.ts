import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	ParseUUIDPipe,
	HttpStatus,
	Put,
	Patch,
	Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Auth, GetUser } from '../auth/common/decorators';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import {
	CreateUserDto,
	OptionsQueryUser,
	RecoverPasswordDto,
	RequestPasswordEmailDto,
	UpdateUserDto,
} from './dto';
import { ValidRoles } from '@teslo/interfaces';

@Controller('users')
@ApiTags('1 - Users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	@Auth(ValidRoles.ADMIN, ValidRoles.SUPER_USER)
	@ApiResponse({ type: User, status: HttpStatus.CREATED })
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
	create(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto);
	}

	@Get()
	@Auth(ValidRoles.ADMIN, ValidRoles.SUPER_USER)
	@ApiResponse({ status: HttpStatus.OK, type: User, isArray: true })
	findAll() {
		return this.usersService.findAll();
	}

	@Get(':term')
	@ApiResponse({ status: HttpStatus.OK, type: User, isArray: false })
	@ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User Not Found' })
	findOne(@Param('term', ParseUUIDPipe) term: string) {
		return this.usersService.findOne(term);
	}

	@Get(':email/:token')
	@ApiResponse({ status: HttpStatus.OK, type: User, isArray: false })
	@ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User Not Found' })
	findByEmailAndToken(@Param('email') email: string, @Param('token') token: string) {
		return this.usersService.findByEmailAndToken(email, token);
	}

	@Put(':iduser')
	@ApiResponse({ status: HttpStatus.OK, type: User, isArray: false })
	@Auth(ValidRoles.ADMIN, ValidRoles.SUPER_USER)
	update(
		@Param('iduser', ParseUUIDPipe) iduser: string,
		@Body() updateUserDto: UpdateUserDto
	) {
		return this.usersService.update(iduser, updateUserDto);
	}

	@Delete(':iduser')
	@Auth(ValidRoles.ADMIN, ValidRoles.SUPER_USER)
	@ApiResponse({ isArray: false, type: User, status: HttpStatus.OK })
	remove(@Param('iduser', ParseUUIDPipe) iduser: string) {
		return this.usersService.remove(iduser);
	}

	@Patch('/sendRequestPassword')
	async sendRequestPassword(@Body() requestPasswordEmailDto: RequestPasswordEmailDto) {
		await this.usersService.sendRequestPassword(requestPasswordEmailDto);
		return { msg: 'Mensaje enviado correctamente' };
	}

	@Patch('/recoverPassword')
	async recoverPassword(@Body() recoverPasswordDto: RecoverPasswordDto) {
		await this.usersService.recoverPassword(recoverPasswordDto);
		return { msg: 'Contraseña recuperada correctamente.' };
	}

	@Patch('/profile/user')
	@Auth()
	@ApiResponse({ isArray: false, type: User, status: HttpStatus.OK })
	async updateProfile(
		@GetUser() currentUser: User,
		@Body() updateUserDto: UpdateUserDto,
		@Query() query: OptionsQueryUser
	) {
		return this.usersService.update(
			currentUser.iduser,
			updateUserDto,
			query.returnUser
		);
	}
}
