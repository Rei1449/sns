import { UseFormRegister, useForm } from "react-hook-form"
import { loginData } from "../utils/connectionData";
import { Button } from "@/components/Button";

// ログイン画面のコンポーネント
export default function Login() {
    const { register, handleSubmit } = useForm<loginData>();

    return (
        <div className="account-data-form">
            <h1>ログイン画面</h1>
            <h2>Todo:バリテーションの追加<br/>
            ハッシュ化<br/>
            エラー処理</h2>

            <form onSubmit={handleSubmit((data:loginData) => {
                // 提出時の動作を書く
                console.log(data);
            })}>
                <LoginDataForm reg={register}/>
                <Button variant="outline" type="submit">ログイン</Button>
            </form>
        </div>
    )
}

// メールアドレスとパスワードのみの入力フォーム
export function LoginDataForm({ reg }: {reg:UseFormRegister<loginData>}) {
    return (
        <>
        <div className="form-item">
            <label>
                <span>E-Mail：</span>
                <input
                    type="text"
                    {...reg( "email", { required: true } )}
                    placeholder="メールアドレスを入力してください"
                />
            </label>
        </div>

        <div className="form-item">
            <label>
                <span>Password：</span>
                <input
                    type="text"
                    {...reg( "password", { required: true } )}
                    placeholder="パスワードを入力してください"
                />
            </label>
        </div>
        </>
    )
}