import React, { createContext, useContext, useState } from 'react';

const ResultContext = createContext();
const baseUrl = 'https://www.googleapis.com/customsearch/v1';


export const ResultContextProvider = ({ children }) => {

    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('One Piece');

    // /videos, /search, /images
    const getResults = async (type) => {

        
        setIsLoading(true);

        const apiKey = process.env.REACT_APP_API_KEY;
        const searchEngineId = process.env.REACT_APP_SEARCH_ENGINE_ID;

      let url = ``;

      if (type === 'videos') {
        const youtubeBaseUrl = 'https://www.googleapis.com/youtube/v3/search';
        url = `${youtubeBaseUrl}?part=snippet&maxResults=100&q=${encodeURIComponent(searchTerm)}&key=${apiKey}&cx=${searchEngineId}`;
    } else if (type === 'news') {
        url = `${baseUrl}?key=${apiKey}&cx=${searchEngineId}&q=${searchTerm}%20news`;
    } else {
        url = `${baseUrl}?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(searchTerm)}`;
    }

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        setResults(data);
        // console.log(data);                        

        setIsLoading(false);


    }

    return (
        <ResultContext.Provider value={{ getResults, results, searchTerm, setSearchTerm, isLoading }}>
            {children}
        </ResultContext.Provider>

    )
}

export const useResultContext = () => useContext(ResultContext);