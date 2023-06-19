"use client";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { dancing_script } from "@/app/fonts";
import { cls } from "@/lib/front/cls";
import styles from "./styles.module.scss";
import { SearchIcon, UserDefaultIcon } from "@/assets/icons";
import { recentSearch, popularSearch } from "@/assets/mockData";
import SearchRecommendation from "@/components/search/SearchRecommendation";

export default function Header() {
	const { headerWrapper, isHome, hasBorder: hasBorderCss, header, logo, nav, isActive, link, menuWrapper, menu, searchWrapper, search, searchDropdown, visible, loginBtn } = styles;

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
			<div className={cls(headerWrapper, hasBorder ? hasBorderCss : "", pathname === "/" || pathname.includes("construction") ? isHome : "")}>
				<header className={header}>
					{/* 좌 */}
					<div>
						<h1 className={cls(logo, dancing_script.className)}>
							<Link href="/">Commune</Link>
						</h1>
						<nav className={nav}>
							<ul>
								<li className={pathname === "/" || pathname === "/search" || pathname === "/profile" ? isActive : ""}>
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
							{/* TODO */}
							{/* 태블릿, 데탑에서 검색 시 onSubmit하고 결과 받으면 router 이용해서 /search 페이지로 이동 */}
							<div className={searchWrapper}>
								<form className={cls(search, isSearchVisible ? visible : "")} ref={searchRef} onClick={showSearch}>
									<input type="text" placeholder="검색검색" />
									<SearchIcon />
								</form>
								{isSearchVisible && (
									<div className={searchDropdown}>
										<SearchRecommendation isRecent={true} />
										<SearchRecommendation isRecent={false} />
									</div>
								)}
							</div>

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
