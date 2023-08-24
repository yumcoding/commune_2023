import prisma from "@/lib/server/prisma";
import { NextRequest, NextResponse } from "next/server";

// 이 책에 대한 전체 리뷰 GET
export async function GET(req: NextRequest) {
	const reviews = await prisma.review.findMany({
		take: 10,
		orderBy: {
			createdAt: "desc",
		},
	});

	return NextResponse.json(reviews);
}
