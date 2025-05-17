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

const prefectures = [
    '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
    '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
    '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県',
    '岐阜県', '静岡県', '愛知県', '三重県',
    '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県',
    '鳥取県', '島根県', '岡山県', '広島県', '山口県',
    '徳島県', '香川県', '愛媛県', '高知県',
    '福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県', 'no data'
];

async function main() {
    await prisma.prefecture.createMany({
        data: prefectures.map(name => ({ name })),
        skipDuplicates: true, // 重複を無視（再実行対策）
    });
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
