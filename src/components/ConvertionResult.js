import React from 'react';
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

    if(!convertionResult || !convertionData)
        return;

    return (
        <div className="ConvertionResult">
            <table>
                <thead>
                    <tr key={"header"}>
                        <th className="date" key={"date"}>{convertionDate}</th>
                        { Object.keys(convertionData[0].convertions).map((key) => (
                            <th key={key}>{key}</th>
                        )) }
                    </tr>
                </thead>
                <tbody>
                    { convertionData.map((item) => (
                        <tr key={item.id}>
                            <th key={item.id}>{item.id}</th>
                            { Object.values(item.convertions).map((val, key) => (
                                <td key={key}>{val}</td>
                            )) }
                        </tr>
                    )) }
                </tbody>
            </table>
        </div>
    )
}

export default ConvertionResult;