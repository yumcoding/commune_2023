import prisma from "@/lib/server/prisma";
import { NextRequest, NextResponse } from "next/server";

export interface ResponseType {
	ok: boolean;
	[key: string]: any;
}

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
