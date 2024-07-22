import ViewPosts from './ViewPosts.tsx';
import CreatePost from './CreatePost.tsx';
import SideBar from './SideBar.tsx';
import { useCookies } from 'react-cookie';

export default function Home() {  
    const [cookies] = useCookies();

    return (
        <div className='flex justify-center'>
            <div className='basis-32 outline'>
                <SideBar />
            </div>
            
            <div className='flex-initial basis-2/3 m-5'>
                <CreatePost createrId = { cookies.myToken } />
                <ViewPosts postsURL='http://localhost:3001/posts/all' />
            </div>
        </div>
    )
}