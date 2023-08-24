import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/server/prisma";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

// 해당 사용자가 작성한 리뷰 전체 GET
export async function GET(req: NextRequest) {
	const session = await getServerSession(authOptions);

	const pageIndex = Number(req.nextUrl.searchParams.get("page"));
	const isFirstPage = pageIndex === 0;

	const pageCondition = {
		skip: 5 * pageIndex,
	};

	const reviews = await prisma.review.findMany({
		where: {
			userId: session?.user.id,
		},
		orderBy: {
			createdAt: "desc",
		},
		include: {
			_count: {
				select: {
					likes: true,
				},
			},
		},
		take: 5,
		...(!isFirstPage && pageCondition),
	});

	return NextResponse.json(reviews);
}
