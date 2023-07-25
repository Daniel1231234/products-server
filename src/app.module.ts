import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from "@nestjs/config";

import * as config from "./config/configuration"
import configuration from "./config/configuration";
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ProductModule } from './products/products.module';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    MongooseModule.forRoot(config.default().mongoUri),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public"),
      exclude: ['/api/(.*)'],
    }),
    ProductModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
