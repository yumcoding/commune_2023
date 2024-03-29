import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/server/prisma";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

// 이 책에 대한 전체 리뷰 GET
export async function GET(req: NextRequest, { params }: { params: { isbn: string } }) {
	const session = await getServerSession(authOptions);

	const pageIndex = Number(req.nextUrl.searchParams.get("page"));
	const isFirstPage = pageIndex === 0;

	const pageCondition = {
		skip: 10 * pageIndex,
	};

	const reviews = await prisma.review.findMany({
		where: {
			bookIsbn: params.isbn,
			NOT: {
				userId: session?.user.id,
			},
		},
		orderBy: {
			createdAt: "desc",
		},
		include: {
			user: {
				select: {
					id: true,
					name: true,
					image: true,
				},
			},
			_count: {
				select: {
					likes: true,
				},
			},
		},
		take: 10,
		...(!isFirstPage && pageCondition),
	});

	return NextResponse.json(reviews);
}
