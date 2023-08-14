import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/server/prisma";

// 이 책 리뷰 전체 개수
export async function GET(req: NextRequest, { params }: { params: { isbn: string } }) {
	const session = await getServerSession(authOptions);

	const reviews = await prisma.review.findMany({
		where: {
			bookIsbn: params.isbn,
			NOT: {
				userId: session?.user.id,
			},
		},
		include: {
			user: {
				select: {
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
	});

	const total = reviews.length;
	return NextResponse.json(total);
}
