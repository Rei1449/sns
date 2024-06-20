import { useEffect, useState } from "react";
import { postData } from "../utils/connectionData";
import Post from "./Post";
import {getFetchJson} from "@/utils/utils";


export default function Timeline() {
    const [posts, setPosts] = useState<postData[]>([]);
    const [postsSize, setPostsSize] = useState<number>(0);

    useEffect(() => {
        //ポストデータを初期化する
        //ポストを取得する
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
        await getFetchJson<postData[]>(url);
        //const testData :postData = { content: 'テスト' };
        setPosts( (prePosts) => [ ...prePosts,  testData] );
        setPostsSize( (s) => s++ );
    }
}