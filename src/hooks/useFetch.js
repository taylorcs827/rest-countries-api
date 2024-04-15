import { useEffect } from "react"; // Importing useEffect hook
import { useState } from "react"; // Importing useState hook

// Custom hook for fetching data
export const useFetch = (url) => {
    
    // State to manage data fetching
    const [state, setState] = useState({
        data: null, // Initial data is null
        isLoading: true, // Initial loading state is true
        errors: null // Initial error is null
    });

    // Destructuring state object
    const {data, isLoading, errors} = state;

    // Function to fetch data
    const getFetch = async () => {
        try {
            // Fetch data from the provided URL
            const response = await fetch(url);
            // Parse response as JSON
            const data = await response.json();

            // Update state with fetched data and set loading to false
            setState({
                data,
                isLoading: false,
                errors: null
            });
        } catch (error) {
            // If there's an error, update state with error and set loading to false
            setState({
                data: null,
                isLoading: false,
                errors: error
            });
        }
    };

    // Effect to run the fetch function when URL changes
    useEffect(() => {
        // Check if URL exists, if not, return
        if (!url) return;
        // Call the fetch function
        getFetch();
    }, [url]);
    
    // Return data, loading state, and errors
    return {
        data,
        isLoading,
        errors
    };
};
