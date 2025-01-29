'use client'

// import { useState } from "react";
import { useApplicationContext } from "@/contexts/applicationContext";
import DatasetLoadControl from "./dataset-load-control";

const DatasetLoader = () => {
    const context = useApplicationContext();
    // const [datasets, setDatasets] = useState(context.datasets)

    // function getDatasetName() : string {
    //     let cont = 1;
    //     let result = '';
    //     while(true) {
    //         cont++;
    //         result = 'DS' + cont;
    //         if(!context.datasets.has(result)) {
    //             break;
    //         }
    //     }
    //     return result;
    // }

    // function addDatasetHandler() {
    //     const datasets = context.datasets;
    //     const name = getDatasetName();
    //     datasets.set(name, {label: name.replace('DS', 'Dataset '), data: new Map<string, DatasetItem>()});
    //     context.setDatasets(datasets);
    //     setDatasets(context.datasets);
    // }

    // function getDataTable(dataset : Dataset) : string[][] {
    //     const result : string[][] = []
    //     dataset.data.forEach((item) => {
    //         result.push([item.id, item.terms.join(', ')])
    //     });
    //     return result;
    // }

    // const dataTable1 : string[][] = getDataTable(context.dataset1)
    // const dataTable2 : string[][] = getDataTable(context.dataset2)

    // function onChangeFileHandler(event : ChangeEvent<HTMLInputElement>) {
    //     if(event.target.files != null) {
    //         const file = event.target.files[0];
    //         const reader = new FileReader();
    //         reader.onload = (e) => {
    //             if(e.target != null && e.target.result != null) {
    //                 const text : string = e.target.result.toString();
    //                 const rows = text.split('\n').map((row) => row.split(';'));
    //                 //const result : string[][] = [];
    //                 const result : Dataset = {label: event.target.id, data: new Map<string, DatasetItem>()}
    //                 rows.slice(1).forEach(element => {
    //                     if (element[1] != undefined)
    //                         result.data.set('D' + (element[0].length < 2 ? '0' : '') + element[0], {id: 'D' + (element[0].length < 2 ? '0' : '') + element[0], terms: element[2].replace(/"/g, "").split(',').map(item => item.trim())})
    //                 });
    //                 if(event.target.id == 'DS1')
    //                     context.setDataset1(result);
    //                 else if (event.target.id == 'DS2')
    //                     context.setDataset2(result);
    //             }
    //         };
    //         reader.readAsText(file);
    //     }
    // }

    // function onNameChangeHandler(event : ChangeEvent<HTMLInputElement>) {
    //     if(event.target.id == 'nameDS1') {
    //         context.setDataset1Name(event.target.value);
    //     } else if(event.target.id == 'nameDS2') {
    //         context.setDataset2Name(event.target.value);
    //     }
    // }

    // const headerTable = {
    //     row1: [
    //         {title: 'ID'},
    //         {title: 'Termos'}
    //     ]
    // }

    return (context.datasets.size > 0) ?
    <div>
        {Array.from(context.datasets, ([name, value]) => ({ name, value })).map((item) => <DatasetLoadControl label={item.name} key={'dsc' + item.name} />)}
        {/* <span className="block text-right text-blue-600 hover:text-blue-400 transition-all cursor-pointer mt-4" onClick={addDatasetHandler}>Adicionar Conjunto de Dados
        </span> */}
    </div> : '';
}

export default DatasetLoader;