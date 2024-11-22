import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance"; 

const useQuote = () => {
  const [quoteData, setQuoteData] = useState({ quote: "", author: "" });

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await axiosInstance.get("/random");
        setQuoteData({
          quote: response.data.content,
          author: response.data.author,
        });
      } catch (error) {
        setQuoteData({ quote: "Unable to fetch quote", author: "N/A" });
      }
    };

    fetchQuote();
  }, []);

  return quoteData;
};

export default useQuote;
