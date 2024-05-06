import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class SwaggerDocumentBuilder {
  constructor(
    private readonly app: INestApplication<any>,
    private swaggerUrl,
  ) {}

  private buildConfig() {
    return new DocumentBuilder()
      .setTitle('Notes')
      .setDescription('The Notes API documentation')
      .setVersion('1.0.0')
      .addBearerAuth()
      .build();
  }

  private createDocument() {
    const config = this.buildConfig();
    return SwaggerModule.createDocument(this.app, config);
  }

  setupSwagger() {
    const document = this.createDocument();
    SwaggerModule.setup(this.swaggerUrl, this.app, document);
  }
}
