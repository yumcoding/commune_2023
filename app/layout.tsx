import "./globals.css";
import { noto_sans } from "./fonts";

export const metadata = {
	title: "Commune",
	description: "느슨한 취향 공동체",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ko">
			<body className={noto_sans.className}>{children}</body>
		</html>
	);
}
