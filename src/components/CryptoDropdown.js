import React, { useState } from 'react';
import Select from 'react-select';

const languages = {
    GB: {
        placeholder: "Search for one or more cryptocurrencies..",
        needMinimumChar: "You must enter at least 3 characters.",
        notFound: "No item matches the search."
    },
    FR: {
        placeholder: "Recherchez une ou plusieurs cryptomonnaies..",
        needMinimumChar: "Vous devez entrer au moins 3 caractères.",
        notFound: "Aucun élément ne correspond à la recherche."
    },
    RU: {
        placeholder: "Найдите одну или несколько криптовалют..",
        needMinimumChar: "Вы должны ввести не менее 3 символов.",
        notFound: "Ни один элемент не соответствует поиску."
    },
    DE: {
        placeholder: "Suche nach einer oder mehreren Kryptowährungen..",
        needMinimumChar: "Sie müssen mindestens 3 Zeichen eingeben.",
        notFound: "Kein Artikel entspricht der Suche."
    }
}

const CryptoDropdown = ({ crypto, setCrypto, locale }) => {
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const searchInputChange = async (searchValue) => {
        setInputValue(searchValue);

        if(searchValue.length >= 3) {
            setIsLoading(true);

            const response = await fetch(`https://api.coingecko.com/api/v3/search?query=${searchValue}`);
            const responseJSON = await response.json();
    
            const coins = responseJSON.coins;
            console.log('coins: ', coins);
    
            setOptions(coins);
            setIsLoading(false);
        }
    };

    const onValueChange = (value, actionMeta) => {
        setCrypto(value);
    }

    return (
        <Select
            isMulti={true}
            value={crypto}
            onChange={onValueChange}
            isLoading={isLoading}
            isSearchable={true}
            options={options}
            className="CryptoDropdown"
            placeholder={languages[locale].placeholder}
            noOptionsMessage={() => { 
                return inputValue.length < 3
                    ? languages[locale].needMinimumChar
                    : languages[locale].notFound
                ;
            }}
            getOptionValue={opt => opt.id}
            getOptionLabel={opt => opt.name}
            inputValue={inputValue}
            onInputChange={searchInputChange}
            clearValue={() => setCrypto([])}
        />
    )
}

export default CryptoDropdown;