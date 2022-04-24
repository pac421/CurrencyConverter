import React, { useState } from 'react';
import moment from 'moment';

const locales = {
    GB: "MM/DD/YYYY",
    FR: "DD/MM/YYYY",
    RU: "DD.MM.YYYY",
    DE: "DD.MM.YYYY",
};

const ConvertionResult = ({ convertionResult, locale }) => {
    const convertionData = convertionResult.convertionData;
    const convertionDate = moment(convertionResult.convertionDate).format(locales[locale]);

    const [multiplicator, setMultiplicator] = useState(1);

    if(!convertionResult || !convertionData)
        return;

    return (
        <div className="ConvertionResult">
            <table>
                <thead>
                    <tr key={"header"}>
                        <th key={"multiplicator"} className="date">{convertionDate}</th>
                        <th key={"blank"}></th>
                        { Object.keys(convertionData[0].convertions).map((key) => (
                            <th key={key}>{key}</th>
                        )) }
                    </tr>
                </thead>
                <tbody>
                    { convertionData.map((item) => (
                        <tr key={item.id}>
                            <th>
                                <input
                                    type='number'
                                    value={multiplicator}
                                    onChange={(event) => setMultiplicator(event.target.value)}
                                    className='AmountInput'
                                />
                            </th>
                            <th key={item.id}>{item.id}</th>
                            { Object.values(item.convertions).map((val, key) => (
                                <td key={key}>{val*multiplicator}</td>
                            )) }
                        </tr>
                    )) }
                </tbody>
            </table>
        </div>
    )
}

export default ConvertionResult;