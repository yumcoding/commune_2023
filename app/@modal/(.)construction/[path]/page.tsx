import PageModalOverlay from "@/components/common/Modal/PageModalOverlay";
import UnderConstructionContent from "@/components/common/UnderConstructionContent";

export default function Page() {
	return (
		<PageModalOverlay>
			<UnderConstructionContent isModal={true} />
		</PageModalOverlay>
	);
}
