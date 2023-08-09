import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/server/prisma";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { isbn: string; id: string } }) {
	const { id } = params;
	const session = await getServerSession(authOptions);

	const alreadyLiked = await prisma.like.findFirst({
		where: {
			reviewId: +id,
			userId: session.user.id,
		},
	});

	if (alreadyLiked) {
		await prisma.like.delete({
			where: {
				id: alreadyLiked.id,
			},
		});
	} else {
		await prisma.like.create({
			data: {
				user: {
					connect: {
						id: session.user.id,
					},
				},
				review: {
					connect: {
						id: +id,
					},
				},
			},
		});
	}
	return NextResponse.json({ ok: true });
}
