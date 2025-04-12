import { UseFormReturn, useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { EmailFormField, PWFormField } from "./Login";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { hashTextSHA256 } from "@/utils/utils";
import { accountData } from "./Login";

// アカウント登録画面のコンポーネント
export default function Register() {
    const formHook = useForm();
    const [_, setCookie] = useCookies<string>(['']);
    const nav = useNavigate();
    
    const isRegisterData = (arg: any) =>
        typeof arg === "object" &&
        arg !== null &&
        typeof arg.name === "string" &&
        typeof arg.email === "string" &&
        typeof arg.password === "string";
    
    // 提出時の動作を書く
    const onSubmitForm = async(data: any) => {
        if( isRegisterData(data) ) {
            data.password = await hashTextSHA256(data.password);
            
            const res = await fetch('http://localhost:3001/users/create', {
                    method:"POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body:JSON.stringify(data),
                });
            if (!res.ok) {
                /*認証されない場合どうやって画面に表示する？*/
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
        <div className="m-auto mt-20 w-96 h-auto outline rounded-3xl px-10 py-4">
            <div className="mb-4 text-center text-lg font-semibold"> 新規登録 </div>

            <Form {...formHook}>
                <form onSubmit={formHook.handleSubmit( onSubmitForm )}>

                    {/* 入力フォーム */}
                    <div className="my-2">
                        <NameFormField form={formHook} />
                    </div>
                    <div className="my-2">
                        <EmailFormField form={formHook} />
                    </div>
                    <div className="my-2">
                        <PWFormField form={formHook} />
                    </div>

                    {/* 登録ボタン */}
                    <div className="my-5 flex flex-row-reverse justify-between">
                        <Button
                            variant="default"
                            type="submit"> 登録 </Button>
                        <Button
                            variant="outline"
                            onClick={() => nav("/login")} > ログイン </Button>
                    </div>

                </form>
            </Form>
        </div>
    )
}

export function NameFormField({ form }: {form: UseFormReturn}) {
    return (
        <FormField
        control={form.control}
        name="name"
        defaultValue=""
        rules={{ required: '名前を入力してください' }}
        render={({field}) => (
            <FormItem>
                <FormLabel> Name </FormLabel>
                <FormControl>
                    <Input
                        type="text" 
                        placeholder="名前"
                        {...field}
                    />
                </FormControl>
                <FormMessage />
            </FormItem>
        )}/>
    )
}