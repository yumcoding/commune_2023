"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, SearchIcon, LoginIcon, UserDefaultIcon } from "@/assets/icons";
import styles from "./styles.module.scss";

export default function MobileFooter() {
	const { footerWrapper, nav, isActive } = styles;
	const pathname = usePathname();

	return (
		<div className={footerWrapper}>
			<footer>
				<nav className={nav}>
					<ul>
						<li className={pathname === "/" ? isActive : ""}>
							<Link href="/">
								<HomeIcon />
								<span>홈</span>
							</Link>
						</li>
						<li className={pathname === "/search" ? isActive : ""}>
							<Link href="/search">
								<SearchIcon />
								<span>검색</span>
							</Link>
						</li>
						<li className={pathname === "/login" ? isActive : ""}>
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
