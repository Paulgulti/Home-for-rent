import { useEffect, useState } from "react";

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