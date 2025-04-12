import ViewPosts from "./ViewPosts";
import { useParams } from "react-router-dom";
import SideBar from "./SideBar";
import ResolvePromise, { asyncData } from "@/utils/ResolvePromise";
import { useCookies } from "react-cookie";

// ユーザーのプロフィール情報の型
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

                <ResolvePromise<profileData>    /* プロフィールの表示 */
                    promise={ getProfileJson() }
                    loading={ <div>Loading...</div> }
                    error={ <div>エラーが発生しました</div> }
                    renderItem={ (data: asyncData<profileData>) =>
                        <ProfileHeader data={data} />
                }/>

                {/* ユーザーの投稿一覧の表示 */}
                <ViewPosts postsURL={`http://localhost:3001/posts/user?id=${userId}`} />

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

// プロフィール情報を取得する関数
async function getProfileJson(): Promise<profileData> {
    const { userId } = useParams<{ userId:string }>();
    const [cookies] = useCookies();

    const res = await fetch(`http://localhost:3001/users/profile?id=${userId}`, {
                    method:"GET",
                    headers: {
                        'Authorization': 'Bearer ' + cookies.access_token,
                        'Content-Type': 'application/json',
                    }
                });
    if (!res.ok) {
        throw new Error(res.statusText);
    }
    return await res.json();
}