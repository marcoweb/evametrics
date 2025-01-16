import { HidableTableHeader, HidableTableHeaderItem } from "./hideableTable";

interface CsvExportControlProps {
    tableHeader : HidableTableHeader,
    tableData : string[][];
}

const CsvExportControl = ({tableHeader, tableData} : CsvExportControlProps) => {
    function getHeader() : string[] {
        let span = 0;
        let cols : string[] = [];
        (tableHeader.row1 as HidableTableHeaderItem[]).forEach((item, index) => {
            console.log(item);
            if(item.colspan == null) {
                cols.push(item.title);
                span += 1;
            }
            for(let cont = 0; cont < (item.colspan as number); cont++) {
                cols.push(item.title + " - " + (tableHeader.row2 as HidableTableHeaderItem[])[cont].title);
            }
        });
        console.log(cols);
        return cols;
    }

    function exportControlHandler () {
        let csvHeader = (tableHeader.row2 == null) ?
            tableHeader.row1.map((headerItem) => headerItem.title).join(", ") + "\n" :
            getHeader().join(", ") + "\n";

        let csvContent = "data:text/csv;charset=utf-8," + csvHeader
        + tableData.map(rowData => rowData.map((value) => value.replace(',', '.')).join(",")).join("\n");

        let encodedUri = encodeURI(csvContent);
        window.open(encodedUri);
    }

    return <div className="text-right">
            <span className="text-blue-600 hover:text-blue-400 transition-all cursor-pointer mt-4" onClick={exportControlHandler}>Exportar dados para CSV
                <svg className="wx-5 h-5 text-gray-800 dark:text-white inline" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
                    <path stroke="currentColor" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"/>
                </svg>
            </span>
        </div>
}

export default CsvExportControl;