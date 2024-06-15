// ポストをやり取りするときのデータ型
export type postData = {
    // データ型は修正予定
    content: string;
}

// ログイン＆登録に使用するデータ型
export type accountData = {
    name: string;
    email: string;
    password: string;   //パスワード型にするかも
}