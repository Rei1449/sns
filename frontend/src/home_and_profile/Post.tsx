// ポストのデータ型
export type postData = {
    id:number;
    content: string;
    createdAt:Date;
    updatedAt:Date;
    userId:number;
}

export default function Post({ data }: { data:postData }) {
    return (
        <div className="p-3" key={data.id}>
            <div>userIDは{data.userId}、postIDは{data.id}、{ data.createdAt.toString() }</div>
            <div className="rounded-md m-2 p-2 shadow-md">
                {data.content}
            </div>
        </div>
    )
}