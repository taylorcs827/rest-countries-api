// Importing necessary dependencies and styles
import Switch from 'react-switch'; // Importing the Switch component
import { useThemeContext } from '../context/themeContext'; // Importing theme context
import { useState } from 'react'; // Importing useState hook for managing state
import '../styles/header.css'; // Importing CSS styles for the header component

// Header component
export const Header = () => {
    // Using theme context and managing state for switch component
    const { contextTheme, setContextTheme, themeColors } = useThemeContext();
    const [checked, setChecked] = useState(false);

    // Function to handle switch toggle
    const handleSwitch = (nextChecked) => {
        // Toggling theme between light and dark
        setContextTheme((state) => state === 'light' ? 'dark' : 'light');
        // Setting the state of the switch
        setChecked(nextChecked);
    };

    return (
        // Header section with dynamic styling based on theme
        <header className="header" id={contextTheme === 'light' ? themeColors.light2 : themeColors.dark2}>
            <div className='container'>
                <h1 className="title-header">Where in the world?</h1>
                {/* Switch component for toggling between light and dark mode */}
                <label htmlFor="sun-moon-switch" className='switch-mode'>
                    <Switch
                        checked={checked}
                        onChange={handleSwitch}
                        handleDiameter={28}
                        offColor="#2B3743"
                        onColor="#FFFFFF"
                        offHandleColor="#FFFFFF"
                        onHandleColor="#2B3743"
                        height={40}
                        width={70}
                        borderRadius={20}
                        uncheckedIcon={
                            // Icon for dark mode
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "100%",
                                    fontSize: 20,
                                    color: "#000",
                                    paddingRight: 0
                                }}
                            >
                                🌜
                            </div>
                        }
                        checkedIcon={
                            // Icon for light mode
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "100%",
                                    fontSize: 20,
                                    color: "#f3f3f3",
                                    paddingLeft: 0
                                }}
                            >
                                ☀️
                            </div>
                        }
                        uncheckedHandleIcon={
                            // Handle icon for dark mode
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "100%",
                                    fontSize: 20
                                }}
                            >
                                ☀️
                            </div>
                        }
                        checkedHandleIcon={
                            // Handle icon for light mode
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "100%",
                                    fontSize: 20,
                                }}
                            >
                                🌜
                            </div>
                        }
                        className="react-switch"
                        id="sun-moon-switch"
                    />
                </label>
            </div>
        </header>
    )
}
