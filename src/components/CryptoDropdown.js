import React, { useState } from 'react';
import Select from 'react-select';

const PRIMARY_COLOR = '#24ab05';
const BG_COLOR = '#010502';

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
            className='react-select-container'
            classNamePrefix='react-select'
            isMulti={true}
            value={crypto}
            onChange={onValueChange}
            isLoading={isLoading}
            isSearchable={true}
            options={options}
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
            theme={(theme) => ({
                ...theme,
                borderRadius: 0,
                colors: {
                  ...theme.colors,
                  primary: PRIMARY_COLOR, //on focus select border
                  primary75: '#fff',
                  primary50: PRIMARY_COLOR, //on select item bg
                  primary25: BG_COLOR, //on hover item bg
                  danger: '#fff', //on hover delete item color
                  dangerLight: BG_COLOR, //delete item bg
                  neutral0: BG_COLOR, //select bg
                  neutral10: BG_COLOR, //item bg
                  neutral15: '#fff',
                  neutral20: PRIMARY_COLOR, //select border
                  neutral30: PRIMARY_COLOR, //on hover select border
                  neutral40: PRIMARY_COLOR, //no results text
                  neutral50: PRIMARY_COLOR, //placeholder
                  neutral60: PRIMARY_COLOR, //delete all & open icon
                  neutral70: '#fff',
                  neutral80: PRIMARY_COLOR, //input search text color
                  neutral90: '#fff',
                },
              })}
        />
    )
}

export default CryptoDropdown;