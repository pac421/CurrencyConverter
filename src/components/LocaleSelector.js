import React from "react";
import ReactCountryFlag from "react-country-flag";

const flagSize = '25px';

const LocaleSelector = ({ locale, setLocale }) => {

    const LocaleItem = ({ countryCode }) => {

        let className = 'LocaleItem';
        if(countryCode === locale)
          className += ' selected';

        return (
            <button 
                className={className}
                onClick={() => setLocale(countryCode)}
            >
                <ReactCountryFlag
                    countryCode={countryCode}
                    svg={true}
                    style={{
                        width: flagSize,
                        height: flagSize,
                    }}
                    title={countryCode}
                />
            </button>
        )
    }

    return (
        <div className="LocaleSelector">
            <LocaleItem countryCode="GB" />
            <LocaleItem countryCode="FR" />
            <LocaleItem countryCode="RU" />
            <LocaleItem countryCode="DE" />
        </div>
    )
}

export default LocaleSelector;