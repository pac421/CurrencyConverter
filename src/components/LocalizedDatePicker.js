import React from 'react';
import frLocale from 'date-fns/locale/fr';
import ruLocale from 'date-fns/locale/ru';
import deLocale from 'date-fns/locale/de';
import enLocale from 'date-fns/locale/en-US';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const locales = {
    GB: {
        fns: enLocale,
        mask: '__/__/____'
    },
    FR: {
        fns: frLocale,
        mask: '__/__/____'
    },
    RU: {
        fns: ruLocale,
        mask: '__.__.____'
    },
    DE: {
        fns: deLocale,
        mask: '__.__.____'
    }
}

const LocalizedDatePicker = ({ date, setDate, locale }) => {

    return (
        <LocalizationProvider 
            dateAdapter={AdapterDateFns} 
            locale={locales[locale].fns}
        >
            <div className='LocalizedDatePicker'>
                <DatePicker
                    mask={locales[locale].mask}
                    value={date}
                    onChange={(newValue) => setDate(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                />
            </div>
        </LocalizationProvider>
    );
}

export default LocalizedDatePicker;