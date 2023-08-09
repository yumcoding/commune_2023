import { Review, User } from "@prisma/client";

export interface SearchItemTypes {
	title: string;
	link: string;
	image: string;
	author: string;
	discount: string;
	publisher: string;
	pubdate: string;
	isbn: string;
	description: string;
}

export interface SearchResultTypes {
	lastBuildDate: string;
	total: number;
	start: number;
	display: number;
	items: SearchItemTypes[];
}

export interface BookDescTypes {
	author: string;
	description: string;
	discount: string;
	image: string;
	isbn: string;
	link: string;
	pubdate: string;
	publisher: string;
	title: string;
}

export interface ReviewMutationTypes {
	ok: boolean;
	data: Review;
}

export interface ReviewWithUser extends Review {
	user: User;
	_count: {
		likes: number;
	};
}

export interface ReviewsTypes {
	ok: boolean;
	data: ReviewWithUser[];
}

export interface ReviewItemTypes {
	ok: boolean;
	review: ReviewWithUser;
	isLiked: boolean;
}
