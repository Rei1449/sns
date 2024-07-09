# DB・テーブル作成

```ターミナル
// マイグレーションの実行　テーブルの作成
npx prisma migrate deploy

// テストデータの挿入
npx prisma db seed
```

モデルに変更を加えたら下記を実行してください
```
npx prisma generate
```

#　urlとデータタイプ

## 投稿
### 全件取得
@Get
/posts/all 
```
{
    id: number,
    content: string,
    createdAt: Date,
    updatedAt: Date,
    userId: number
} []
```
### userIdから取得
@Get
/posts/?userId= :number
```
{
    id: number,
    content: string,
    createdAt: Date,
    updatedAt: Date,
    userId: number
} []
```
### 投稿作成
@Post
/posts
```
{
    content: string,
    userId: number
}
```

<br>
<br>

## アカウントユーザー
### 全ユーザー取得
@Get
/users/all
```
{
    id: number,
    name: string,
    createdAt: Date,
    updatedAt: Date
} []
```
### ユーザー1件取得
@Get
/users/?id= ユーザーid:number
```
{
    id: number,
    name: string,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date
}
```
### ユーザー作成
@Post
/users
{
    name: string,
    email: string,
    password: string
}




<br>


以下はnestのreadMe



## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
