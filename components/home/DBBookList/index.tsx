"use client";
import BookSlider from "@/components/common/BookSlider";
import { fetcher } from "@/lib/front/fetchers";
import { Review } from "@prisma/client";
import useSWR from "swr";

export default function DBBookList() {
	const { data, isLoading } = useSWR<Review[]>(`/api/ranking/recent-reviews`, fetcher);

	return <BookSlider list={data} isLoading={isLoading} />;
}
