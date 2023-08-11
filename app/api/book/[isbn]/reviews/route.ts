import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/server/prisma";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

// reviews 전체 GET

export async function GET(req: NextRequest, { params }: { params: { isbn: string } }) {
	const pageIndex = Number(req.nextUrl.searchParams.get("page"));
	const isFirstPage = pageIndex === 0;

	const pageCondition = {
		skip: 10 * pageIndex,
	};

	const reviews = await prisma.review.findMany({
		where: {
			bookIsbn: params.isbn,
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
		take: 10,
		...(!isFirstPage && pageCondition),
	});

	return NextResponse.json(reviews);
}

// review 작성
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
