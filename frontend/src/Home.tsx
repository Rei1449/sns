import './App.css'
import Post from './Post'

//データを取ってくる関数が必要
export const getData = async(url:string) => {
    const res = await fetch(url)
    if (!res.ok) {
        console.error('エラーが発生しました。ステータスコード：' + res.statusText);
    }
    return await res.json();
}
//全部のデータを一度に取ってくる関数と、更新時に追加で取ってくる関数が必要

function Home() {
    return (
        <div>
            <h1> ホーム画面 </h1>
            <h2> 機能 </h2>
            <p> タイムライン<br/>
            ここに投稿を順番に表示する</p>
            <Post /> {/* map(posts)で複数ポストを表示する */}
        </div>
    )
}

export default Home