import React, { useState } from 'react';
import moment from 'moment';
import LinearProgress from '@mui/material/LinearProgress';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LocaleSelector from './components/LocaleSelector';
import LocalizedDatePicker from './components/LocalizedDatePicker';
import CryptoDropdown from './components/CryptoDropdown';
import ConvertionResult from './components/ConvertionResult';
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

const LinearProgressWithLabel = (props) => {
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

const ProcessConvertion = (coins) => {
    const output = [];

    coins.forEach(coin => {
        const coinBtcValue = coin.market_data?.current_price?.btc;

        const convertions = {};
        coins.forEach(coinTarget => {
            const targetCoinBtcValue = coinTarget.market_data?.current_price?.btc;
            const convertionValue = coinBtcValue / targetCoinBtcValue;
            convertions[coinTarget.id] = convertionValue;
        });

        output.push({
            id: coin.id,
            convertions: convertions
        });
    });

    console.log('ProcessConvertion ouput: ', output);
    return output;
}

function App() {
    const [locale, setLocale] = useState('GB');
    const [date, setDate] = useState(new Date());
    const [crypto, setCrypto] = useState([]);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [convertionResultsHistory, setConvertionResultsHistory] = useState([]);

    const process = async () => {
        console.log('process stcryptoart');
        console.log('crypto(s): ', crypto);

        const cryptoCount = crypto.length;

        if(cryptoCount === 0)
            return;
        
        setProgress(0);
        setLoading(true);

        const data = [];
        for(let i = 0; i < cryptoCount; i++){
            const cryptoId = crypto[i].id;
            const formattedDate = moment(date).format('DD-MM-YYYY');
            const localId = locale.toLowerCase();

            const response = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoId}/history?date=${formattedDate}&localization=${localId}`);
            const json = await response.json();
            data.push(json);

            setProgress(100 / cryptoCount * i);
        }

        const convertionData = ProcessConvertion(data);

        setConvertionResultsHistory(oldArray => [
            {
                time: moment().format('YYYY-MM-DD HH:mm:ss'),
                convertionDate: moment(date).format('YYYY-MM-DD'),
                convertionData: convertionData,
            }, 
            ...oldArray
        ]);
        console.log(convertionResultsHistory);

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
                <div className='ConvertionResultsHistory'>
                    { convertionResultsHistory.map((convertionResult, i) => (
                        <ConvertionResult key={i} convertionResult={convertionResult} locale={locale} />
                    )) }
                </div>
            </div>
        </ThemeProvider>  
    );
}

export default App;
