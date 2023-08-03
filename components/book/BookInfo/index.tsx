"use client";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { searchFetcherXML } from "@/lib/front/fetchers";
import { cls } from "@/lib/front/cls";
import styles from "./styles.module.scss";

export default function BookInfo() {
	const { section, bookWrapper, book, bookInfo, bookImg, sectionContentWrapper, summary } = styles;

	const params = useParams();
	const { data, isLoading, error } = useSWR(`/openapi/v1/search/book_adv.xml?d_isbn=${params.isbn}`, searchFetcherXML, {
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	});

	console.log("data", data);
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
