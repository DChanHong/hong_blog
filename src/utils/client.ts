import { PrismaClient } from "@prisma/client";

// PrismaClient 의 새 인스턴스를 생성하여 prisma 객체 정의
const prisma = new PrismaClient();

export default prisma;
