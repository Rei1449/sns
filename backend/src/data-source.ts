import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entities/user.entity"
import { Post } from "./entities/post.entity"

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'sns_postgres-db',
    port: 5432,
    username: 'postgres',
    password: 'password',
    database: 'sns',
    entities: [User, Post],
    synchronize: true,  // 本番環
    logging: false,
    migrations: ['src/migration/*.ts'],
})