import './Post.css'
import { postData } from "../../../common/connectionData";

export default function Post( data : postData ) {
    return (
        <div className="post">
            <p>{data.userId}<br/>
            {data.content} </p>
        </div>
    )
}