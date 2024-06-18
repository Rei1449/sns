import { useEffect, useState } from "react";
import { userData } from "../../../common/connectionData";
import Timeline from "./Timeline";
import { getFetchJson } from "@/utils/utils";

export default function Profile() {
    return (
        <div>
            <ProfileHeader />
            <Timeline />
        </div>
    )
}

// プロフフィールを表示するコンポーネント
function ProfileHeader() {
    const [profileData, setProfileData] = useState('a');

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