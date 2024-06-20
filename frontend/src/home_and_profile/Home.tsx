import Timeline from './Timeline.tsx';
import CreatePost from './CreatePost.tsx';
import './Home.css'
import { Link } from 'react-router-dom';
import MenuBar from './MenuBar.tsx';
import { Button } from '@/components/ui/Button.tsx';

export default function Home() {
    return (
        <div className='flex'>
            <div className='bg-red-800 w-30 h-1000 text-center sticky'>
                <MenuBar />
            </div>
            
            <div>
                <div className="bg-green-800 w-70 h-1000 text-center ml-10">
                    <CreatePost createrId = { 0 /*自分のid*/ } />
                    <Timeline />
                </div>

                <div className='box'>
                    <span className='box-title'>ここにタイトル</span>
                    <p>ここに文章。タイトルのところに長い文章を書くとスタイルが崩れるらしい。最大何文字なのか、どうやって対応していけば良いのかは後で考えれば良いのかな？それともそもそも枠なんて必要ないのかしら？</p>
                </div>

                <h2 className='homeH2'>以下、テスト用リンク</h2>
                <Link to="/login">ログイン画面</Link> <br/>
                <Link to="/register">登録画面</Link> <br/>
                <Link to="/profile/0">id=0のプロフィール画面</Link>

                <div className="bg-neutral-50 dark:bg-white">
                    aaaaa
                </div>
                <Button>test用クリック</Button>
            </div>
        </div>
    )
}