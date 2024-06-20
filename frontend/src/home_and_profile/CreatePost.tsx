import { Button } from "@/components/ui/Button";
import { postFetchJson } from "@/utils/utils";
import { useForm } from "react-hook-form";

export default function CreatePost({ createrId } : { createrId:number }) {
    type sendData = {
        userId: number;
        content: string;
    }

    const { register, handleSubmit } = useForm<sendData>();

    return (
        <div className="create-post">

            <form onSubmit={handleSubmit((data: sendData) => {
                // 提出時の動作を書く
                data.userId = createrId;
                console.log(data);
                postFetchJson('http://localhost:3001/posts', data);
            })}>

                <div>
                    <label>
                        <span>投稿：</span>
                        <input
                            type="text"
                            {...register( "content", { required: true } )}
                            placeholder="にゃー"
                        />
                    </label>
                </div>

                <Button type='submit'> 投稿する </Button>
                
            </form>
        </div>
    )
}