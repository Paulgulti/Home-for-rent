import { useEffect, useState } from "react";
import { useQueryParams } from "./useQueryParams";

export function useDebounce(value: string, delay = 500) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    // const { getParams, updateParams } = useQueryParams()

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);

    // updateParams("search", debouncedValue)
    return debouncedValue;
}