import "./globals.css";
import { Noto_Sans_KR } from "next/font/google";

const noto_sans = Noto_Sans_KR({
	weight: ["400", "500", "700", "900"],
	subsets: ["latin"],
	display: "swap",
});

export const metadata = {
	title: "Commune",
	description: "느슨한 취향 공동체",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={noto_sans.className}>{children}</body>
		</html>
	);
}
