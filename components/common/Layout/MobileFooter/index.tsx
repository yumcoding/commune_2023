"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, SearchIcon, LoginIcon, UserDefaultIcon, LibraryIcon, LogOutIcon } from "@/assets/icons";
import styles from "./styles.module.scss";
import { signIn, signOut, useSession } from "next-auth/react";
import { cls } from "@/lib/front/cls";

export default function MobileFooter() {
	const { footerWrapper, nav, isActive, logoutBtn } = styles;
	const pathname = usePathname();

	const { data: session } = useSession();

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
						<li className={pathname === "/search" || pathname.includes("book") ? isActive : ""}>
							<Link href="/search">
								<SearchIcon />
								<span>검색</span>
							</Link>
						</li>
						{session?.user && (
							<li className={pathname === "/library" ? isActive : ""}>
								<Link href="/library">
									<LibraryIcon />
									<span>내 서재</span>
								</Link>
							</li>
						)}
						{session?.user ? (
							<li className={pathname.includes("/signout") ? isActive : ""}>
								<button type="button" className={logoutBtn} onClick={() => signOut()}>
									<LogOutIcon />
									<span>로그아웃</span>
								</button>
							</li>
						) : (
							<li className={pathname === "/auth/signin" ? isActive : ""}>
								<button type="button" onClick={() => signIn()}>
									<LoginIcon />
									<span>로그인</span>
								</button>
							</li>
						)}
					</ul>
				</nav>
			</footer>
		</div>
	);
}
