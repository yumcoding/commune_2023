import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

async function main() {
	[...Array.from(Array(100).keys())].forEach(async (item) => {
		await client.review.create({
			data: {
				title: String(item),
				content: String(item),
				bookIsbn: "9788954672214",
				bookAuthor: "정세랑",
				bookTitle: "시선으로부터, (정세랑 장편소설)",
				bookImage: "https://shopping-phinf.pstatic.net/main_3245497/32454975970.20230110165450.jpg",
				user: {
					connect: {
						id: "cll203jhf0000u9u4833v2rkw",
					},
				},
			},
		});
	});
}

main()
	.catch((e) => console.log(e))
	.finally(() => client.$disconnect());
