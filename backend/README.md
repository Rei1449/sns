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
$ npx typeorm-ts-node-commonjs migration:run -d src/data-source.ts
```


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
