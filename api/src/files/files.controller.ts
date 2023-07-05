import {
	Controller,
	Get,
	Post,
	Param,
	UploadedFile,
	BadRequestException,
	Res,
} from "@nestjs/common";
import { ApiParam, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { FilesService } from "./files.service";
import { Auth } from "src/modules/auth/common/decorators";
import { ValidRoles } from "@teslo/interfaces";
import { UploadImage } from "./common/decorators/uploadImage";
import { uploadCustomFileName } from "./common/utils/uploadCustomFileName";

@ApiTags("Files - Get and Upload")
@Controller("files")
export class FilesController {
	constructor(private readonly filesService: FilesService) {}

	@Get("product/:imageName")
	findProductImage(@Res() res: Response, @Param("imageName") imageName: string) {
		const path = this.filesService.getStaticProductImage(imageName);
		res.sendFile(path);
	}

	@Get("logo_enterprise/:mode/:type")
	@ApiParam({ name: "mode", enum: ["dark", "light"] })
	@ApiParam({ name: "type", enum: ["full", "streamline"] })
	findLogoEnterpriseImage(
		@Res() res: Response,
		@Param("mode") mode: string,
		@Param("type") type: string
	) {
		const path = this.filesService.getLogoEnterpriseImage(mode, type);
		res.sendFile(path);
	}

	@Post("logo_enterprise/:mode/:type")
	@ApiParam({ name: "mode", enum: ["dark", "light"] })
	@ApiParam({ name: "type", enum: ["full", "streamline"] })
	@UploadImage({ destination: "logo_enterprise" })
	/* @Auth(ValidRoles.ADMIN, ValidRoles.SUPER_USER) */
	async uploadLogoEnterpriseImage(
		@UploadedFile() file: Express.Multer.File,
		@Param("mode") mode: string,
		@Param("type") type: string
	) {
		if (!file) {
			throw new BadRequestException("Make sure that the file is an image");
		}
		const name = `logo-${mode}-${type}.png`;
		await uploadCustomFileName({
			filename: file.filename,
			name,
			extension: "png",
			location: "logo_enterprise",
		});

		return { secureUrl: name };
	}

	@Post("product")
	@UploadImage({ destination: "products" })
	@Auth(ValidRoles.ADMIN, ValidRoles.SUPER_USER)
	uploadProductImage(@UploadedFile() file: Express.Multer.File) {
		if (!file) {
			throw new BadRequestException("Make sure that the file is an image");
		}
		const secureUrl = file.filename;
		return { secureUrl };
	}
}
