import Post, { postData } from "./Post";
import { getFetchJson } from "@/utils/utils";
import ResolvePromise, { asyncData } from "@/utils/ResolvePromise";

export default function ViewPosts({postsURL}: {postsURL:string}) {
    // Todo:バッチポストをさらにmapで回して表示する

    return (
        <div className="border divide-y">
            <ResolvePromise<postData[]>
                promise={ getFetchJson<postData[]>( postsURL ) }
                loading={ <p>ロード中</p> }
                error={ <div>エラーが発生しました</div> }
                renderItem={ ( res: asyncData<postData[]> ) =>
                    <BatchPost asyncPostsData={res}/>
            }/>
        </div>
    )
}

function BatchPost({ asyncPostsData }: {asyncPostsData:asyncData<postData[]>}) {
    const postsData = asyncPostsData.read();

    return (
        <>
            { postsData.map( (postData: postData, idx: number) => <Post data={postData} key={idx}/> ) }
        </>
    );
}
