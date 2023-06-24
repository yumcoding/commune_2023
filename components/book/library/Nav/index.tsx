"use client";

import { ArrowLeftIcon } from "@/assets/icons";
import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";
import useScrollDownCheck from "@/hooks/useScrollDownCheck";
import { cls } from "@/lib/front/cls";

export default function Nav() {
	const { nav, scrolled, backBtn, logoutBtn } = styles;

	const hasScrolledDown = useScrollDownCheck();

	const router = useRouter();
	const onClickBack = () => router.back();

	return (
		<nav className={cls(nav, hasScrolledDown ? scrolled : "")}>
			<button type="button" className={backBtn} onClick={onClickBack}>
				<ArrowLeftIcon />
			</button>
			<button type="button" className={logoutBtn}>
				로그아웃
			</button>
		</nav>
	);
}
