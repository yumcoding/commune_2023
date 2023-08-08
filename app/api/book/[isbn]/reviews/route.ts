import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/server/prisma";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

// reviews 전체 GET
export async function GET(req: Request, { params }: { params: { isbn: string } }) {
	const response = await prisma.$queryRaw`SET SESSION sql_mode = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';`.then(async () => {
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
			},
		});
		return reviews;
	});
	return NextResponse.json({ ok: true, data: response });
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
