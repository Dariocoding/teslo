import {
	Controller,
	Get,
	Post,
	Param,
	UploadedFile,
	UseInterceptors,
	BadRequestException,
	Res,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { Response } from 'express';
import { diskStorage } from 'multer';
import { FilesService } from './files.service';

import { fileFilter, fileNamer } from './utils';
import { Auth } from 'src/modules/auth/common/decorators';
import { ValidRoles } from '@teslo/interfaces';

@ApiTags('Files - Get and Upload')
@Controller('files')
export class FilesController {
	constructor(private readonly filesService: FilesService) {}

	@Get('product/:imageName')
	findProductImage(@Res() res: Response, @Param('imageName') imageName: string) {
		const path = this.filesService.getStaticProductImage(imageName);
		res.sendFile(path);
	}

	@Post('product')
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				file: {
					type: 'string',
					format: 'binary',
				},
			},
		},
	})
	@UseInterceptors(
		FileInterceptor('file', {
			fileFilter: fileFilter,
			// limits: { fileSize: 1000 }
			storage: diskStorage({
				destination: './static/products',
				filename: fileNamer,
			}),
		})
	)
	@Auth(ValidRoles.ADMIN, ValidRoles.SUPER_USER)
	uploadProductImage(@UploadedFile() file: Express.Multer.File) {
		if (!file) {
			throw new BadRequestException('Make sure that the file is an image');
		}
		const secureUrl = file.filename;
		return { secureUrl };
	}
}
