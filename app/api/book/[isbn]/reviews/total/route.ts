import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/server/prisma";

export async function GET(req: NextRequest, { params }: { params: { isbn: string } }) {
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
	});

	const total = reviews.length;
	return NextResponse.json(total);
}
