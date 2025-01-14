'use client'

import { useApplicationContext } from "@/contexts/applicationContext";
import HideableTable from "./hideableTable";
import { useEffect, useState } from "react";
import { MetricName } from "@/types/metric-name";
import { IndexingMetric } from "@/types/indexing-metric";
import { DocumentStats } from "@/types/document-stats";

const ResultTable = () => {
    const context = useApplicationContext();

    const averageHeaderTable = {
        row1: [
            {title: 'Conjuntos'},
            {title: 'Termos'},
            {title: 'Precision (%)'},
            {title: 'Recall (%)'},
            {title: 'FMeasure (%)'}
        ]
    }

    const datasetsHeaderTable = {
        row1: [
            {title: 'Id', rowspan: 2},
            {title: context.dataset1Name, colspan: 3},
            {title: context.dataset2Name, colspan: 3}
        ],
        row2: [
            {title: 'Precision (%)'},
            {title: 'Recall (%)'},
            {title: 'FMeasure (%)'},
            {title: 'Precision (%)'},
            {title: 'Recall (%)'},
            {title: 'FMeasure (%)'}
        ]
    }

    const [averageTableData, setAverageTableData] = useState<string[][]>([]);
    const [datasetsTableData, setDatasetsTableData] = useState<string[][]>([]);

    useEffect(() => {
        if(context.dataset1Stats.documentsStats.size > 0) {
            setAverageTableData([
                ['Gold Index', context.goldIndexStats.averageOfTerms.toString(), '-', '-', '-'],
                [context.dataset1Name, context.dataset1Stats.averageOfTerms.toString(),  (context.dataset1Stats.averageMetrics.get(MetricName.Precision) as IndexingMetric).percentage.toLocaleString('pt-br', {maximumFractionDigits: 2}), (context.dataset1Stats.averageMetrics.get(MetricName.Recall) as IndexingMetric).percentage.toLocaleString('pt-br', {maximumFractionDigits: 2}), (context.dataset1Stats.averageMetrics.get(MetricName.FMeasure) as IndexingMetric).percentage.toLocaleString('pt-br', {maximumFractionDigits: 2})],
                [context.dataset2Name, context.dataset2Stats.averageOfTerms.toString(),  (context.dataset2Stats.averageMetrics.get(MetricName.Precision) as IndexingMetric).percentage.toLocaleString('pt-br', {maximumFractionDigits: 2}), (context.dataset2Stats.averageMetrics.get(MetricName.Recall) as IndexingMetric).percentage.toLocaleString('pt-br', {maximumFractionDigits: 2}), (context.dataset2Stats.averageMetrics.get(MetricName.FMeasure) as IndexingMetric).percentage.toLocaleString('pt-br', {maximumFractionDigits: 2})]
            ]);
            const tableData : string[][] = []
            context.goldIndex.data.forEach((doc) => {
                const row : string[] = [
                    doc.id,
                    ((context.dataset1Stats.documentsStats.get(doc.id) as DocumentStats).metrics.get(MetricName.Precision) as IndexingMetric).percentage.toLocaleString('pt-br', { maximumFractionDigits: 2 }),
                    ((context.dataset1Stats.documentsStats.get(doc.id) as DocumentStats).metrics.get(MetricName.Recall) as IndexingMetric).percentage.toLocaleString('pt-br', { maximumFractionDigits: 2 }),
                    ((context.dataset1Stats.documentsStats.get(doc.id) as DocumentStats).metrics.get(MetricName.FMeasure) as IndexingMetric).percentage.toLocaleString('pt-br', { maximumFractionDigits: 2 }),
                    ((context.dataset2Stats.documentsStats.get(doc.id) as DocumentStats).metrics.get(MetricName.Precision) as IndexingMetric).percentage.toLocaleString('pt-br', { maximumFractionDigits: 2 }),
                    ((context.dataset2Stats.documentsStats.get(doc.id) as DocumentStats).metrics.get(MetricName.Recall) as IndexingMetric).percentage.toLocaleString('pt-br', { maximumFractionDigits: 2 }),
                    ((context.dataset2Stats.documentsStats.get(doc.id) as DocumentStats).metrics.get(MetricName.FMeasure) as IndexingMetric).percentage.toLocaleString('pt-br', { maximumFractionDigits: 2 })
                ];
                tableData.push(row);
            });
            setDatasetsTableData(tableData);
        } else {
            setAverageTableData([]);
            setDatasetsTableData([]);
        }
    }, [context.dataset1Stats])
    
    return (
        <>
        {context.goldIndexStats.numberOfTerms > 0 ?
        <div>
            <h1 className="p-4 font-bold text-2xl text-center">Resultados</h1>
            <h1 className="p-4 font-bold text-1xl text-center">Médias</h1>
            <HideableTable header={averageHeaderTable} data={averageTableData} startHidden={false} labelWhenHidden="Tabela de Médias" />

            <h1 className="p-4 font-bold text-1xl text-center">Conjuntos de Dados</h1>
            <HideableTable header={datasetsHeaderTable} data={datasetsTableData} startHidden={false} />
        </div> : ''}
        </>
    );
}

export default ResultTable;