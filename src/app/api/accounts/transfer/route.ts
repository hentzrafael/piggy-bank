import { prisma } from "@/common/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { originId, destinationId, amount } = await req.json();
        const origin = await prisma.account.update({
            where: {
                id: originId
            },
            data:{
                balance: {
                    decrement: amount
                }
            },
        });

        if (!origin) {
            return NextResponse.json({
                statusCode: 404,
                message: "Origin account not found",
            })
        }

        const destination = await prisma.account.update({
            where: {
                id: destinationId
            },
            data:{
                balance: {
                    increment: amount
                }
            }
        })

        if (!destination) {
            return NextResponse.json({
                statusCode: 404,
                message: "Destination account not found",
            })
        }
        
        return NextResponse.json({ statusCode: 200, data: {destination, origin}, message: "Transferred successfully" });
        
    } catch (err) {
        return NextResponse.json({
            statusCode: 500,
            message: "Erro ao criar contas",
        })
    }
};