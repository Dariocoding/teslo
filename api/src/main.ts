import { NestFactory } from "@nestjs/core";
import { ValidationPipe, Logger } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { SwaggerTheme } from "swagger-themes";
import { AppModule } from "./app.module";
import type { Request, Response, NextFunction } from "express";

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { cors: true });
	const logger = new Logger("Bootstrap");

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
		})
	);

	const config = new DocumentBuilder()
		.setTitle("Teslo RESTFul API")
		.setDescription("Teslo shop endpoints")
		.setVersion("1.0")
		.addBearerAuth(
			{
				type: "http",
				scheme: "bearer",
				bearerFormat: "JWT",
				name: "JWT",
				description: "Enter JWT token",
				in: "header",
			},
			"JWT-auth"
		)
		.build();

	const theme = new SwaggerTheme("v3");
	const document = SwaggerModule.createDocument(app, config);

	SwaggerModule.setup("", app, document, {
		customCss: theme.getBuffer("classic"),
		swaggerOptions: {
			tagsSorter: "alpha",
			operationsSorter: "alpha",
		},
	});

	app.use((req: Request, res: Response, next: NextFunction) => {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
		res.header(
			"Access-Control-Allow-Headers",
			"x-access-token, Origin, X-Requested-With, Content-Type, Accept"
		);

		next();
	});

	app.enableCors();

	await app.listen(process.env.PORT);
	logger.log(`App running on port ${process.env.PORT}`);
}

bootstrap();
