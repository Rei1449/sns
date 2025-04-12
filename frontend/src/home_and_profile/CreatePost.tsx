import { Button } from "@/components/ui/Button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/Form";
import { Textarea } from "@/components/ui/Textarea";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type sendData = {
    userId: number;
    content: string;
}

export default function CreatePost() {
    const nav = useNavigate();
    const [cookies] = useCookies();
    const formHook = useForm<sendData>({defaultValues:{userId:1, content:''}} );    //本当はクッキーにuserIDが入る

    // 投稿時の動作
    const onSubmitForm = async(data: sendData) => {
        // 非ログイン時、ログイン画面に遷移
        if(typeof cookies.access_token !== 'string') {
            nav("/login");
        }

        console.log(data);
        const res = await fetch('http://localhost:3001/posts', {
                        method:"POST",
                        headers: {
                            'Authorization': 'Bearer ' + cookies.access_token,
                            "Content-Type": "application/json",
                        },
                        body:JSON.stringify(data),
                    });
        if (!res.ok) {
            console.log(res.statusText);
        }
    }

    return (
        <div className="">
            
            <Form {...formHook}>
            <form onSubmit={formHook.handleSubmit( onSubmitForm )}>

                <FormField
                control={formHook.control}
                name="content"
                rules={{ required: true }}
                render={({field}) => (
                    <FormItem>
                        <FormControl>
                            <Textarea
                                placeholder="にゃ～と投稿します"
                                className="resize-none"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>

                <Button type='submit'> 投稿する </Button>
                
            </form>
            </Form>

        </div>
    )
}