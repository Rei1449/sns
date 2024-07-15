import { UseFormReturn, useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { EmailFormField, PWFormField } from "./Login";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { hashTextSHA256, postFetchJson } from "@/utils/utils";

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

    const onSubmitForm = async(data: any) => {
        // 提出時の動作を書く
        if( isRegisterData(data) ) {
            data.password = await hashTextSHA256(data.password);
            try {
                const token: string = await postFetchJson<string>('http://localhost:3001/users/create', data);
                setCookie('myToken', token, { maxAge : 3600 });
            } catch(e) {
                /*認証されない場合どうやって画面に表示する？*/
                alert(e);
            }
        } else { alert('登録データの型が間違っています') }
    }

    return (
        <div className="m-auto mt-20 w-96 h-auto outline rounded-3xl p-10">
            <h1>新規登録</h1>
            <br/>
            <Form {...formHook}>
                <form onSubmit={formHook.handleSubmit(onSubmitForm)}>

                    <NameFormField form={formHook} />
                    <EmailFormField form={formHook} />
                    <PWFormField form={formHook} />

                    <div className="flex flex-row-reverse justify-between">
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