import prisma from "@/lib/server/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// 특정 책에 대한 사용자의 리뷰 UPDATE
export async function PATCH(req: Request, { params }: { params: { isbn: string; id: string } }) {
	const session = await getServerSession(authOptions);

	const body = await req.json();

	const { title, content, rating } = body;

	const review = await prisma.review.update({
		where: {
			id: +params.id,
			bookIsbn: params.isbn,
			userId: session.user.id,
		},

		data: {
			title,
			content,
			rating,
		},
	});

	return NextResponse.json({ ok: true, review });
}

// 특정 책에 대한 사용자의 리뷰 DELETE
export async function DELETE(req: Request, { params }: { params: { isbn: string; id: string } }) {
	const session = await getServerSession(authOptions);
	const review = await prisma.review.delete({
		where: {
			id: +params.id,
			bookIsbn: params.isbn,
			userId: session.user.id,
		},
	});

	return NextResponse.json({ ok: true, review });
}
