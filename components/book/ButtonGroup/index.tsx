"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import useScrollDownCheck from "@/hooks/useScrollDownCheck";
import { cls } from "@/lib/front/cls";
import { ArrowLeftIcon, CartIcon, LinkIcon } from "@/assets/icons";
import styles from "./styles.module.scss";

export default function ButtonGroup() {
	const { wrapper, leftGroup, hasScrolled } = styles;

	const hasScrolledDown = useScrollDownCheck();

	const router = useRouter();
	const goBack = () => router.back();
	return (
		<>
			<div className={cls(wrapper, hasScrolledDown ? hasScrolled : "")}>
				<button type="button" onClick={goBack}>
					<ArrowLeftIcon />
				</button>
				<div className={leftGroup}>
					<button type="button">
						<LinkIcon />
					</button>
					<Link href="/">
						<CartIcon />
					</Link>
				</div>
			</div>
		</>
	);
}
