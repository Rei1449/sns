import ViewPosts from './ViewPosts.tsx';
import CreatePost from './CreatePost.tsx';
import SideBar from './SideBar.tsx';
import { useCookies } from 'react-cookie';

export default function Home() {  
    const [cookies] = useCookies();

    return (
        <div className='flex place-content-center'>
            <div className='flex flex-col items-end w-48'>
                <div className='fixed outline'>
                    <SideBar />
                </div>
            </div>
            
            <div className='basis-2/3 m-5'>
                <CreatePost createrId = { cookies.myToken } />
                <ViewPosts postsURL='http://localhost:3001/posts/all' />
            </div>
        </div>
    )
}