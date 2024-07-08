import { postData } from "@/home_and_profile/Post";

const now:Date = new Date();
export const testPosts: postData[] = [{
    id:0,
    content: 'テストデータです。あああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ',
    createAt:now,
    updateAt:now,
    userId:1,
},{
    id:1,
    content: 'テストデータです。いいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいいい',
    createAt:now,
    updateAt:now,
    userId:1,
}];