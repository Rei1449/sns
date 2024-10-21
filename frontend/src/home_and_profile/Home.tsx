import ViewPosts from './ViewPosts.tsx';
import CreatePost from './CreatePost.tsx';
import SideBar from './SideBar.tsx';

export default function Home() {  

    return (
        <div className='flex place-content-center'>
            <div className='flex flex-col items-end w-48'>
                <div className='fixed outline'>
                    <SideBar />
                </div>
            </div>
            
            <div className='basis-2/3 m-5'>
                <CreatePost />
                <ViewPosts postsURL='http://localhost:3001/posts/all' />
            </div>
        </div>
    )
}