import { createContext, useContext, useEffect, useMemo, useState } from "react"; // Importing necessary hooks and functions
import PropTypes from 'prop-types'; // Importing PropTypes for type checking

// Creating a new context for theme
export const ThemeContext = createContext();

// ThemeContextProvider component
export const ThemeContextProvider = ({children}) => {
    // Options for dark mode
    const darkModeOptions = {
        dark1: "dark-mode-bg", // Background color for dark mode
        dark2: "dark-mode-elements" // Color for elements in dark mode
    };

    // Options for light mode
    const lightModeOptions = {
        light1: "light-mode-bg", // Background color for light mode
        light2: "light-mode-elements" // Color for elements in light mode
    };

    // State for storing current theme
    const [contextTheme, setContextTheme] = useState(() => {
        // Get saved theme from local storage, default to light mode if not found
        const savedTheme = localStorage.getItem("theme");
        return savedTheme || "light";
    });

    // Effect to update local storage when theme changes
    useEffect(() => {
        localStorage.setItem("theme", contextTheme);
    }, [contextTheme]);

    // Memoized object storing theme colors based on current theme
    const themeColors = useMemo(() => {
        return contextTheme === "dark" ? darkModeOptions : lightModeOptions;
    }, [contextTheme]);

    // Memoized object storing context values
    const values = useMemo(() => {
        return {
            contextTheme, // Current theme
            setContextTheme, // Function to update theme
            themeColors // Theme colors based on current theme
        };
    }, [contextTheme, themeColors]);

    // Providing context values to children components
    return (
        <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
    );
};

// PropTypes validation for ThemeContextProvider
ThemeContextProvider.propTypes = {
    children: PropTypes.node // Children should be a node
};

// Custom hook to consume theme context
export function useThemeContext() {
    return useContext(ThemeContext); // Returning theme context
}
