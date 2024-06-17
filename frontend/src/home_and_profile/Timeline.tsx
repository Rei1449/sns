import { useEffect, useState } from "react";
import { postData } from "../../../common/connectionData";
import Post from "./Post";


export default function Timeline() {
    const [posts, setPosts] = useState<postData[]>([]);

    useEffect(() => {
        //ポストデータを初期化する
        //一定量のポストを取得する
    }, []);

    const testData:postData = {
        id:0,
        content: 'テスト',
        createAt:1,
        updateAt:2,
        userId:0
    };
    return (
        <div className="timeline">
            <Post {...testData} /> {/* map(posts)で複数ポストを表示する */}
        </div>
    )

    // ポストを取得しpostsに追加する
    const getPosts = async(url:string) => {
        const res = await fetch(url)
        if (!res.ok) {
            console.error('エラーが発生しました。ステータスコード：' + res.statusText);
        }
        const data:postData[] = await res.json();
        //const testData :postData = { content: 'テスト' };
        setPosts( (prePosts) => [ ...prePosts,  testData] );
    }
}