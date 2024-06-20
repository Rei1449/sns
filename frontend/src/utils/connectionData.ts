// ポストをやり取りするときのデータ型
export type postData = {
    id:number;
    content: string;
    createAt:number;
    updateAt:number;
    userId:number;
}

// ログイン＆登録時にバックへ送信するデータ型
export type loginData = {
    name?: string;
    email: string;
    password: string;   //ハッシュ値で送ると良い
}

// プロファイルなどに使用するユーザーデータ
export type userData = {
    id:number;
    name:string;
    email:string;
    createAt:number;
    updateAt:number;
}