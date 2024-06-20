import { Button } from "@/components/ui/Button";
import { postFetchJson } from "@/utils/utils";
import { useForm } from "react-hook-form";

export default function CreatePost({ createrId } : { createrId:string }) {
    type sendData = {
        userId: number;
        content: string;
    }

    const { register, handleSubmit } = useForm<sendData>();

    return (
        <div className="create-post">

            <form onSubmit={handleSubmit(async(data: sendData) => {
                // 提出時の動作を書く
                console.log(data);
                await postFetchJson<any>('1', data);
            })}>

                <textarea />

                <Button type='submit'> 投稿する </Button>
                
            </form>
        </div>
    )
}