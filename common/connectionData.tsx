// ポストをやり取りするときのデータ型
export type postData = {
    id:number;
    content: string;
    createAt:number;
    updateAt:number;
    userId:number;
}

// ログイン＆登録に使用するデータ型
export type loginData = {
    email: string;
    password: string;   //ハッシュ値で送ると良い
}

// プロファイルなどに使用するユーザーデータ
export type userData = {
    id:number;
    name:string;
    createAt:number;
    updateAt:number;
}