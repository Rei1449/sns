import { NavLink } from "react-router-dom";

// ポストのデータ型
export type postData = {
    id:number;
    content: string;
    createdAt:Date;
    updatedAt:Date;
    userId: number;
    user: {
        id: number
        name: string
    }
}

export default function Post({ data }: { data:postData }) {
    return (
        <div className="p-3" key={data.id}>
            <NavLink to={`/profile/${data.userId}`}> userIDは{data.userId} </NavLink>
            <div>postIDは{data.id}、投稿日時{ data.createdAt.toString() }</div>
            <div className="rounded-md m-2 p-2 shadow-md">
                {data.content}
            </div>
        </div>
    )
}