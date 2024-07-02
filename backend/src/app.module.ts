import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { ConfigModule } from '@nestjs/config';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';


@Module({
  imports: [
    PrismaModule,
    UserModule
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, PrismaService],
})

export class AppModule {
  // constructor(private dataSource: DataSource) {}
}
