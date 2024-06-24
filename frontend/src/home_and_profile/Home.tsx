import Timeline from './Timeline.tsx';
import CreatePost from './CreatePost.tsx';
import './Home.css'
import { Link } from 'react-router-dom';
import SideBar from './SideBar.tsx';
import { Button } from '@/components/ui/Button.tsx';

export default function Home() {
    return (
        <div className='flex justify-center'>
            <div className='basis-32 outline'>
                <SideBar />
            </div>
            
            <div className='flex-initial basis-2/3 outline'>
                <div className="bg-green-800 w-70 h-1000 text-center">
                    <CreatePost createrId = { 0 /*自分のid*/ } />
                    <Timeline />
                </div>

                <div className='box'>
                    <span className='box-title'>ここにタイトル</span>
                    <p>ここに文章。タイトルのところに長い文章を書くとスタイルが崩れるらしい。最大何文字なのか、どうやって対応していけば良いのかは後で考えれば良いのかな？それともそもそも枠なんて必要ないのかしら？</p>
                </div>

                <h2 className='homeH2'>以下、テスト用リンク</h2>
                <Link to="/profile/0">id=0のプロフィール画面</Link>

                <div className="bg-neutral-50 dark:bg-white">
                    aaaaa
                </div>
                <Button>test用クリック</Button>
            </div>
        </div>
    )
}