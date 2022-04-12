import React, { useState } from 'react';
import LocaleSelector from './components/LocaleSelector';
import LocalizedDatePicker from './components/LocalizedDatePicker';
import CryptoDropdown from './components/CryptoDropdown';
import './App.css';

function App() {
    const [locale, setLocale] = useState('FR');
    const [date, setDate] = useState(new Date());
    const [crypto, setCrypto] = useState([]);

    return (
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
    );
}

export default App;
