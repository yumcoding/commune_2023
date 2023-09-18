import type { Metadata } from "next";
export const metadata: Metadata = {
	title: "꼬뮨 | 내 서재",
};

export default function Layout(props: { children: React.ReactNode }) {
	return <div>{props.children}</div>;
}
