"use client";
import { cls } from "@/lib/front/cls";
import styles from "./styles.module.scss";
import { useParams, usePathname } from "next/navigation";
import { useEffect } from "react";

// tsconfig.json 수정
function xmlToJson(xml) {
	// Create the return object
	var obj = {};

	if (xml.nodeType == 1) {
		// element
		// do attributes
		if (xml.attributes.length > 0) {
			obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) {
		// text
		obj = xml.nodeValue;
	}

	// do children
	// If all text nodes inside, get concatenated text from them.
	var textNodes = [].slice.call(xml.childNodes).filter(function (node) {
		return node.nodeType === 3;
	});
	if (xml.hasChildNodes() && xml.childNodes.length === textNodes.length) {
		obj = [].slice.call(xml.childNodes).reduce(function (text, node) {
			return text + node.nodeValue;
		}, "");
	} else if (xml.hasChildNodes()) {
		for (var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof obj[nodeName] == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof obj[nodeName].push == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
}

const requestHeaders = new Headers();
requestHeaders.set("Content-Type", "application/json");
requestHeaders.set("X-Naver-Client-Id", process.env.NEXT_PUBLIC_NAVER_CLIENT_ID ? process.env.NEXT_PUBLIC_NAVER_CLIENT_ID : "");
requestHeaders.set("X-Naver-Client-Secret", process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET ? process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET : "");

const searchFetcherByIsbn = async (url) => {
	const res = await fetch(url, { headers: requestHeaders });
	const xmlString = await res.text();
	const xmlNode = new DOMParser().parseFromString(xmlString, "text/xml");
	const json = xmlToJson(xmlNode);
	const { rss } = json;
	return rss.channel.item;
};

export default async function BookInfo(isbn) {
	const { section, bookWrapper, book, bookInfo, bookImg, sectionContentWrapper, summary } = styles;

	useEffect(() => {
		searchFetcherByIsbn(`/openapi/v1/search/book_adv.xml?d_isbn=${isbn.isbn}`);
	}, [isbn]);

	// console.log("data", data);
	return (
		<>
			<div className={bookWrapper}>
				<div className={book}>
					<div className={bookImg}></div>
					<div className={bookInfo}>
						<h1>책 제목</h1>
						<p>작가 | 출판사 | 출간일</p>
					</div>
				</div>
			</div>

			<section className={cls(section, summary)}>
				<div className={sectionContentWrapper}>
					<h2>책 소개</h2>
					<p>
						모든 국민은 학문과 예술의 자유를 가진다. 대한민국은 국제평화의 유지에 노력하고 침략적 전쟁을 부인한다. 국회는 국민의 보통·평등·직접·비밀선거에 의하여 선출된 국회의원으로 구성한다. 누구든지
						병역의무의 이행으로 인하여 불이익한 처우를 받지 아니한다. 모든 국민은 보건에 관하여 국가의 보호를 받는다. 국무위원은 국무총리의 제청으로 대통령이 임명한다. 헌법재판소는 법관의 자격을 가진
						9인의 재판관으로 구성하며, 재판관은 대통령이 임명한다. 모든 국민은 근로의 의무를 진다. 국가는 근로의 의무의 내용과 조건을 민주주의원칙에 따라 법률로 정한다. 혼인과 가족생활은 개인의 존엄과
						양성의 평등을 기초로 성립되고 유지되어야 하며, 국가는 이를 보장한다.
					</p>
				</div>
			</section>
		</>
	);
}
