"use client";
import { useEffect, useState, useRef, FormEvent, useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { dancing_script } from "@/app/fonts";
import { cls } from "@/lib/front/cls";
import styles from "./styles.module.scss";
import { LibraryIcon, LogOutIcon, SearchIcon } from "@/assets/icons";
import SearchRecommendation from "@/components/search/SearchRecommendation";
import useScrollDownCheck from "@/hooks/useScrollDownCheck";
import DefaultModalOverlay from "@/components/common/Modal/DefaultModalOverlay";
import UnderConstructionContent from "@/components/common/UnderConstructionContent";

export default function Header() {
	const { headerWrapper, isVisible, hasBorder: hasBorderCss, header, logo, nav, isActive, link, menuWrapper, menu, searchWrapper, search, searchDropdown, visible, loginBtn, libraryLink } = styles;

	//auth
	const { data: session } = useSession();

	// active link
	const pathname = usePathname();

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

	// 검색창 바깥 영역 클릭 시
	useEffect(() => {
		const checkIfClickedOutside = (e: MouseEvent): void => {
			console.log(e.target);
			if (isSearchVisible && searchRef.current && (e.target instanceof HTMLElement || e.target instanceof SVGElement) && !searchRef.current.contains(e.target)) {
				setIsSearchVisible(false);
			}
		};

		document.addEventListener("mousedown", checkIfClickedOutside);
		return () => {
			document.removeEventListener("mousedown", checkIfClickedOutside);
		};
	}, [isSearchVisible]);

	// scroll down 시 헤더 스타일링 변경
	const hasScrolledDown = useScrollDownCheck();

	// 검색어
	const router = useRouter();
	const inputRef = useRef<HTMLInputElement>(null);

	const onSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSearchVisible(false);
		router.push(`/search?query=${inputRef.current?.value}&pageIndex=1`);
	};

	// 준비 중 모달
	const [isModalVisible, setIsModalVisible] = useState(false);
	const onClickPrepareMenu = () => setIsModalVisible(true);
	const onClickClose = () => setIsModalVisible(false);

	return (
		<>
			<div className={cls(headerWrapper, hasScrolledDown ? hasBorderCss : "", pathname === "/" || pathname === "/auth/signin" ? isVisible : "")}>
				<header className={header}>
					{/* 좌 */}
					<div>
						<h1 className={cls(logo, dancing_script.className)}>
							<Link href="/">Commune</Link>
						</h1>
						<nav className={nav}>
							<ul>
								<li className={pathname === "/" || pathname.includes("/book") || pathname === "/search" || pathname === "/profile" ? isActive : ""}>
									<Link href="/" className={link}>
										책
									</Link>
								</li>
								<li>
									<button type="button" className={link} onClick={onClickPrepareMenu}>
										영화
									</button>
								</li>
								<li>
									<button type="button" className={link} onClick={onClickPrepareMenu}>
										음악
									</button>
								</li>
							</ul>
						</nav>
					</div>

					{/* 우 */}
					<div className={menuWrapper}>
						<div className={menu}>
							<div className={searchWrapper}>
								<form className={cls(search, isSearchVisible ? visible : "")} ref={searchRef} onClick={showSearch} onSubmit={onSearchSubmit}>
									<input type="text" placeholder="궁금한 책, 영화, 음악을 검색해봐요 :)" ref={inputRef} />
									<SearchIcon />
								</form>
								{isSearchVisible && (
									<div className={searchDropdown}>
										<SearchRecommendation isRecent={true} />
										<SearchRecommendation isRecent={false} />
									</div>
								)}
							</div>
							{session?.user ? (
								<>
									<Link href="/library" className={libraryLink} aria-label="내 서재로 이동">
										<LibraryIcon />
									</Link>
									<button type="button" onClick={() => signOut()} className={loginBtn}>
										로그아웃
									</button>
								</>
							) : (
								<>
									<button type="button" className={loginBtn} onClick={() => signIn()}>
										로그인
									</button>
								</>
							)}
						</div>
					</div>
				</header>
			</div>
			{isModalVisible && (
				<DefaultModalOverlay onClickOverlay={onClickClose}>
					<UnderConstructionContent onClickClose={onClickClose} />
				</DefaultModalOverlay>
			)}
		</>
	);
}
