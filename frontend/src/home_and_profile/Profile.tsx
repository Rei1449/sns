import { useEffect, useState } from "react";
import ViewPosts from "./ViewPosts";
import { getFetchJson } from "@/utils/utils";
import { useParams } from "react-router-dom";

// 各ユーザーのプロフィール画面
export default function Profile() {
    const { userId } = useParams<{ userId:string }>();

    useEffect(() => {
        console.log( userId );
    }, [userId]);

    return (
        <div>
            <h1>プロフ画面 userId={userId}</h1>
            <ProfileHeader />
            <ViewPosts />
        </div>
    )
}

// プロフィールを表示するコンポーネント
function ProfileHeader() {
    const [profileData, setProfileData] = useState('プロフィール');

    useEffect(() => {
        const getProfile = async() => {
            const test:string = await getFetchJson<string>("http://localhost:3001");
            console.log(test);
            setProfileData(test);
        }
        getProfile();
    }, []);

    return (
        <div>
            <p>ここにユーザーのデータが表示される<br/>
            { profileData }</p>
        </div>
    )
}