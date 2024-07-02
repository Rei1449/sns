import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { DataSource } from 'typeorm';
import { Post } from './entities/post.entity';
import { TestModule } from './test/test.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      // url : 'https://oxcsqcxvwuajpgwydtzr.supabase.co',
      // host : "postgresql://postgres.oxcsqcxvwuajpgwydtzr:Z-2003taichi@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres?pgbouncer=true",
      // host: 'postgresql://postgres.gjqrmubofcrkvikjvzwa:Team4snsTakekawa@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres',
      // host: 'gjqrmubofcrkvikjvzwa.supabase.co',

      username: 'postgres.gjqrmubofcrkvikjvzwa',
      password: 'Team4snsTakekawa',
      database: 'postgres',
      host: 'aws-0-ap-northeast-1.pooler.supabase.com',
      port: 5432,

      logging: true,

      // ドッカー
      // host: 'sns_postgres-db',
      // port: 5432,
      // username: 'postgres',
      // password: 'password',
      // database: 'test_sns',

      entities: [User,Post],
      synchronize: false,  // 本番環境では使わない // downしてからだとエラーでる
      // autoLoadEntities: true,   //  エンティティは自動的にロード
      // migrations: ['src/migration/*.ts'],  // こいつが悪さしてる？
    }),
    UsersModule,
    PostsModule,
    TestModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
