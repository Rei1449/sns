import Profile from './Profile.tsx';
import Login from '../login_and_register/Login.tsx';
import Register from '../login_and_register/Register.tsx';
import Timeline from './Timeline.tsx';
import CreatePost from './CreatePost.tsx';

export default function Home() {
    return (
        <div>
            <h1 > ホーム画面 </h1>
            <h2> 機能 </h2>
            <p> タイムライン<br/>
            ここに投稿を順番に表示する</p>
            <CreatePost />
            <Timeline />

            <h1>ログイン画面</h1>
            <Login />

            <h1>登録画面</h1>
            <Register />
            
            <h1>プロフ画面</h1>
            <Profile />
        </div>
    )
}