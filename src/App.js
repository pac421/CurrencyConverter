import React, { useState } from 'react';
import { ThemeProvider, useTheme, createTheme } from '@mui/material/styles';
import LocaleSelector from './components/LocaleSelector';
import LocalizedDatePicker from './components/LocalizedDatePicker';
import CryptoDropdown from './components/CryptoDropdown';
import './assets/css/App.css';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App() {
    const [locale, setLocale] = useState('FR');
    const [date, setDate] = useState(new Date());
    const [crypto, setCrypto] = useState([]);

    return (
        <ThemeProvider theme={darkTheme}>
            <div className="App">
                <LocaleSelector
                    locale={locale}
                    setLocale={setLocale}
                />
                <LocalizedDatePicker 
                    date={date} 
                    setDate={setDate} 
                    locale={locale} 
                />
                <CryptoDropdown 
                    crypto={crypto}
                    setCrypto={setCrypto}
                    locale={locale}
                />
            </div>
        </ThemeProvider>  
    );
}

export default App;
