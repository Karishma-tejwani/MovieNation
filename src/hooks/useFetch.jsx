import { useEffect, useState } from "react";
import api from "../utils/api";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading("loading!");
        setData(null);
        setError(null);

        api(url)
            .then((res) => {
                setLoading(false);
                setData(res);
            })
            .catch((err) => {
                setLoading(false);
                setError("Error");
            });
    }, [url]);

    return { data, loading, error };
};

export default useFetch;