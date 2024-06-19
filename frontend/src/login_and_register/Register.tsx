import { useForm } from "react-hook-form";
import { LoginDataForm } from "./Login";
import { loginData } from "../../../common/connectionData";

// アカウント登録画面のコンポーネント
export default function Register() {
    const { register, handleSubmit } = useForm<loginData>();

    return (
        <div className="account-data-form">
            <h1>登録画面</h1>
            <form onSubmit={handleSubmit((data:loginData) => {
                // 提出時の動作を書く
                console.log(data);
            })}>
                <LoginDataForm reg={register}/>
                <button type="submit"> 登録 </button>
            </form>
        </div>
    )
}