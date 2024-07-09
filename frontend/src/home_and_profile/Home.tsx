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
            
            <div className='relative basis-2/3 outline'>
                <div className="fixed bg-green-600 text-center">
                    <CreatePost createrId = { 0 /*自分のid*/ } />   
                </div>
                <div className="bg-green-100 w-70 h-1000 text-center">
                    <Timeline />
                </div>
            </div>
        </div>
    )
}