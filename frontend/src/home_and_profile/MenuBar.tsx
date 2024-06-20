import { useNavigate } from "react-router-dom"

export default function MenuBar() {
    const nav = useNavigate();

    return (
        <div className="outline">
            <p>メニューバー</p>
            <button onClick={ () => nav("/") }> ホーム </button>
        </div>
    )
}