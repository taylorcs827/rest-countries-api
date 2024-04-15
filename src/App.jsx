
import { Header } from './components/Header'
import './styles/App.css'
import { Main } from './components/Main'
import { useThemeContext } from './context/themeContext'

export const App = () => {
  const {contextTheme, themeColors} = useThemeContext()

  return (
      <div className='app' id={contextTheme === 'light' ? themeColors.light1 : themeColors.dark1}>
        <Header />
        <Main />
      </div>
  )
}
