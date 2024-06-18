import { useEffect } from "react";
import { userData } from "../../../common/connectionData";
import Timeline from "./Timeline";

export default function Profile() {
    return (
        <div>
            <Timeline />
        </div>
    )
}

// プロフフィールを表示するコンポーネント
function ProfileHeader() {

    useEffect(() => {
        getProfile('url');
    }, []);

    return (
        <div>
            <p>ここにユーザーのデータが表示される</p>
        </div>
    )

    const getProfile = async(url:string) => {
        const res = await fetch(url)
        if (!res.ok) {
            console.error('エラーが発生しました。ステータスコード：' + res.statusText);
        }
        return await res.json();
    }
}