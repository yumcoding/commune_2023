"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { dancing_script } from "@/app/fonts";
import { cls } from "@/lib/front/cls";
import { LibraryIcon } from "@/assets/icons";
import useScrollDownCheck from "@/hooks/useScrollDownCheck";
import DefaultModalOverlay from "@/components/common/Modal/DefaultModalOverlay";
import UnderConstructionContent from "@/components/common/UnderConstructionContent";
import Search from "./Search";
import styles from "./styles.module.scss";

export default function Header() {
	const { headerWrapper, isVisible, hasBorder: hasBorderCss, header, logo, nav, isActive, link, menuWrapper, menu, loginBtn, libraryLink } = styles;

	//auth
	const { data: session } = useSession();

	// active link
	const pathname = usePathname();

	// scroll down 시 헤더 스타일링 변경
	const hasScrolledDown = useScrollDownCheck();

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
							<Search />

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
