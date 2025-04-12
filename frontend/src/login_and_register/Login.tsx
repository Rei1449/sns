import { UseFormReturn, useForm } from "react-hook-form"
import { Button } from "@/components/ui/Button";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription, Form } from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { hashTextSHA256 } from "@/utils/utils";

export type accountData = {
    user_id: number 
    name: string,
    createdAt: Date,
    updatedAt: Date,
    access_token: string
};

// ログイン画面のコンポーネント
export default function Login() {
    const formHook = useForm();
    const [_, setCookie] = useCookies<string>(['']);
    const nav = useNavigate();

    const isLoginData = (arg: any) =>
        typeof arg === "object" &&
        arg !== null &&
        typeof arg.email === "string" &&
        typeof arg.password === "string";

    // 提出時の動作を書く
    const onSubmitForm = async(data: any) => {
        if ( isLoginData(data) ) {
            data.password = await hashTextSHA256(data.password);

            const res = await fetch('http://localhost:3001/auth/login', {
                    method:"POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body:JSON.stringify(data),
                });
            if (!res.ok) {
                console.log(res.statusText);
            }
            const accountData: accountData = await res.json();
            
            const dataAge = 3600;   // データがクッキーに保存される時間＝1時間
            setCookie('user_id', accountData.user_id, { maxAge : dataAge });
            setCookie('name', accountData.name, { maxAge : dataAge });
            setCookie('createdAt', accountData.createdAt, { maxAge : dataAge });
            setCookie('updatedAt', accountData.updatedAt, { maxAge : dataAge });
            setCookie('access_token', accountData.access_token, { maxAge : dataAge });
            nav('/');

        } else { console.log('登録データの型が間違っています') }
    }

    return (
        <div className="m-auto mt-20 w-96 h-auto outline rounded-3xl py-4">
            <div className="mb-4 text-center text-lg font-semibold"> ログイン </div>

            <Form {...formHook}>
                <form onSubmit={formHook.handleSubmit( onSubmitForm )}>

                    {/* 入力フォーム */}
                    <div className="mx-10 my-2">
                        <EmailFormField form={formHook}/>
                    </div>
                    
                    <div className="mx-10 my-2">
                        <PWFormField form={formHook}/>
                    </div>

                    {/* ログインボタン */}
                    <div className="mx-10 my-5 flex flex-row-reverse justify-between">
                        <Button
                            variant="default"
                            type="submit"> ログイン </Button>
                        <Button
                            variant="outline"
                            onClick={() => nav("/register")} > 新規登録 </Button>
                    </div>

                </form>
            </Form>

        </div>
    )
}

// メールアドレスとパスワードのみの入力フォーム
export function EmailFormField({ form }: {form: UseFormReturn}) {
    return (
        <FormField
        control={form.control}
        name="email"
        defaultValue=""
        rules={{ required: "メールアドレスを入力してください。" }}
        render={({field}) => (
            <FormItem>
                <FormLabel> E-Mail </FormLabel>
                <FormControl>
                    <Input
                        type="email" 
                        placeholder="メールアドレス"
                        {...field}
                    />
                </FormControl>
                <FormMessage />
            </FormItem>
        )}/>
    )
}

export function PWFormField({ form }: {form: UseFormReturn}) {
    return (
        <FormField
        control={form.control}
        name="password"
        defaultValue=""
        rules={{required:'パスワードを入力してください。',
                minLength: {value:8, message:'パスワードは8文字以上でなければなりません。'},
                maxLength: {value:30, message:'パスワードは30文字以下でなければなりません。'},
                pattern: {value:/[a-zA-Z]+[0-9]+[^a-zA-z0-9]*/, message:'アルファベットと数字がそれぞれ1文字以上必要です。'}
                }}
        render={({ field }) => (
            <FormItem>
                <FormLabel> Password </FormLabel>
                <FormControl>
                    <Input
                        type="text" 
                        placeholder="パスワード"
                        {...field}
                    />
                </FormControl>
                <FormDescription />
                <FormMessage />
            </FormItem>
        )}/>
    )
}