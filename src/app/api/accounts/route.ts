import { prisma } from "@/common/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const username = req.nextUrl.searchParams.get("username");
        if (!username) {
            return NextResponse.json({
                statusCode: 404,
                message: "Usuário não encontrado",
            })
        }
        const accounts = await prisma.user.findUnique({
            where: {
                username,

            }, include: {
                accounts: true
            }
        });
        return NextResponse.json({ statuscode: 200, data: accounts });
    } catch (err) {
        return NextResponse.json({
            statusCode: 500,
            message: "Erro ao buscar contas",
        })
    }
};

export async function POST(req: NextRequest) {
    try {
        const { username, balance, name } = await req.json();
        const user = await prisma.user.findUnique({
            where: {
                username
            }
        });

        if (!user) {
            return NextResponse.json({
                statusCode: 404,
                message: "Usuário não encontrado",
            })
        }

        const account = await prisma.account.create({
            data: {
                name,
                balance,
                userId: user.id
            }
        });

        return NextResponse.json({ statuscode: 200, data: account });
        
    } catch (err) {
        return NextResponse.json({
            statusCode: 500,
            message: "Erro ao criar contas",
        })
    }
};