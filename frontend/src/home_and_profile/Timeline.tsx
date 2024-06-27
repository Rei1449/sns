import { useEffect, useState } from "react";
import Post, { postData } from "./Post";
import {getFetchJson} from "@/utils/utils";

if (typeof window !== 'undefined') {
    console.log('読み込みました');
}

const now:Date = new Date();
const testPosts: postData[] = [{
    id:0,
    content: 'テストデータです',
    createAt:now,
    updateAt:now,
    userId:0,
}]

export default function Timeline() {
    const [posts, setPosts] = useState<postData[]>([]);
    const [postsSize, setPostsSize] = useState<number>(0);

    useEffect(() => {

        //ポストデータを初期化する
        //ポストを取得する
        
        /*posts.map((content) => {
            <p>test</p>
        })*/
        setPosts(testPosts);
        console.log(posts);
    }, []);

    const testf = () => {console.log(posts[0]); return 'aa'}

    return (
        <div className="timeline">
            <p>タイムライン</p>
            <div>
                { posts.map( (post) => post.content ) }
            </div>
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