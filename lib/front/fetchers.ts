import convertXMLtoJSON from "./convertXMLtoJSON";

const requestHeaders = new Headers();
requestHeaders.set("Content-Type", "application/json");
requestHeaders.set("X-Naver-Client-Id", process.env.NEXT_PUBLIC_NAVER_CLIENT_ID ? process.env.NEXT_PUBLIC_NAVER_CLIENT_ID : "");
requestHeaders.set("X-Naver-Client-Secret", process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET ? process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET : "");

export const searchFetcher = (url: string) =>
	fetch(url, {
		headers: requestHeaders,
	}).then((res) => res.json());

export const searchFetcherXML = (url: string) =>
	fetch(url, {
		headers: requestHeaders,
	})
		.then((res) => res.text())
		.then((xmlString) => {
			const xmlNode = new DOMParser().parseFromString(xmlString, "text/xml");
			const json: any = convertXMLtoJSON(xmlNode);
			const { rss } = json;
			return rss.channel.item;
		});

export const fetcher = (url: string) => fetch(url).then((res) => res.json());
