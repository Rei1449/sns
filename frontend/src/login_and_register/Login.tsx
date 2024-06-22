import { UseFormReturn, useForm } from "react-hook-form"
import { Button } from "@/components/ui/Button";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription, Form } from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";

// ログイン画面のコンポーネント
export default function Login() {
    const formHook = useForm();

    return (
        <div>
            <h1>ログイン画面</h1>
            <h2>Todo:ハッシュ化</h2>

            <Form {...formHook}>
                <form onSubmit={formHook.handleSubmit((data) => {
                    // 提出時の動作を書く
                    console.log(data);
                })}>

                    <EmailFormField form={formHook}/>
                    <PWFormField form={formHook}/>

                    <Button variant="outline" type="submit">ログイン</Button>

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