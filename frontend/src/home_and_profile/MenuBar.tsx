import { Button } from "@/components/ui/Button";
import { useNavigate } from "react-router-dom"

export default function MenuBar() {
    const nav = useNavigate();

    return (
        <div className="outline">
            <p>メニューバー</p>
            <Button onClick={ () => nav("/") }> ホーム </Button>
        </div>
    )
}