"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cls } from "@/lib/front/cls";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";

// 720 이상 display block
export default function Header() {
	const pathname = usePathname();

	const [hasBorder, setHasBorder] = useState(false);

	const changeBorder = () => {
		if (window.scrollY > 0) {
			setHasBorder(true);
		} else {
			setHasBorder(false);
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", changeBorder);
		return () => {
			window.removeEventListener("scroll", changeBorder);
		};
	}, []);

	return (
		<header className={cls(styles.header, hasBorder ? styles.hasBorder : "")}>
			{/* 좌 */}
			<div>
				<h1 className={styles.logo}>
					<Link href="/">Commune</Link>
				</h1>
				<nav>
					<ul>
						<li className={cls(styles.navItem, pathname === "/" ? styles.isActive : "")}>
							<Link href="/">책</Link>
						</li>
						<li className={cls(styles.navItem, pathname === "/movie" ? styles.isActive : "")}>
							<button type="button">영화</button>
						</li>
						<li className={cls(styles.navItem, pathname === "/music" ? styles.isActive : "")}>
							<button type="button">음악</button>
						</li>
					</ul>
				</nav>
			</div>

			{/* 우 */}
			<div className={styles.menu}>
				<button type="button">검색</button>
				<button type="button">로그인</button>
				{/* isAuthenticated&&<Link href="/profile">프로필</Link> */}
			</div>
		</header>
	);
}
