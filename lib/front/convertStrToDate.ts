export default function convertStrToDate(str: string) {
	return `${str.substring(0, 4)}.${str.substring(4, 6)}.${str.substring(6)}`;
}
