import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    await prisma.user.upsert({
        where: { email: 'test@test' },
        update: {},
        create: {
            email: 'test@test',
            name: 'testUser1',
            password: 'test',
            posts: {
                create: [
                    {
                        content: '今日はいい天気だった。散歩日和だ。',
                    },
                    {
                        content: '明日は雨が降るらしい。洗濯物は干せないな。',
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
            password: 'demo',
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
