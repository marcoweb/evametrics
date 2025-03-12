'use client'

import { useEffect, useState } from "react";
import { useApplicationContext } from "@/contexts/applicationContext";
import { processGoldIndex } from "@/services/metrics.services";
import { getStatsFromDataset } from "@/services/metric-service";
import { Dataset } from "@/types/dataset";
import { DatasetStats } from "@/types/dataset-stats";

type ErrorMessage = {
    target: string;
    message: string;
}

const ProcessButton = () => {
    const context = useApplicationContext();
    const [errors, setErrors] = useState<ErrorMessage[]>([])

    useEffect(() => {
        setErrors([]);
    }, [context.dataset1Name, context.dataset2Name, context.dataset1, context.dataset2, context.goldIndex])

    // function validateData() : boolean {
    //     const er : ErrorMessage[] = []
    //     if(context.goldIndex.data.size == 0){
    //         er.push({target: "Gold Index", message: "Carregue um conjunto de dados válido."})
    //     }
    //     if(context.dataset1.data.size == 0){
    //         er.push({target: "Conjunto de Dados 1", message: "Carregue um conjunto de dados válido."})
    //     }
    //     if(context.dataset2.data.size == 0){
    //         er.push({target: "Conjunto de Dados 2", message: "Carregue um conjunto de dados válido."})
    //     }
    //     if(context.dataset1Name.length == 0) {
    //         er.push({target: "Nome do Conjunto de Dados 1", message: "É necessário nomear o conjunto de dados 1"})
    //     }
    //     if(context.dataset2Name.length == 0) {
    //         er.push({target: "Nome do Conjunto de Dados 2", message: "É necessário nomear o conjunto de dados 2"})
    //     }
    //     setErrors(er)
    //     return (er.length == 0);
    // }
    function validateData() : boolean {
        const er : ErrorMessage[] = []
        if(context.goldIndex.data.size == 0){
            er.push({target: "Gold Indexing", message: "Please load a valid dataset."})
        }
        const ds1 = (context.datasets.get('DS1') as Dataset)
        if(ds1.label.length == 0) {
            er.push({target: "Nome do Conjunto de Dados 1" , message: "It is necessary to name the dataset"})
        }
        if(ds1.data.size == 0) {
            er.push({target: "Dataset 1 [ " + ds1.label +" ]", message: "Please load a valid dataset."})
        }
        setErrors(er)
        return (er.length == 0);
    }

    function handleProcess() {
        if(validateData()) {
            const goldIndexStats = processGoldIndex(context.goldIndex);
            const datasetStats = new Map<string, DatasetStats>();
            context.datasets.forEach((ds, l) => {
                if(ds.data.size > 0) {
                    datasetStats.set(l, getStatsFromDataset(ds, context.goldIndex));
                }
            });
            context.setGoldIndexStats(goldIndexStats);
            context.setDatasetsStats(datasetStats);
        }
    }


    // function handleProcess() {
    //     if(validateData()) {
    //         const goldIndexStats = processGoldIndex(context.goldIndex);
    //         //const dataset1Stats = processDataset(context.goldIndex, context.dataset1, goldIndexStats)
    //         const dataset1Stats = getStatsFromDataset(context.dataset1, context.goldIndex);
    //         //const dataset2Stats = processDataset(context.goldIndex, context.dataset2, goldIndexStats)
    //         const dataset2Stats = getStatsFromDataset(context.dataset2, context.goldIndex);
    //         context.setGoldIndexStats(goldIndexStats);
    //         context.setDataset1Stats(dataset1Stats);
    //         context.setDataset2Stats(dataset2Stats);
    //     }
    // }

    return(
        <div>
            <button onClick={handleProcess} className="rounded-md bg-green-500 p-2 text-white w-full hover:bg-green-600 transition-all cursor-pointer mt-4">Process the Datasets</button>
            {errors.length > 0 ?
            <div className="border border-red-600 m-2 rounded-md bg-red-100 text-red-600">
                {errors.map((error) => <p key={error.target}><em className="font-bold">{error.target}</em> : {error.message}</p>)}
            </div> : ''}
        </div>
    );
}

export default ProcessButton;