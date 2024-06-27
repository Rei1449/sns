# DB・テーブル作成

DBを手動（ドッカーではなく）で勝手に作って、そこを保存先にしているので以下のコマンドをお願いします。

## DB作成

```bash
# ドッカーのsns_postgres-dbコンテナのExecにて
$ psql -U postgres

#　DB一覧の表示　snsがないことを確認
postgres=# \l
# snsを作成
postgres=# CREATE DATABASE sns;
#　DBの選択
postgres=# \c sns
```

## テーブル作成

```bash
# sns_backend_containerで行って下さい
$ yarn install
$ npx typeorm-ts-node-commonjs migration:run -d src/data-source.ts
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
