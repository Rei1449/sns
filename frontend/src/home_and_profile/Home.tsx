import { useEffect, useState } from 'react';
import { postData } from '../../../common/connectionData.tsx'
import Post from './Post.tsx'
import Profile from './Profile.tsx';
import Login from '../login_and_register/Login.tsx';
import Register from '../login_and_register/Register.tsx';

export default function Home() {
    const [posts, setPosts] = useState<postData[]>([]);

    useEffect(() => {
        //ポストデータを初期化する
    }, []);

    //データを取ってくる関数が必要
    const getPosts = async(url:string) => {
        const res = await fetch(url)
        if (!res.ok) {
            console.error('エラーが発生しました。ステータスコード：' + res.statusText);
        }
        const data:postData[] = await res.json();
        const testData :postData = { content: 'テスト' };
        setPosts( (prePosts) => [ ...prePosts,  testData] );
    }
    //全部のデータを一度に取ってくる関数と、更新時に追加で取ってくる関数が必要？

    return (
        <div>
            <h1> ホーム画面 </h1>
            <h2> 機能 </h2>
            <p> タイムライン<br/>
            ここに投稿を順番に表示する</p>
            <Post /> {/* map(posts)で複数ポストを表示する */}

            <h1>ログイン画面</h1>
            <Login />

            <h1>登録画面</h1>
            <Register />
            
            <h1>プロフ画面</h1>
            <Profile />
        </div>
    )
}