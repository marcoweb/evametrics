'use client'

import { ChangeEvent } from "react";
import HideableTable from "./hideableTable";
import { useApplicationContext } from "@/contexts/applicationContext";
import { Dataset } from "@/types/dataset";
import { DatasetItem } from "@/types/dataset-item";

const DatasetLoader = () => {
    const context = useApplicationContext();

    function getDataTable(dataset : Dataset) : string[][] {
        const result : string[][] = []
        dataset.data.forEach((item) => {
            result.push([item.id, item.terms.join(', ')])
        });
        return result;
    }

    const dataTable1 : string[][] = getDataTable(context.dataset1)
    const dataTable2 : string[][] = getDataTable(context.dataset2)

    function onChangeFileHandler(event : ChangeEvent<HTMLInputElement>) {
        if(event.target.files != null) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                if(e.target != null && e.target.result != null) {
                    const text : string = e.target.result.toString();
                    const rows = text.split('\n').map((row) => row.split(';'));
                    //const result : string[][] = [];
                    const result : Dataset = {label: event.target.id, data: new Map<string, DatasetItem>()}
                    rows.slice(1).forEach(element => {
                        if (element[1] != undefined)
                            result.data.set('D' + (element[0].length < 2 ? '0' : '') + element[0], {id: 'D' + (element[0].length < 2 ? '0' : '') + element[0], terms: element[2].replace(/"/g, "").split(',').map(item => item.trim())})
                    });
                    if(event.target.id == 'DS1')
                        context.setDataset1(result);
                    else if (event.target.id == 'DS2')
                        context.setDataset2(result);
                }
            };
            reader.readAsText(file);
        }
    }

    function onNameChangeHandler(event : ChangeEvent<HTMLInputElement>) {
        if(event.target.id == 'nameDS1') {
            context.setDataset1Name(event.target.value);
        } else if(event.target.id == 'nameDS2') {
            context.setDataset2Name(event.target.value);
        }
    }

    const headerTable = {
        row1: [
            {title: 'ID'},
            {title: 'Termos'}
        ]
    }

    return (
        <div>
            <label htmlFor='nameDS1' className="font-bold text-1xl">Nome do Conjunto 1</label>
            <input value={context.dataset1Name} onChange={onNameChangeHandler} type="text" name='nameDS1' id='nameDS1' className="border-gray-400 rounded-md text-gray-600 focus:border-sky-600 focus:outline focus:outline-0" />
            <label htmlFor="DS1" className="font-bold text-1xl">Conjunto de Dados</label>
            <input type="file" onChange={onChangeFileHandler} name='DS1' id='DS1' className="block w-full text-sm text-slate-500 border-0 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-sky-500 file:text-sm file:font-semibold file:text-white hover:file:hover:bg-sky-600" />
            <HideableTable header={headerTable} data={dataTable1} />
            <hr />
            <label htmlFor='nameDS2' className="font-bold text-1xl">Nome do Conjunto 2</label>
            <input value={context.dataset2Name} onChange={onNameChangeHandler} type="text" name='nameDS2' id='nameDS2' className="border-gray-400 rounded-md text-gray-600 focus:border-sky-600 focus:outline focus:outline-0"  />
            <label htmlFor="DS2" className="font-bold text-1xl">Conjunto de Dados</label>
            <input type="file" onChange={onChangeFileHandler} name='DS2' id='DS2' className="block w-full text-sm text-slate-500 border-0 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-sky-500 file:text-sm file:font-semibold file:text-white hover:file:hover:bg-sky-600" />
            <HideableTable header={headerTable} data={dataTable2} />
        </div>
    );
}

export default DatasetLoader;