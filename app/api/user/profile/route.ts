import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/server/prisma";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

// 해당 사용자가 작성한 리뷰 전체 GET
export async function GET(req: NextRequest) {
	const session = await getServerSession(authOptions);

	const user = await prisma.user.findUnique({
		where: {
			id: session.user.id,
		},
		include: {
			_count: {
				select: {
					reviews: true,
					likes: true,
				},
			},
		},
	});

	return NextResponse.json({
		ok: true,
		user,
	});
}

// TODO : 2차. 사용자 이름, 아바타 이미지 수정
