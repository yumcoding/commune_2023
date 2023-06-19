import BookSection from "@/components/home/BookSection";
import styles from "./styles.module.scss";
export default function Page() {
	return (
		<main className={styles.main}>
			<BookSection title="내 쪼대로 추천" />
			<div style={{ height: "100vh" }}></div>
			<p>
				a;kfdja;ksdjf;kafja;k Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam perferendis tempora debitis expedita? Magnam veritatis illum enim? Minus ducimus eligendi eius atque
				nostrum, placeat ut neque, officia maxime voluptas inventore. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero unde voluptatibus earum tempore. Culpa aperiam officia obcaecati ex
				vero, maiores quas nihil doloribus, reprehenderit sit ratione, magnam maxime aliquid ea? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam porro quaerat pariatur deleniti a
				voluptate nam molestias soluta quidem? Ab iste soluta modi harum deserunt? Ipsum impedit saepe atque rem!
			</p>
		</main>
	);
}
