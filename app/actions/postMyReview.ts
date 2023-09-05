"use server";

import prisma from "@/lib/server/prisma";
import { revalidatePath } from "next/cache";

import { redirect } from "next/navigation";

async function postReview(data: any) {
	const { userId, title, content, rating, bookIsbn, bookAuthor, bookTitle, bookImage } = data;
	await prisma.review.create({
		data: {
			title,
			content,
			rating: Number(rating),
			bookIsbn,
			bookAuthor,
			bookTitle,
			bookImage,
			user: {
				connect: {
					id: userId,
				},
			},
		},
	});
	revalidatePath(`/api/book/${bookIsbn}`);
	redirect(`/book/${bookIsbn}`);
}

export default async function postMyReview(data: FormData) {
	const formDataObj: any = {};
	data.forEach((value: any, key: any) => (formDataObj[key] = value));
	await postReview(formDataObj);
}
