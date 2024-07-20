import Post, { postData } from "./Post";
import { getFetchJson } from "@/utils/utils";
import ResolvePromise, { asyncData } from "@/utils/ResolvePromise";

export default function ViewPosts({postsURL}: {postsURL:string}) {
    //const [prePosts, setPrePosts] = useState([]);
    //const [postsSize, setPostsSize] = useState<number>(0);

    return (
        <div className="divide-y">
            <div className="text-center"> タイムラインコンポーネント </div>
            <ResolvePromise<postData[]>
                promise={ getFetchJson<postData[]>( postsURL ) }
                loading={ <p>ロード中</p> }
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
