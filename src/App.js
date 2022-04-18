import React, { useState } from 'react';
import moment from 'moment';
import LinearProgress from '@mui/material/LinearProgress';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LocaleSelector from './components/LocaleSelector';
import LocalizedDatePicker from './components/LocalizedDatePicker';
import CryptoDropdown from './components/CryptoDropdown';
import './assets/css/App.css';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const languages = {
    GB: {
        headtitle: "Currency converter",
        submitBtnText: "Let's go !"
    },
    FR: {
        headtitle: "Convertisseur de devises",
        submitBtnText: "C'est parti !"
    },
    RU: {
        headtitle: "Конвертер валют",
        submitBtnText: "Пойдем !"
    },
    DE: {
        headtitle: "Währungsrechner",
        submitBtnText: "Lass uns gehen !"
    }
}

function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35, fontSize: 20 }}>
                {`${Math.round(props.value)}%`}
            </Box>
        </Box>
    );
}

function App() {
    const [locale, setLocale] = useState('GB');
    const [date, setDate] = useState(new Date());
    const [crypto, setCrypto] = useState([]);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [data, setData] = useState([]);

    const process = async () => {
        console.log('process stcryptoart');
        console.log('crypto(s): ', crypto);

        const cryptoCount = crypto.length;

        if(cryptoCount == 0)
            return;
        
        setData([]);
        setProgress(0);
        setLoading(true);

        for(let i = 0; i < cryptoCount; i++){
            const cryptoId = crypto[i].id;
            const formattedDate = moment(date).format('DD-MM-YYYY');
            const localId = locale.toLowerCase();

            const response = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoId}/history?date=${formattedDate}&localization=${localId}`);
            const json = await response.json();
            data.push(json);
            
            setProgress(100 / cryptoCount * i);
        }
        console.log('data: ', data);

        setLoading(false);
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <div className="App">
                <div className="LocaleContainer">
                    <LocaleSelector
                        locale={locale}
                        setLocale={setLocale}
                    />
                </div>
                <div className="Headtitle">{languages[locale].headtitle}</div>
                <div className="Form">
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
                    <div className="SubmitContainer">
                        { crypto.length > 0 && !loading &&
                            (
                                <button 
                                    className="SubmitBtn" 
                                    onClick={() => process()}
                                >
                                    {languages[locale].submitBtnText}
                                </button>
                            )
                        }
                        { loading &&
                            <LinearProgressWithLabel value={progress} />
                        }
                        
                    </div>
                </div>
            </div>
        </ThemeProvider>  
    );
}

export default App;
