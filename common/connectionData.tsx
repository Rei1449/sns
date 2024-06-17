// ポストをやり取りするときのデータ型
export type postData = {
    id:number;
    content: string;
    createAt:number;
    updateAt:number;
    userId:number;
}

// ログイン＆登録に使用するデータ型
export type accountData = {
    email: string;
    password: string;
}