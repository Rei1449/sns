import { Button } from "@/components/ui/Button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/Form";
import { Textarea } from "@/components/ui/Textarea";
import { postFetchJson } from "@/utils/utils";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";

export default function CreatePost({ createrId } : { createrId:number }) {
    type sendData = {
        userId: number;
        content: string;
    }

    const formHook = useForm<sendData>({defaultValues:{userId:createrId, content:''}} );
    const [cookies] = useCookies();

    return (
        <div className="">
            
            <Form {...formHook}>
            <form onSubmit={formHook.handleSubmit(async(data: sendData) => {
                // 提出時の動作を書く
                console.log(data);
                const res = await fetch('http://localhost:3001/posts', {
                    method:"POST",
                    headers: {
                        'Authorization': 'Bearer '+cookies.myToken,
                        "Content-Type": "application/json",
                    },
                    body:JSON.stringify(data),
                });
                if (!res.ok) {
                    console.log(res.statusText);
                }
            })}>

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