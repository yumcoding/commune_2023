import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/server/prisma";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";

// reviews 전체 GET
export async function GET() {
	const response = await prisma.$queryRaw`SET SESSION sql_mode = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';`.then(async () => {
		const reviews = await prisma.review.findMany({
			include: {
				_count: {
					select: {
						likes: true,
					},
				},
			},
		});
		return reviews;
	});
	return NextResponse.json({ ok: true, reviews: response });
}

// review 작성
export async function POST(request: Request) {
	// const session = await getServerSession(authOptions);
	// console.log("session!!!!!!!!!!!!!!!!!", session);
	const body = await request.json();
	// console.log(body);
	const { title, content, bookIsbn, bookAuthor, bookTitle, bookImage, user } = body;
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
					email: user.email,
				},
			},
		},
	});

	return NextResponse.json({ ok: true, data: review });
}
