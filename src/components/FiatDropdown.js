import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { getLocales } from '../Locales.js';

const locales = getLocales();

const PRIMARY_COLOR = '#24ab05';
const BG_COLOR = '#010502';

const FiatDropdown = ({ fiat, setFiat, locale }) => {
    const [availableFiat, setAvailableFiat] = useState({});
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async() => {
            const response = await fetch('https://api.exchangerate.host/symbols');
            const responseJSON = await response.json();

            const availableFiatList = responseJSON.symbols;
            console.log('availableFiat:' , availableFiatList);
        
            setAvailableFiat(availableFiatList);
        }
        fetchData();
    }, []);

    const searchInputChange = async (searchValue) => {
        setInputValue(searchValue);

        if(searchValue.length >= 3) {
            setIsLoading(true);

            const coins = [];

            Object.keys(availableFiat).map((key) => {

                const formattedDescription = availableFiat[key].description.toLowerCase();
                const formattedCode = key.toLowerCase();
                const formattedSearchValue = searchValue.toLowerCase();

                if(formattedDescription.includes(formattedSearchValue) 
                || formattedCode.includes(formattedSearchValue)) 
                    coins.push(availableFiat[key]);
            })

            console.log('coins: ', coins);
    
            setOptions(coins);
            setIsLoading(false);
        }
    };

    const onValueChange = (value, actionMeta) => {
        setFiat(value);
    }

    return (
        <Select
            className='react-select-container'
            classNamePrefix='react-select'
            isMulti={true}
            value={fiat}
            onChange={onValueChange}
            isLoading={isLoading}
            isSearchable={true}
            options={options}
            placeholder={locales[locale].fiatDropdown.placeholder}
            noOptionsMessage={() => { 
                return inputValue.length < 3
                    ? locales[locale].fiatDropdown.needMinimumChar
                    : locales[locale].fiatDropdown.notFound
                ;
            }}
            getOptionValue={opt => opt.code}
            getOptionLabel={opt => opt.description}
            inputValue={inputValue}
            onInputChange={searchInputChange}
            clearValue={() => setFiat([])}
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

export default FiatDropdown;