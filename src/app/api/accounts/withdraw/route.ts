import  prisma  from "@/common/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const {accountId, amount } = await req.json();
        const account = await prisma.account.update({
            where: {
                id: accountId
            },
            data:{
                balance: {
                    decrement: amount
                }
            }
        });

        if (!account) {
            return NextResponse.json({
                statusCode: 404,
                message: "Account not found",
            })
        }

        return NextResponse.json({ statusCode: 200, data: account , message: "Withdrew successfully"});
        
    } catch (err) {
        return NextResponse.json({
            statusCode: 500,
            message: "Error while withdrawing from account",
        })
    }
};