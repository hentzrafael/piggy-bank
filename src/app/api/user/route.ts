import { prisma } from "@/common/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    return Response.json(await prisma.user.findMany());
}

export async function POST(req: NextRequest) {
    const {username, password} = await req.json();
    try {   
        const user = await prisma.user.findUnique({
            where: {
                username
            }
        });
        if(!user){
            return NextResponse.json({
                statusCode: 404,
                message: "Usuário não encontrado",
            })
        }

        if(user.password !== password){
            return NextResponse.json({
                statusCode: 401,
                message: "Senha inválida",
            })
        }

        return NextResponse.json({
            statusCode: 200,
            message: "Login realizado com sucesso",
            user: user
        })
    }catch (err){
        return NextResponse.json({
            statusCode: 500,
            message: "Erro ao realizar login",
        });
    }
    
}