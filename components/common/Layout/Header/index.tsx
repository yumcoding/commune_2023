"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cls } from "@/lib/front/cls";
import { useEffect, useState, useRef } from "react";
import { SearchIcon } from "@/assets/icons";
import styles from "./styles.module.scss";
import { dancing_script } from "@/app/fonts";

export default function Header() {
	const pathname = usePathname();

	// create border bottom on scroll
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

	// toggle input on click
	const searchRef = useRef<HTMLFormElement>(null);
	const [isSearchVisible, setIsSearchVisible] = useState(false);
	const showSearch = () => {
		if (!isSearchVisible) {
			return setIsSearchVisible(true);
		} else {
			return;
		}
	};

	useEffect(() => {
		const checkIfClickedOutside = (e: MouseEvent): void => {
			if (isSearchVisible && searchRef.current && e.target instanceof HTMLElement && !searchRef.current.contains(e.target)) {
				setIsSearchVisible(false);
			}
		};

		document.addEventListener("mousedown", checkIfClickedOutside);
		return () => {
			document.removeEventListener("mousedown", checkIfClickedOutside);
		};
	}, [isSearchVisible]);

	return (
		<>
			<div className={cls(styles.headerWrapper, hasBorder ? styles.hasBorder : "")}>
				<header className={styles.header}>
					{/* 좌 */}
					<div>
						<h1 className={cls(styles.logo, dancing_script.className)}>
							<Link href="/">Commune</Link>
						</h1>
						<nav className={styles.nav}>
							<ul>
								<li className={pathname === "/" ? styles.isActive : ""}>
									<Link href="/" className={styles.link}>
										책
									</Link>
								</li>
								<li className={pathname === "/movie" ? styles.isActive : ""}>
									<button type="button" className={styles.link}>
										영화
									</button>
								</li>
								<li className={pathname === "/music" ? styles.isActive : ""}>
									<button type="button" className={styles.link}>
										음악
									</button>
								</li>
							</ul>
						</nav>
					</div>
					{/* 우 */}
					<div className={styles.menuWrapper}>
						<div className={styles.menu}>
							<form className={cls(styles.search, isSearchVisible ? styles.visible : "")} ref={searchRef} onClick={showSearch}>
								<input type="text" />
								<SearchIcon />
							</form>

							<button type="button" className={styles.loginBtn}>
								로그인
							</button>
							{/* isAuthenticated&&<Link href="/profile">프로필</Link> */}
						</div>
					</div>
				</header>
			</div>
		</>
	);
}
