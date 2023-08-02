import "./globals.css";
import { noto_sans } from "./fonts";
import MobileFooter from "@/components/common/Layout/MobileFooter";
import Header from "@/components/common/Layout/Header";
import AuthSessionProvider from "@/providers/authSessionProvider";

export const metadata = {
	title: "Commune",
	description: "느슨한 취향 공동체",
};

export default function RootLayout({ modal, children }: { modal: React.ReactNode; children: React.ReactNode }) {
	return (
		<html lang="ko">
			<body className={noto_sans.className}>
				<AuthSessionProvider>
					<Header />
					{children}
					<MobileFooter />
					{modal}
				</AuthSessionProvider>
			</body>
		</html>
	);
}
