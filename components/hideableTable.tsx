'use client'

import { useState } from "react";
import CsvExportControl from "./csv-export-control";

export type HidableTableHeaderItem = {
    title : string;
    colspan? : number;
    rowspan? : number;
    classNames? : string[];
}

export type HidableTableHeader = {
    row1 : HidableTableHeaderItem[];
    row2? : HidableTableHeaderItem[];
}

interface HidableTableProps {
    header : HidableTableHeader;
    data : string[][];
    startHidden? : boolean;
    labelWhenHidden? : string;
    canBeExported? : boolean;
}

const HideableTable = ({header, data, startHidden = true, labelWhenHidden = '', canBeExported = false} : HidableTableProps) => {
    const [isHidden, setIsHidden] = useState(startHidden);

    function visibilityToggler() {
        setIsHidden(!isHidden);
    }

    return (
        <div>
            {isHidden ?
            <p>
                {data.length > 0 ? <button onClick={visibilityToggler} className="rounded-md bg-gray-400 p-2 text-white w-full hover:bg-gray-500 transition-all cursor-pointer mt-4">{labelWhenHidden} {labelWhenHidden.length > 0 ? ':' : ''} <span className="text-center italic text-gray-100">Click to View {data.length} Record{data.length > 1 ? 's' : ''}</span></button> : <span>No Records</span>}
            </p> :
            <>
            <span className="text-center block italic text-gray-500">Click Table to Hide</span>
            {canBeExported ?
            <CsvExportControl tableHeader={header} tableData={data} />
            : ''}
            <table onClick={visibilityToggler} className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead>
                    <tr>
                        {header.row1.map((item, key) => (
                            <th rowSpan={item.rowspan || 1} colSpan={item.colspan || 1} key={'h'+key}>{item.title}</th>
                        ))}
                    </tr>
                    {header.row2 != undefined ? (
                    <tr>
                        {header.row2.map((item, key) => (
                            <th rowSpan={item.rowspan || 1} colSpan={item.colspan || 1} key={'h'+key}>{item.title}</th>
                        ))}
                    </tr>
                    ) : ''}
                </thead>
                <tbody>
                    {data.map((row, rk) => (
                        <tr key={rk}>
                            {row.map((value, rc) => (
                                <td key={rk+'_'+rc+value}>{value}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            </>
            }
        </div>
    );
}

export default HideableTable;