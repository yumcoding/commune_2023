"use client";
import useScrollRestoration from "@/hooks/useScrollRestoration";

export default function ScrollRestoration({ children }: { children: React.ReactNode }) {
	useScrollRestoration();
	return <>{children}</>;
}
