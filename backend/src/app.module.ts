import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { DataSource } from 'typeorm';
import { Post } from './entities/post.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'sns_postgres-db',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'sns',
      entities: [User,Post],
      // synchronize: true,  // 本番環境では使わない // downしてからだとエラーでる
      // autoLoadEntities: true,   //  エンティティは自動的にロード
      // migrations: ['src/migration/*.ts'],  // こいつが悪さしてる？
    }),
    UsersModule,
    PostsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
