import React from 'react';
import { getLocales } from '../Locales.js';

const locales = getLocales();

const ModeSwitcher = ({ mode, setMode, locale }) => {

    return (
        <div className="ModeSwitcher">
            <div 
                className={mode == 'easy' ? 'selected' : ''}
                onClick={() => setMode('easy')}
            >
                {locales[locale].easyMode}
            </div>
            <div 
                className={mode == 'hard' ? 'selected' : ''}
                onClick={() => setMode('hard')}
            >
                {locales[locale].hardMode}
            </div>
        </div>
    )
}

export default ModeSwitcher;