/* eslint-disable react/prop-types */ // Disabling prop-types linting rule as it's handled by TypeScript or other means

// Importing necessary dependencies and styles
import { useThemeContext } from '../context/themeContext'; // Importing theme context
import '../styles/card.css'; // Importing CSS styles for the country information component

// CountryInformation component
export const CountryInformation = ({ isLoading, data, errors, showCountryInformation, setShowCountryInformation }) => {
    // Using theme context
    const { contextTheme, themeColors } = useThemeContext();
    const { state } = showCountryInformation;

    // Function to handle click event for 'Back' button
    const handleClickBtnBack = () => {
        setShowCountryInformation({ state: false, codeCountry: '' });
        document.body.classList.remove("scroll-none"); // Allowing scrolling on body
    };

    // Function to handle click event for border country buttons
    const handleClickBorderCountry = (code) => setShowCountryInformation({ state: true, codeCountry: code });

    return (
        // Conditional rendering of the country information section based on state
        <section className={`container-information ${state ? 'visible' : ''}`} id={contextTheme === 'light' ? themeColors.light1 : themeColors.dark1}>
            {/* Back button */}
            <button className="btn-back" onClick={handleClickBtnBack} id={contextTheme === 'light' ? themeColors.light2 : themeColors.dark2}><i className="fa-solid fa-arrow-left"></i> Back</button>
            {
                // Conditional rendering based on loading state and errors
                isLoading
                    ? <h4>Loading...</h4>
                    : errors
                        ? <p>An error has occurred: {errors}</p>
                        : data?.map(country => {
                            return (
                                // Mapping through country data to display information
                                <article key={1}>
                                    <figure>
                                        <img src={country.flags.png} alt={country.flags.alt} />
                                    </figure>
                                    <div className="box-information">
                                        <h2>{country.name.common}</h2>
                                        <div className="box-text">
                                            {/* Displaying various information about the country */}
                                            <ul>
                                                <li>Native Name: <span>{Object.values(country.name.nativeName)[0].common}</span></li>
                                                <li>Population: <span>{country.population.toLocaleString()}</span></li>
                                                <li>Region: <span>{country.region}</span></li>
                                                <li>Sub Region: <span>{country.subregion}</span></li>
                                                <li>Capital: <span>{country.capital[0]}</span></li>
                                            </ul>
                                            <ul>
                                                <li>Top Level Domain: <span>{country.tld[0]}</span></li>
                                                <li>Currencies: <span>{Object.values(country.currencies)[0].name}</span></li>
                                                <li>Languages: 
                                                    <span>
                                                        {
                                                            // Mapping through languages to display
                                                            Object.values(country.languages).map((language, index) => <span key={index}>  {language}{index !== Object.values(country.languages).length - 1 ? ', ' : ''}</span>)
                                                        }
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                        {/* Displaying border countries */}
                                        <div className="border-countries">
                                            <p>Border Countries:</p>
                                            <div className="group-border">
                                                {
                                                    // Rendering border country buttons or displaying 'N/A'
                                                    country.borders?.length >= 1
                                                    ? Object.values(country.borders).map((border, index) => <button key={index} id={contextTheme === 'light' ? themeColors.light2 : themeColors.dark2} onClick={(e) => handleClickBorderCountry(e.target.textContent)}>{border}</button>)
                                                    : <p>N/A</p>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            )
                        })
            }
        </section>
    )
};
