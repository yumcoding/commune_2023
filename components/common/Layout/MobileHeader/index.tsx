"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cls } from "@/lib/front/cls";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";

export default function MobileHeader() {
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
		<header className={cls(styles.header, hasBorder ? styles.scrolled : "")}>
			<h1 className="visuallyHidden">Commune</h1>
			<nav>
				<ul>
					<li className={cls(styles.navItem, pathname === "/" ? styles.isActive : "")}>
						<Link href="/">책</Link>
					</li>
					{/* 준비중 modal */}
					<li className={cls(styles.navItem, pathname === "/movie" ? styles.isActive : "")}>
						<button type="button">영화</button>
					</li>
					{/* 준비중 modal */}
					<li className={cls(styles.navItem, pathname === "/music" ? styles.isActive : "")}>
						<button type="button">음악</button>
					</li>
				</ul>
			</nav>
		</header>
	);
}
