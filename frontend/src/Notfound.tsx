import { useNavigate } from "react-router-dom";

export default function Notfound() {
    const nav = useNavigate();

    return (
        <div>
            <h1>ページが見つかりません</h1>
            <button onClick={ () => nav("/") }> ホームに戻る </button>
        </div>
    )
}