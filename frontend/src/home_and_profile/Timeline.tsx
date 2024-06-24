import { useEffect, useState } from "react";
import Post, { postData } from "./Post";
import {getFetchJson} from "@/utils/utils";


export default function Timeline() {
    const [posts, setPosts] = useState<postData[]>([]);
    const [postsSize, setPostsSize] = useState<number>(0);

    useEffect(() => {
        //ポストデータを初期化する
        //ポストを取得する
    }, []);

    return (
        <div className="timeline">
            <p>タイムライン</p>
            {/* <Post data=/> map(posts)で複数ポストを表示する */}
        </div>
    )

    // ポストを取得しpostsに追加する
    const getPosts = async(url:string) => {
        const newPosts: postData[] = await getFetchJson<postData[]>(url);
        //const testData :postData = { content: 'テスト' };
        setPosts( (prePosts) => ([...prePosts, ...newPosts]) );
        setPostsSize( (s) => s++ );
    }
}