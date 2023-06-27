"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, SearchIcon, LoginIcon, UserDefaultIcon, LibraryIcon, LogOutIcon } from "@/assets/icons";
import styles from "./styles.module.scss";
import { signIn, signOut, useSession } from "next-auth/react";

export default function MobileFooter() {
	const { footerWrapper, nav, isActive } = styles;
	const pathname = usePathname();

	const { data: session, status } = useSession();

	console.log("session", session);

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
						<li className={pathname === "/login" ? isActive : ""}>
							{session?.user ? (
								<Link href="/library">
									<LibraryIcon />
									<span>내 서재</span>
								</Link>
							) : (
								<button type="button" onClick={() => signIn()}>
									<LoginIcon />
									<span>로그인</span>
								</button>
							)}
						</li>

						{session?.user && (
							<li>
								<button type="button" onClick={() => signOut()}>
									<LogOutIcon />
									로그아웃
								</button>
							</li>
						)}
					</ul>
				</nav>
			</footer>
		</div>
	);
}
