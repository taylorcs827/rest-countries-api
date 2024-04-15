/* eslint-disable react/prop-types */ // Disabling prop-types linting for this file
import { useState } from "react"; // Importing useState hook
import { useThemeContext } from "../context/themeContext"; // Importing theme context

// SectionFilter component
export const SectionFilter = ({onSearchinputChange, onClikRegionFilter}) => {
    // Using theme context
    const {contextTheme, themeColors} = useThemeContext();
    // State for showing/hiding region filter
    const [showFilter, setShowFilter] = useState(false);
    
    // Function to handle showing/hiding region filter
    const handleShowFilter = () => setShowFilter(!showFilter);

    // Function to handle region filter click
    const handleClickRegion = (region) => {
        // Call the parent component's function to update region filter
        onClikRegionFilter(region);
        // Hide the region filter
        setShowFilter(false);
    };

    return (
        // Section for filtering
        <section className="section-filter"> 
            <div className="container">
                {/* Search input box */}
                <div className="box-search"  id={contextTheme === 'light' ? themeColors.light2 : themeColors.dark2}>
                    <i className="fa-solid fa-magnifying-glass"></i> {/* Magnifying glass icon */}
                    {/* Search input field */}
                    <input type="text" className="input-search" placeholder="Search for a country..." 
                    onChange={(e) => onSearchinputChange(e.target.value)}
                    id={contextTheme === 'light' ? themeColors.light2 : themeColors.dark2} />
                </div>
                {/* Region filter dropdown */}
                <div className="box-filter"  >
                    {/* Filter header with toggle arrow */}
                    <div onClick={handleShowFilter} id={contextTheme === 'light' ? themeColors.light2 : themeColors.dark2}>
                        <p>Filter By Region</p> {/* Text for filter header */}
                        <i className="fa-solid fa-chevron-down"></i> {/* Chevron down icon */}
                    </div>
                    {/* Region filter options */}
                    <ul className={`regions ${showFilter ? 'visible' : ''}`} id={contextTheme === 'light' ? themeColors.light2 : themeColors.dark2}>
                        {/* Region options */}
                        <li className="filter-region" onClick={() => handleClickRegion('All')}>All</li>
                        <li className="filter-region" onClick={() => handleClickRegion('Africa')}>Africa</li>
                        <li className="filter-region" onClick={() => handleClickRegion('Americas')}>America</li>
                        <li className="filter-region" onClick={() => handleClickRegion('Asia')}>Asia</li>
                        <li className="filter-region" onClick={() => handleClickRegion('Europe')}>Europe</li>
                        <li className="filter-region" onClick={() => handleClickRegion('Oceania')}>Oceania</li>
                    </ul>
                </div>
            </div>
        </section>
    );
};
