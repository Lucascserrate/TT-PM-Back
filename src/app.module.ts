import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectModule } from './project/project.module';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
require('dotenv').config();
const { DB_PASSWORD, DB_PORT, DB_USER, DB_NAME, DB_HOST } = process.env;

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }),
    ProjectModule,
    UserModule,
    TaskModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
