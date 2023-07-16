"use client";

import { createContext, useState } from "react";

interface valueTypes {
	query: string | undefined;
	setQuery: (query: string | undefined) => void;
}

const queryContextDefaultValue: valueTypes = {
	query: "",
	setQuery: () => {},
};

export const SearchQueryContext = createContext(queryContextDefaultValue);

export default function SearchQueryProvider({ children }: { children: React.ReactNode }) {
	const [query, setQuery] = useState<string | undefined>();
	return <SearchQueryContext.Provider value={{ query, setQuery }}>{children}</SearchQueryContext.Provider>;
}
