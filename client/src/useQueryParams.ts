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

    return { searchParams, getParams, updateParams };
}