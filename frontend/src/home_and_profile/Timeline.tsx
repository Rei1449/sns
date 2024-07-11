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
            <p>ここに文章。本来はここにタイムラインの投稿をする。</p>
            <div>
                { posts.map( (post) => post.content ) }
            </div>

            <div className='box'>
                <span className='box-title'>ここにタイトル</span>
                <p>ここに文章。タイトルのところに長い文章を書くとスタイルが崩れるらしい。最大何文字なのか、どうやって対応していけば良いのかは後で考えれば良いのかな？それともそもそも枠なんて必要ないのかしら？</p>
            </div>

            <div className='box'>
                <span className='box-title'>ここにタイトル</span>
                <p>タイムラインがここに表示された時、どのような画面になるのか確認しています。</p>
            </div>

            <div className='box'>
                <span className='box-title'>ここにタイトル</span>
                <p>あと、スクロール時に投稿画面は表示されたまま（固定）にしたいけど、タイムラインの内容は流れるように（固定しない）したい。</p>
            </div>

            <div className='box'>
                <span className='box-title'>ここにタイトル</span>
                <p>ここに文章。!!!？</p>
            </div>

            <div className='box'>
                <span className='box-title'>ここにタイトル</span>
                <p>ここに文章。!!!!!？？</p>
            </div>
            <div className='box'>
                <span className='box-title'>ここにタイトル</span>
                <p>ここに文章。!!!!!？？</p>
            </div>
            <div className='box'>
                <span className='box-title'>ここにタイトル</span>
                <p>ここに文章。!!!!!？？</p>
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