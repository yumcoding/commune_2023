export default function Layout(props: { writeReviewModal: React.ReactNode; children: React.ReactNode }) {
	return (
		<div>
			{props.writeReviewModal}
			{props.children}
		</div>
	);
}
