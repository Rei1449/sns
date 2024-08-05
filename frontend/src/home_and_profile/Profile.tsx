import ViewPosts from "./ViewPosts";
import { useParams } from "react-router-dom";
import SideBar from "./SideBar";
import ResolvePromise, { asyncData } from "@/utils/ResolvePromise";
import { getFetchJson } from "@/utils/utils";

type profileData = {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

// 各ユーザーのプロフィール画面
export default function Profile() {
    const { userId } = useParams<{ userId:string }>();

    return (
        <div className='flex place-content-center'>
            <div className='flex flex-col items-end w-48'>
                <div className='fixed outline'>
                    <SideBar />
                </div>
            </div>
            
            <div className='basis-2/3 m-5'>
                <h1>プロフ画面 userId={userId}</h1>
                <ResolvePromise<profileData>
                    promise={ getFetchJson<profileData>( `http://localhost:3001/users/profile/?id=${userId}` ) }
                    loading={ <div>Loading...</div> }
                    error={ <div>エラーが発生しました</div> }
                    renderItem={ (data: asyncData<profileData>) =>
                        <ProfileHeader data={data} />
                }/>
                <ViewPosts postsURL='http://localhost:3001/posts/all' />
            </div>
        </div>
    )
}



// プロフィールを表示するコンポーネント
function ProfileHeader({data}: {data: asyncData<profileData>}) {
    const profileData = data.read();

    return (
        <div>
            <div>ここにユーザープロフィールが表示される</div>
            <div>名前は{ profileData.name }</div>
            <div>idは{ profileData.id }</div>
        </div>
    )
}