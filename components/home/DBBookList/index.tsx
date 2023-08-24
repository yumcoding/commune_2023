import { cache } from "react";
import prisma from "@/lib/server/prisma";
import BookSlider from "@/components/common/BookSlider";

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
	return <BookSlider list={reviews} />;
}
