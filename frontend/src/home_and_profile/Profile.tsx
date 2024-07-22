import { useState } from "react";
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
        <div className='flex justify-center'>
            <div className='basis-32 outline'>
                <SideBar />
            </div>
            
            <div className='flex-initial basis-2/3 m-5'>
                <h1>プロフ画面 userId={userId}</h1>
                <div>
                    <p>ここにユーザープロフィールが表示される</p>
                    {/*<ResolvePromise<profileData>
                        promise={ getFetchJson<profileData>( "/users/profile?id=2" ) }
                        loading={ <div>Loading...</div> }
                        renderItem={ (data: asyncData<profileData>) =>
                            <ProfileHeader data={data} />
                    }/>*/}
                </div>
                <ViewPosts postsURL={`http://localhost:3001/posts/user?id=${userId}`} />
            </div>
        </div>
    )
}



// プロフィールを表示するコンポーネント
/*function ProfileHeader({data}: {data: asyncData<profileData>}) {
    const profileData = data.read();

    return (
        <div>
            <div>ここにユーザープロフィールが表示される</div>
            <div>名前は{ profileData.name }</div>
            <div>idは{ profileData.id }</div>
        </div>
    )
}*/