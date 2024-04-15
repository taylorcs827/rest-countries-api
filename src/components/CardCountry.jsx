/* eslint-disable react/prop-types */
import { useThemeContext } from '../context/themeContext'
import { useFetch } from '../hooks/useFetch'
import '../styles/card.css'

export const Card = ({searchInput, regionFilter, setShowCountryInformation}) => {
    const { contextTheme, themeColors } = useThemeContext()
    const { isLoading, data, errors } = useFetch('https://restcountries.com/v3.1/all')

    let filteredCountries = data

    if(regionFilter !== 'All'){
        filteredCountries = data?.filter(country => {
            const input = country.name.official.toLowerCase().includes(searchInput.toLowerCase().trim())
            const region = country.region.toLowerCase() === regionFilter.toLowerCase()
            return input && region
        })
    }else{
        filteredCountries = data?.filter(country => country.name.official.toLowerCase().includes(searchInput.toLowerCase().trim()))
    }

    const handleClickFlag = (codeCountry) => {
        setShowCountryInformation({state: true, codeCountry})
        document.body.classList.add('scroll-none')
    }

    return (
        <>
            <section className="section-countries">
            {
                isLoading
                    ? <h4>Loading...</h4>
                    : errors
                        ? <p>An error has occurred</p>
                        : <div className='container' id={contextTheme === 'light' ? themeColors.light1 : themeColors.dark1}>
                            {
                                filteredCountries.map((country, index) => {
                                    return (
                                        <article className="card" id={contextTheme === 'light' ? themeColors.light2 : themeColors.dark2} key={index}>
                                            <figure className="img-card" onClick={() => handleClickFlag(country.cca2)}>
                                                <img src={country.flags.png} alt={country.flags.alt} />
                                            </figure>
                                            <div className="information-card">
                                                <p className="name-country">{country.name.official}</p>
                                                <p className="population-country">Population: <span>{country.population.toLocaleString()}</span></p>
                                                <p className="region-country">Region: <span>{country.region}</span></p>
                                                <p className="capital-country">Capital: <span>{country.capital}</span></p>
                                            </div>
                                        </article>
                                    )
                                })
                            }
                        </div>
            }
            </section>
        </>
    )
}
