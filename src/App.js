import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ModeSwitcher from './components/ModeSwitcher';
import LocaleSelector from './components/LocaleSelector';
import LocalizedDatePicker from './components/LocalizedDatePicker';
import EasyModeScreen from './screens/EasyModeScreen';
import HardModeScreen from './screens/HardModeScreen';
import { getLocales } from './Locales.js';
import './assets/css/App.css';

const locales = getLocales();

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App() {
    const [locale, setLocale] = useState('GB');
    const [mode, setMode] = useState('easy');
    const [date, setDate] = useState(new Date());

    return (
        <ThemeProvider theme={darkTheme}>
            <div className='App'>
                <ModeSwitcher 
                    mode={mode}
                    setMode={setMode}
                    locale={locale}
                />
                <LocaleSelector
                    locale={locale}
                    setLocale={setLocale}
                />
                <div className="Headtitle">{locales[locale].headtitle}</div>
                <LocalizedDatePicker 
                    date={date} 
                    setDate={setDate} 
                    locale={locale} 
                />
                <EasyModeScreen 
                    display={mode === 'easy'}
                    locale={locale}
                    date={date}
                    setDate={setDate}
                />
                <HardModeScreen 
                    display={mode === 'hard'}
                    locale={locale}
                    date={date}
                    setDate={setDate}
                />
            </div>
        </ThemeProvider>  
    );
}

export default App;
