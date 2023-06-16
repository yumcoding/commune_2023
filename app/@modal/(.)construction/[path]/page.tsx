import ModalOverlay from "@/components/common/Modal/ModalOverlay";
import UnderConstructionContent from "@/components/common/UnderConstructionContent";

export default function Page() {
	return (
		<ModalOverlay>
			<UnderConstructionContent isModal={true} />
		</ModalOverlay>
	);
}
