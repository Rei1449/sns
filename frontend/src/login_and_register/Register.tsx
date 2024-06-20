import { useForm } from "react-hook-form";
import { LoginDataForm } from "./Login";
import { loginData } from "../utils/connectionData";
import { Button } from "@/components/ui/Button";

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
                <div className="form-item">
                    <label>
                        <span>Name：</span>
                        <input
                            type="text"
                            {...register( "name", { required: true } )}
                            placeholder="名前を入力してください"
                        />
                    </label>
                </div>
                <LoginDataForm reg={register}/>
                <Button variant="outline" type="submit">登録</Button>
            </form>
        </div>
    )
}