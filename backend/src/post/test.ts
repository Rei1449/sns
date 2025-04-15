import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

prisma.follow.create // ← 🔍 ここで補完が出ればOK！
