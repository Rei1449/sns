import Post, { postData } from "./Post";
import { getFetchJson } from "@/utils/utils";
import AwaitPromise, { asyncData } from "@/utils/AwaitPromise";

export default function ViewPosts() {
    //const [prePosts, setPrePosts] = useState([]);
    //const [postsSize, setPostsSize] = useState<number>(0);

    return (
        <div className="divide-y">
            <div className="text-center"> タイムラインコンポーネント </div>
            <AwaitPromise<postData[]>
                promise={ getFetchJson<postData[]>('http://localhost:3001/posts/allpost') }
                loading={ <p>ロード中</p> }
                renderItem={ ( res: asyncData<postData[]> ) =>
                    <MapPost asyncPostsData={res}/>
            }/>
        </div>
    )
}

function MapPost({ asyncPostsData }: {asyncPostsData:asyncData<postData[]>}) {
    const postsData = asyncPostsData.read();

    return (
        <>
            { postsData.map( (postData: postData, idx: number) => <Post data={postData} key={idx}/> ) }
        </>
    );
}
