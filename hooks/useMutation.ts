import { useState } from "react";

interface MutationStateTypes<T> {
	mutateLoading: boolean;
	mutateResult?: T;
	mutateError?: object;
}

type MutationResultTypes<T> = [(data: any) => void, MutationStateTypes<T>];

export default function useMutation<T = any>(url: string, method: string): MutationResultTypes<T> {
	const [state, setState] = useState<MutationStateTypes<T>>({
		mutateLoading: false,
		mutateResult: undefined,
		mutateError: undefined,
	});

	function mutateData(data: any) {
		setState((prev) => ({ ...prev, mutateLoading: true }));
		fetch(url, {
			method,
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((resp) => resp.json())
			.then((data) => setState((prev) => ({ ...prev, mutateLoading: false, mutateResult: data })))
			.catch((error) => setState((prev) => ({ ...prev, mutateError: error, mutateLoading: false })));
	}

	return [mutateData, { ...state }];
}
