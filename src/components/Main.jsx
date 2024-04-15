// Importing necessary dependencies and styles
import { SectionFilter } from "./SectionFilter"; // Importing SectionFilter component
import '../styles/main.css'; // Importing CSS styles for the main component
import { useThemeContext } from "../context/themeContext"; // Importing theme context
import { useEffect, useState } from "react"; // Importing useEffect and useState hooks
import { Card } from "./CardCountry"; // Importing CardCountry component
import { CountryInformation } from "./CountryInformation"; // Importing CountryInformation component
import { useFetch } from "../hooks/useFetch"; // Importing custom useFetch hook

// Main component
export const Main = () => {
    // Using theme context
    const { contextTheme, themeColors } = useThemeContext();

    // State variables
    const [showButton, setShowButton] = useState(false); // State for showing/hiding scroll-to-top button
    const [searchInput, setSearchInput] = useState(''); // State for search input
    const [regionFilter, setRegionFilter] = useState('All'); // State for region filter
    const [showCountryInformation, setShowCountryInformation] = useState({state: false, codeCountry: ''}); // State for showing country information
    const { codeCountry } = showCountryInformation; // Destructuring codeCountry from showCountryInformation

    // Fetching data for individual country
    const code = codeCountry !== '' ? codeCountry : 'co'; // Default country code
    const { isLoading, data, errors } = useFetch(`https://restcountries.com/v3.1/alpha/${code}`); // Fetching country data based on code

    // Effect to handle scroll event for showing/hiding scroll-to-top button
    useEffect(() => {
        const handleScroll = () => {
            // Show button if scrolled beyond 800px
            if (window.scrollY > 800) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        // Adding scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Cleaning up event listener
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Function to scroll to the top of the page
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Function to handle search input change
    const handleSearchInputChange = (value) => setSearchInput(value);

    // Function to handle region filter change
    const handleRegionFilter = (region) => setRegionFilter(region);

    return (
        // Main section with dynamic styling based on theme
        <main className="main" id={contextTheme === 'light' ? themeColors.light1 : themeColors.dark1}>
            {/* SectionFilter component for search input and region filter */}
            <SectionFilter onSearchinputChange={handleSearchInputChange} onClikRegionFilter={handleRegionFilter}></SectionFilter>
            {/* CardCountry component for displaying countries */}
            <Card searchInput={searchInput} regionFilter={regionFilter} setShowCountryInformation={setShowCountryInformation}></Card>
            {/* Scroll-to-top button */}
            {
                showButton && (
                    <button className="arrow-top" id={contextTheme === 'light' ? themeColors.light1 : themeColors.dark1} onClick={scrollToTop}>⬆️</button>
                )
            }
            {/* CountryInformation component for displaying detailed country information */}
            <CountryInformation isLoading={isLoading} data={data} errors={errors} showCountryInformation={showCountryInformation} setShowCountryInformation={setShowCountryInformation}></CountryInformation>
        </main>
    );
};
