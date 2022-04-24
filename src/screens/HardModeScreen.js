import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import CryptoDropdown from '../components/CryptoDropdown';
import ConvertionResult from '../components/ConvertionResult';
import { getLocales } from '../Locales.js';
import '../assets/css/App.css';

const locales = getLocales();

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

const CoinGeckoAdapter = (data) => {
    const coins = [];

    data.forEach(coin => {
        let coinBtcValue = coin.market_data?.current_price?.btc;
        if(!coinBtcValue)
            coinBtcValue = '?';
            
        coins.push({
            id: coin.id,
            coinBtcValue: coinBtcValue
        });
    });

    console.log('CoinGeckoAdapter ouput: ', coins);
    return coins;
}

const ProcessConvertion = (coins) => {
    const output = [];

    coins.forEach(coin => {
        const convertions = {};

        coins.forEach(coinTarget => {

            const convertionValue = coin.coinBtcValue !== '?' || coinTarget.coinBtcValue !== '?'
                ? coin.coinBtcValue / coinTarget.coinBtcValue
                : '?'
            ;
            
            convertions[coinTarget.id] = convertionValue;
        });

        output.push({
            id: coin.id,
            convertions: convertions,
            multiplicator: 1
        });
    });

    console.log('ProcessConvertion ouput: ', output);
    return output;
}

const HardModeScreen = ({ display, locale, date, setDate }) => {
    const [crypto, setCrypto] = useState([]);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [convertionResultsHistory, setConvertionResultsHistory] = useState([]);

    useEffect(() => {
        console.log('convertionResultsHistory: ', convertionResultsHistory);
    }, [convertionResultsHistory]);

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

        const formattedData = CoinGeckoAdapter(data);
        const convertionData = ProcessConvertion(formattedData);

        setConvertionResultsHistory(oldArray => [
            {
                time: moment().format('YYYY-MM-DD HH:mm:ss'),
                convertionDate: moment(date).format('YYYY-MM-DD'),
                convertionData: convertionData,
            }, 
            ...oldArray
        ]);

        setLoading(false);
    }

    return (
        <div className={"HardModeScreen" + (!display ? ' hidden' : '') }>
            <div className="HardModeForm">
                <CryptoDropdown 
                    crypto={crypto}
                    setCrypto={setCrypto}
                    locale={locale}
                />
                <div className="HardModeSubmitContainer">
                    { crypto.length > 0 && !loading &&
                        (
                            <button 
                                className="HardModeSubmitBtn" 
                                onClick={() => process()}
                            >
                                {locales[locale].submitBtnText}
                            </button>
                        )
                    }
                    { loading &&
                        <LinearProgressWithLabel value={progress} />
                    }
                    
                </div>
            </div>
            <div className='HardModeConvertionResultsHistory'>
                { convertionResultsHistory.map((convertionResult, i) => (
                    <ConvertionResult 
                        key={i} 
                        convertionResult={convertionResult} 
                        locale={locale} 
                    />
                )) }
            </div>
        </div>
    )
}

export default HardModeScreen;