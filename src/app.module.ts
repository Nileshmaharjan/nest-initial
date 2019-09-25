import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './modules/books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './config/typeorm.config';
import { UserModule } from './modules/user/user.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpErrorFilter } from './shared/http-error.filter';
import { LoggingInterceptor } from './shared/logging.interceptor';
import { NestMinioClientModule } from './modules/nest-minio-client/nest-minio-client.module';
@Module({
  imports: [BooksModule, InventoryModule, TypeOrmModule.forRoot(typeormConfig), UserModule, NestMinioClientModule],
  controllers: [],
  providers: [
    {
    provide: APP_FILTER,
    useClass: HttpErrorFilter,
    },
    {
    provide: APP_INTERCEPTOR,
    useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
