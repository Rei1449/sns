import { Button } from "@/components/ui/Button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/Form";
import { Textarea } from "@/components/ui/Textarea";
import { postFetchJson } from "@/utils/utils";
import { useForm } from "react-hook-form";

export default function CreatePost({ createrId } : { createrId:number }) {
    type sendData = {
        userId: number;
        content: string;
    }

    const formHook = useForm<sendData>({defaultValues:{userId:createrId, content:''}} );

    return (
        <div className="">
            
            <Form {...formHook}>
            <form onSubmit={formHook.handleSubmit((data: sendData) => {
                // 提出時の動作を書く
                //data.userId = createrId;
                console.log(data);
                postFetchJson('http://localhost:3001/posts', data);
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