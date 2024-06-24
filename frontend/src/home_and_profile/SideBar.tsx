import { Button } from "@/components/ui/Button";
import { useNavigate } from "react-router-dom"

export default function SideBar() {
    const nav = useNavigate();

    return (
        <div className="flex flex-col min-w-32">
            <p>サイドバー</p> <br/>
            <Button variant='ghost' onClick={ () => nav("/") }> ホーム </Button> <br/>
            <Button variant='ghost' onClick={ () => nav("/login") }> ログイン </Button> <br/>
            <Button variant='ghost' onClick={ () => nav("/register") }> 新規登録 </Button> <br/>
        </div>
    )
}