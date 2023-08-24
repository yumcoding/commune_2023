import BookSwiper from "@/components/common/BookSwiper";
import { cache } from "react";
import prisma from "@/lib/server/prisma";

export const revalidate = 3600;

export const getReviews = cache(async () => {
	const reviews = await prisma.review.findMany({
		take: 10,
		orderBy: {
			likes: {
				_count: "desc",
			},
		},
	});
	return reviews;
});

export default async function DBBookList() {
	const reviews = await getReviews();
	return <BookSwiper list={reviews} />;
}
