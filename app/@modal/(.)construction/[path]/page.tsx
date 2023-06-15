import ModalOverlay from "@/components/common/Modal/ModalOverlay";
import ConstructionContent from "@/components/common/ConstructionContent";

export default function Page() {
	return (
		<ModalOverlay>
			<ConstructionContent isModal={true} />
		</ModalOverlay>
	);
}
