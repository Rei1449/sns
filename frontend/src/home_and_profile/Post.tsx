// ポストのデータ型
export type postData = {
    id:number;
    content: string;
    createAt:Date;
    updateAt:Date;
    userId:number;
}

export default function Post({ data }: { data:postData }) {
    return (
        <div className="outline">
            <p>{data.userId}<br/>
            {data.content} </p>
        </div>
    )
}