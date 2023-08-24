import { Noto_Sans_KR, Dancing_Script } from "next/font/google";

export const noto_sans = Noto_Sans_KR({
	weight: ["400", "500", "700", "900"],
	subsets: ["latin"],
	display: "swap",
});

export const dancing_script = Dancing_Script({
	weight: "700",
	subsets: ["latin"],
});
