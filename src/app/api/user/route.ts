import { prisma } from "@/common/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    const username = req.nextUrl.searchParams.get("username");
    if (!username) {
        return NextResponse.json({
            statusCode: 404,
            message: "Usuário não encontrado",
        })
    }
    return Response.json(await prisma.user.findUnique({
        where: {
            username
        }
    }));

}

export async function POST(req: NextRequest) {
    const {username, password} = await req.json();
    try {   
        const user = await prisma.user.findUnique({
            where: {
                username
            }
        });

        if(!user || user.password !== password){
            return NextResponse.json({
                statusCode: 401,
                message: "Invalid password and/or username",
            })
        }

        return NextResponse.json({
            statusCode: 200,
            message: "Login successful",
            user: user
        })
    }catch (err){
        return NextResponse.json({
            statusCode: 500,
            message: "Unknown error, try again later",
        });
    }
    
}