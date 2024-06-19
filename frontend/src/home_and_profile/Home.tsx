import Timeline from './Timeline.tsx';
import CreatePost from './CreatePost.tsx';
import './Home.css'
import { Link } from 'react-router-dom';
import MenuBar from './MenuBar.tsx';

export default function Home() {
    return (
        <div>
            <h1> ホーム画面 </h1>
            <br/>
            <p>メニューバー</p>
            <MenuBar />
            <br/>
            <p> 投稿用コンポーネント </p>
            <CreatePost />
            <br/>
            <p> タイムライン <br/>
            ここに投稿を順番に表示する</p>
            <Timeline />
            <br/>
            <p>以下、テスト用リンク</p>
            <Link to="/login">ログイン画面</Link> <br/>
            <Link to="/register">登録画面</Link> <br/>
            <Link to="/profile/0">id=0のプロフィール画面</Link>

            <div className="box">
                <span className="box-title">ここにタイトル</span>
                <p>ここに文章。タイトルのところに長い文章を書くとスタイルが崩れるらしい。最大何文字なのか、どうやって対応していけば良いのかは後で考えれば良いのかな？それともそもそも枠なんて必要ないのかしら？</p>
            </div>
        </div>
        
        
    )
}