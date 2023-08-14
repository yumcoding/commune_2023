import prisma from "@/lib/server/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// 해당 사용자의 이 책에 대한 리뷰 POST
export async function POST(req: Request) {
	const session = await getServerSession(authOptions);
	const body = await req.json();

	const { title, content, bookIsbn, bookAuthor, bookTitle, bookImage } = body;
	const review = await prisma.review.create({
		data: {
			title,
			content,
			bookIsbn,
			bookAuthor,
			bookTitle,
			bookImage,
			user: {
				connect: {
					id: session.user.id,
				},
			},
		},
	});

	return NextResponse.json({ ok: true, data: review });
}

// 해당 사용자의 이 책에 대한 리뷰 GET
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
