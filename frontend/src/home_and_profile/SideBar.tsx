import { Button } from "@/components/ui/Button";
import { useNavigate } from "react-router-dom"

export default function SideBar() {
    const nav = useNavigate();

    return (
        <div className="flex flex-col gap-2 min-w-32">
            <div className="text-center"> サイドバー </div><br/>
            <Button
                variant='ghost'
                onClick={ () => nav("/") }>
                    ホーム
            </Button>
            <Button
                variant='ghost'
                onClick={ () => nav(`/profile/${1}`) }>
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