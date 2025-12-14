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
    function updateMultipleParams(value: string, value2: string) {
        setSearchParams(prev => {
            let next = new URLSearchParams(prev)

            if (value === 'any') {
                next.delete("minPrice");
                next.delete("maxPrice");
            }
            next.set("minPrice", value);
            next.set("maxPrice", value2);
            return next
        })
    }

    return { searchParams, getParams, updateParams, updateMultipleParams };
}
