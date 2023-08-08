// import prisma from "@/lib/server/prisma";
// import { NextResponse } from "next/server";

// // 특정 책, 특정 사용자가 쓴 특정 리뷰를 GET, PATCH, DELETE
// export async function GET({ params }: { params: { isbn: string } }) {
// 	const response = await prisma.$queryRaw`SET SESSION sql_mode = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';`.then(async () => {
// 		const review = await prisma.review.findMany({
// 			where: {
// 				bookIsbn: params.isbn,
// 			},
// 			include: {
// 				user: {
// 					select: {
// 						name: true,
// 						image: true,
// 					},
// 				},
// 			},
// 		});
// 		return review;
// 	});
// 	return NextResponse.json({ ok: true, review: response });
// }
