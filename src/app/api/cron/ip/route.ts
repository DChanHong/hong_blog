import {NextResponse} from "next/server";
import prisma from "@/utils/client";

export async function GET(request: Request) {
	// console.log(request.headers.get("X-Forwarded-For"));

	try{
		await prisma.checkip.updateMany({
			data: {
				hit:0
			},
			where: {
				hit: {
					gt: 5
				},
			},
		});
		return NextResponse.json({ ok: true });
	}
	catch{
		return NextResponse.json({ ok: false });

	}finally {
		prisma.$disconnect()
	}

}
