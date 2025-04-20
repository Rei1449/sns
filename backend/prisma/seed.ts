import { PrismaClient } from '@prisma/client';
import {createHash} from 'crypto'
import 'dotenv/config'

const encryptSha256 = (str:string) => {
    const hash = createHash('sha256');
    hash.update(str);
    return hash.digest('hex')
}

const pas1 = encryptSha256('test1test');
const pas2 = encryptSha256('demo2demo');

const prisma = new PrismaClient();

async function main() {
    await prisma.user.upsert({
        where: { email: 'test@test' },
        update: {},
        create: {
            email: 'test@test',
            name: 'testUser1',
            password: pas1,
            posts: {
                create: [
                    {
                        content: '今日はいい天気だ。散歩日和。',
                    },
                    {
                        content: '明日は雨が降るらしい。洗濯物は干せない。',
                    },
                    {
                        content: 'nest x prisma',
                    },
                ]
            },
        },
    });
    await prisma.user.upsert({
        where: { email: 'demo@demo' },
        update: {},
        create: {
            email: 'demo@demo',
            name: 'テストユーザー２',
            password: pas2,
            posts: {
                create: [
                    {
                        content: 'TestTextTestTextTestTextTestText',
                    },
                    {
                        content: '「おはよう、世界」',
                    },
                ]
            },
        },
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
});
