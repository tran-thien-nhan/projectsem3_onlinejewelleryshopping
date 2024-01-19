import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get("https://localhost:7241/api/ItemMst");
                console.log(response.data.data);
                setItems(response.data.data);
            } catch (error) {
                console.error("list error:", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const value = {
        items,
        loading,
        error,
    };

    return (
        <ItemContext.Provider value={value}>
            {children}
        </ItemContext.Provider>
    );
};

export const useItem = () => {
    const context = useContext(ItemContext);
    return context;
};
