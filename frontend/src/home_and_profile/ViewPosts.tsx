import { useEffect, useState } from "react";
import Post, { postData } from "./Post";

const now:Date = new Date();
const testPosts: postData[] = [{
    id:0,
    content: 'テストデータです。あああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ',
    createAt:now,
    updateAt:now,
    userId:1,
},{
    id:1,
    content: 'テストデータです。いいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいい',
    createAt:now,
    updateAt:now,
    userId:1,
}];

export default function ViewPosts() {
    const [posts, setPosts] = useState<postData[]>([]);
    //const [postsSize, setPostsSize] = useState<number>(0);

    useEffect(() => {
        //ポストデータを取得する
        setPosts(testPosts);
    }, []);

    return (
        <div className="divide-y">
            <div className="text-center"> タイムラインコンポーネント </div>
            { posts.map( (postData) => <Post data={postData}/> ) }
        </div>
    )

    // ポストを取得しpostsに追加する
    /*const getPosts = async(url:string) => {
        const newPosts: postData[] = await getFetchJson<postData[]>(url);
        //const testData :postData = { content: 'テスト' };
        setPosts( (prePosts) => ([...prePosts, ...newPosts]) );
        setPostsSize( (s) => s++ );
    }*/
}