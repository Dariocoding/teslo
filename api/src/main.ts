//@ts-check
import { NestFactory } from "@nestjs/core";
import { ValidationPipe, Logger } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { SwaggerTheme } from "swagger-themes";
import { AppModule } from "./app.module";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import * as compression from "compression";
import * as os from "os";
const cluster = require("node:cluster");
const numCPUs = os.cpus().length;

console.log({ numCPUs });

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter({}));
  const logger = new Logger("Bootstrap");

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );
  app.use(compression());

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

  app.enableCors();

  await app.listen(process.env.PORT, "0.0.0.0");
  logger.log(`App running on port ${process.env.PORT}`);
  logger.log(`Server ready at ${await app.getUrl()}`);
}

if (cluster.isMaster) {
  console.log(`Master server started on ${process.pid}`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Restarting`);
    cluster.fork();
  });
} else {
  console.log(`Cluster server started on ${process.pid}`);
  bootstrap();
}
