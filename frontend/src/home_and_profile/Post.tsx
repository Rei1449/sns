import './Post.css'
import { postData } from "../utils/connectionData";

export default function Post( data : postData ) {
    return (
        <div className="post">
            <p>{data.userId}<br/>
            {data.content} </p>
        </div>
    )
}