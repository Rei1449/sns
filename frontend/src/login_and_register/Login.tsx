import { UseFormReturn, useForm } from "react-hook-form"
import { Button } from "@/components/ui/Button";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription, Form } from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { hashTextSHA256 } from "@/utils/utils";

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

    const onSubmitForm = async(data: any) => {
        // 提出時の動作を書く
        if ( isLoginData(data) ) {
            data.password = await hashTextSHA256(data.password);
            console.log(data);
            //const isAuth = await getFetchJson(URL, data);
            // 本当はセッションIDが返ってくる
            setCookie('myId', 1, { maxAge : 3600 });
        } else { alert('登録データの型が間違っています') }
    }

    return (
        <div className="m-auto mt-20 w-96 h-auto outline rounded-3xl p-10">
            <h1>ログイン</h1>
            <h2>Todo:ハッシュ化</h2>
            <br/>

            <Form {...formHook}>
                <form onSubmit={formHook.handleSubmit(onSubmitForm)}>

                    <EmailFormField form={formHook}/>
                    <PWFormField form={formHook}/>

                    <div className="flex flex-row-reverse justify-between">
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
        rules={{ required:'パスワードを入力してください。',
                 minLength: {value:8, message:'パスワードは8文字以上でなければなりません。'},
                 maxLength: {value:30, message:'パスワードは30文字以下でなければなりません。'},
                 pattern: {value:/[a-zA-Z]+[0-9]+[^a-zA-z0-9]*/, message:'アルファベットと数字がそれぞれ1文字以上必要です。'} }}
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