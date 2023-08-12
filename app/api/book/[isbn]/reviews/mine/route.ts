import prisma from "@/lib/server/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// // 특정 책, 특정 사용자가 쓴 특정 리뷰를 GET, PATCH, DELETE
export async function GET(req: Request, { params }: { params: { isbn: string } }) {
	const session = await getServerSession(authOptions);

	const review = await prisma.review.findFirst({
		where: {
			bookIsbn: params.isbn,
			userId: session.user.id,
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

	return NextResponse.json({ ok: true, review });
}
