import { useSearchParams } from "react-router";

export function useQueryParams() {
    const [searchParams, setSearchParams] = useSearchParams()

    function getParams(key: string, fallback: string) {
        return searchParams.get(key) || fallback
    }

    function updateParams(key: string, value: string) {
        let newParams = new URLSearchParams(searchParams.toString());
        newParams.set(key, value);
        return setSearchParams(newParams);
    }
    function updateMultipleParams(minPrice: string, value: string, maxPrice: string, value2: string) {
        return setSearchParams({minPrice: value, maxPrice: value2});
    }

    return { searchParams, getParams, updateParams, updateMultipleParams };
}
