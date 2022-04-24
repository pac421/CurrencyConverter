import React, { useState } from 'react';
import FiatDropdown from '../components/FiatDropdown';
import CryptoDropdown from '../components/CryptoDropdown';
import { getLocales } from '../Locales.js';
import '../assets/css/App.css';

const locales = getLocales();

const EasyModeScreen = ({ display, locale, date, setDate }) => {
    const [fiat, setFiat] = useState([]);
    const [crypto, setCrypto] = useState([]);

    return (
        <div className={"EasyModeScreen" + (!display ? ' hidden' : '') }>
            <div className="EasyModeForm">
                <div>
                    <FiatDropdown 
                        fiat={fiat}
                        setFiat={setFiat}
                        locale={locale}
                    />
                </div>
                <div>
                    <CryptoDropdown 
                        crypto={crypto}
                        setCrypto={setCrypto}
                        locale={locale}
                    />
                </div>
            </div>
        </div>
    )
}

export default EasyModeScreen;

