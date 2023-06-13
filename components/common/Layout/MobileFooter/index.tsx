"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cls } from "@/lib/front/cls";
import { HomeIcon, SearchIcon, LoginIcon, UserDefaultIcon } from "@/assets/icons";
import styles from "./styles.module.scss";

export default function MobileFooter() {
	const pathname = usePathname();

	return (
		<div className={styles.footerWrapper}>
			<footer>
				<nav className={styles.nav}>
					<ul>
						<li className={pathname === "/" ? styles.isActive : ""}>
							<Link href="/">
								<HomeIcon />
								<span>홈</span>
							</Link>
						</li>
						<li className={pathname === "/search" ? styles.isActive : ""}>
							<Link href="/search">
								<SearchIcon />
								<span>검색</span>
							</Link>
						</li>
						<li className={pathname === "/login" ? styles.isActive : ""}>
							<button type="button">
								<LoginIcon />
								<span>로그인</span>
							</button>
						</li>
					</ul>
				</nav>
			</footer>
		</div>
	);
}
