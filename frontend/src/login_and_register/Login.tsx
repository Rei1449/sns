import { UseFormRegister, useForm } from "react-hook-form"
import { loginData } from "../../../common/connectionData";

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

                <button type="submit"> ログイン </button>
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