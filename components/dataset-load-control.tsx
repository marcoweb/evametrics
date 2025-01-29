import { useApplicationContext } from "@/contexts/applicationContext"
import { Dataset } from "@/types/dataset"
import { DatasetItem } from "@/types/dataset-item";
import { ChangeEvent, useState } from "react";
import HideableTable from "./hideableTable";

interface DatasetLoadControlProps {
    label : string,
}

const DatasetLoadControl = ({label} : DatasetLoadControlProps) => {
    const context = useApplicationContext();
    const [name, setName] = useState((context.datasets.get(label) as Dataset).label)

    function getDataTable(dataset : Dataset) : string[][] {
        const result : string[][] = []
        dataset.data.forEach((item) => {
            result.push([item.id, item.terms.join(', ')])
        });
        return result;
    }

    const [dataTable, setDataTable] = useState<string[][]>(getDataTable((context.datasets.get(label) as Dataset)));

    //const dataTable : string[][] = getDataTable((context.datasets.get(label) as Dataset))

    function onNameChangeHandler (event : ChangeEvent<HTMLInputElement>) {
        const datasets = context.datasets;
        (datasets.get(label) as Dataset).label = event.target.value;
        context.setDatasets(datasets)
        console.log((context.datasets.get(label) as Dataset).label)
        setName((context.datasets.get(label) as Dataset).label)
    }

    function onChangeFileHandler(event : ChangeEvent<HTMLInputElement>) {
        if(event.target.files != null) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                if(e.target != null && e.target.result != null) {
                    const text : string = e.target.result.toString();
                    const rows = text.split('\n').map((row) => row.split(';'));
                    const result = new Map<string, DatasetItem>()
                    rows.slice(1).forEach(element => {
                        if (element[1] != undefined)
                            result.set('D' + (element[0].length < 2 ? '0' : '') + element[0], {id: 'D' + (element[0].length < 2 ? '0' : '') + element[0], terms: element[2].replace(/"/g, "").split(',').map(item => item.trim())})
                    });
                    const datasets = context.datasets;
                    (datasets.get(label) as Dataset).data = result;
                    context.setDatasets(datasets);
                    setDataTable(getDataTable((context.datasets.get(label) as Dataset)));
                }
            };
            reader.readAsText(file);
        }
    }

    const headerTable = {
        row1: [
            {title: 'ID'},
            {title: 'Termos'}
        ]
    }

    return <div key={label}>
        {/* {context.datasets.size > 1 ?
        <div className="text-right">
            <button onClick={removeHandle} className="rounded-md bg-red-500 p-2 text-white hover:bg-red-600 transition-all cursor-pointer mt-4" >Remover Conjunto de Dados [ {name} ]</button>
        </div> : '' } */}
        <label htmlFor={'name' + label} className="font-bold text-1xl">Nome do Conjunto</label>
        <input value={name} onChange={onNameChangeHandler} type="text" name={'name' + label} id={'name' + label} className="border-gray-400 rounded-md text-gray-600 focus:border-sky-600 focus:outline focus:outline-0" />
        <label htmlFor={label} className="font-bold text-1xl">Conjunto de Dados</label>
        <input type="file" onChange={onChangeFileHandler} name={label} id={label} className="block w-full text-sm text-slate-500 border-0 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-sky-500 file:text-sm file:font-semibold file:text-white hover:file:hover:bg-sky-600" />
        {<HideableTable header={headerTable} data={dataTable} />}
        <hr />
    </div>
}

export default DatasetLoadControl;