import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entities/user.entity"
import { Post } from "./entities/post.entity"

export const AppDataSource = new DataSource({
    type: 'postgres',
    username: 'postgres.gjqrmubofcrkvikjvzwa',
    password: 'Team4snsTakekawa',
    database: 'postgres',
    host: 'aws-0-ap-northeast-1.pooler.supabase.com',
    port: 5432,

    logging: true,
    entities: [User, Post],
    synchronize: true,  // 本番環
    // logging: false,
    migrations: ['src/migration/*.ts'],
})