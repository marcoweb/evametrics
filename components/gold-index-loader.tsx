'use client'

import { ChangeEvent } from "react";
import HideableTable from "./hideableTable";
import { Dataset } from "@/types/dataset";
import { useApplicationContext } from "@/contexts/applicationContext";
import { DatasetItem } from "@/types/dataset-item";

const GoldIndexLoader = () => {
    const context = useApplicationContext();

    function getDataTable(dataset : Dataset) : string[][] {
        const result : string[][] = []
        dataset.data.forEach((item) => {
            result.push([item.id, item.terms.join(', ')])
        });
        return result;
    }

    const dataTable : string[][] = getDataTable(context.goldIndex)

    function onChangeFileHandler(event : ChangeEvent<HTMLInputElement>) {
        if(event.target.files != null) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                if(e.target != null && e.target.result != null) {
                    const text : string = e.target.result.toString();
                    const rows = text.split('\n').map((row) => row.split(':'));
                    const result : Dataset = {label: event.target.id, data: new Map<string, DatasetItem>()}
                    rows.forEach(element => {
                        if (element[1] != undefined)
                            result.data.set(element[0].trim(), {id: element[0].trim(), terms: element[1].replace(/"/g, "").split(',').map(item => item.trim())})
                    });
                    context.setGoldIndex(result);
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

    return (
        <div>
            <label htmlFor="GI" className="font-bold text-1xl">Gold Index</label>
            <input type="file" onChange={onChangeFileHandler} name='GI' id='GI' className="block w-full text-sm text-slate-500 border-0 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-sky-500 file:text-sm file:font-semibold file:text-white hover:file:hover:bg-sky-600" />
            <HideableTable header={headerTable} data={dataTable} />
            <hr />
        </div>
    );
}

export default GoldIndexLoader;