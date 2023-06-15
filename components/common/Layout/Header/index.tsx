"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cls } from "@/lib/front/cls";
import { useEffect, useState, useRef } from "react";
import { SearchIcon, UserDefaultIcon } from "@/assets/icons";
import styles from "./styles.module.scss";
import { dancing_script } from "@/app/fonts";

export default function Header() {
	const { headerWrapper, hasBorder: hasBorderCss, header, logo, nav, isActive, link, menuWrapper, menu, search, visible, loginBtn } = styles;

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
			<div className={cls(headerWrapper, hasBorder ? hasBorderCss : "")}>
				<header className={header}>
					{/* 좌 */}
					<div>
						<h1 className={cls(logo, dancing_script.className)}>
							<Link href="/">Commune</Link>
						</h1>
						<nav className={nav}>
							<ul>
								<li className={pathname === "/" ? isActive : ""}>
									<Link href="/" className={link}>
										책
									</Link>
								</li>
								<li className={pathname === "/construction/movie" ? isActive : ""}>
									<Link href="/construction/movie" className={link}>
										영화
									</Link>
								</li>
								<li className={pathname === "/construction/music" ? isActive : ""}>
									<Link href="/construction/music" className={link}>
										음악
									</Link>
								</li>
							</ul>
						</nav>
					</div>
					{/* 우 */}
					<div className={menuWrapper}>
						<div className={menu}>
							<form className={cls(search, isSearchVisible ? visible : "")} ref={searchRef} onClick={showSearch}>
								<input type="text" />
								<SearchIcon />
							</form>

							<button type="button" className={loginBtn}>
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
