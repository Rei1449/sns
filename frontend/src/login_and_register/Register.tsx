import { UseFormReturn, useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { EmailFormField, PWFormField } from "./Login";

// アカウント登録画面のコンポーネント
export default function Register() {
    const formHook = useForm();

    return (
        <div className="account-data-form">
            <h1>登録画面</h1>
            <Form {...formHook}>
                <form onSubmit={formHook.handleSubmit((data) => {
                    // 提出時の動作を書く
                    console.log(data);
                })}>

                    <NameFormField form={formHook} />
                    <EmailFormField form={formHook} />
                    <PWFormField form={formHook} />
                    
                    <Button variant="outline" type="submit">登録</Button>

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