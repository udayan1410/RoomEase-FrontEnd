import React from 'react';
import * as classes from './table.module.css';

const Table = ({ headers, tableData }) => {


    let number = 0;

    return (
        <table className={classes.table}>
            <thead>
                <tr >
                    {headers.map(header => <th className={classes.Header} key={header}>{header}</th>)}
                </tr>
            </thead>
            <tbody>
                {tableData.map(row => {

                    let num = number++;

                    let recordClasses = [classes.tableRecord];
                    if (num % 2 == 0)
                        recordClasses.push(classes.bgColorGray);
                    else
                        recordClasses.push(classes.bgColorWhite);

                    return (
                        <tr key={num} className={classes.tableRow}>
                            <td className={recordClasses.join(" ")}>{number}</td>
                            <td className={recordClasses.join(" ")}>{row.message}</td>
                            <td className={recordClasses.join(" ")}>{row.createdOn}</td>
                        </tr>
                    )
                })}

            </tbody>
        </table>
    )
}

export default Table;


