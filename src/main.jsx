import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App.jsx'
import './styles/index.css'
import { ThemeContextProvider } from './context/themeContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
 <ThemeContextProvider>
   <React.StrictMode>
     <App />
   </React.StrictMode>
 </ThemeContextProvider>,
)
