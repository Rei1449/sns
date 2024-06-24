// ポストをやり取りするときのデータ型
export type postData = {
    id:number;
    content: string;
    createAt:number;
    updateAt:number;
    userId:number;
}

// プロファイルなどに使用するユーザーデータ
export type userData = {
    id:number;
    name:string;
    email:string;
    createAt:number;
    updateAt:number;
}