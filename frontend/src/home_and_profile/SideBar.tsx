import { Button } from "@/components/ui/Button";
import { useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie";

export default function SideBar() {
    const [cookies] = useCookies();
    const nav = useNavigate();

    return (
        <div className="flex flex-col gap-2 min-w-32">
            <Button
                variant='ghost'
                onClick={ () => nav("/") }>
                    ホーム
            </Button>
            <Button
                variant='ghost'
                onClick={ () => nav(`/profile/${cookies.user_id}`) }>
                    マイプロフィール
            </Button>
            <Button
                variant='ghost'
                onClick={ () => nav("/login") }>
                    ログイン
            </Button>
            <Button
                variant='ghost'
                onClick={ () => nav("/register") }>
                    新規登録
            </Button>
        </div>
    )
}