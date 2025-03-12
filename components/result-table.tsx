'use client'

import { useApplicationContext } from "@/contexts/applicationContext";
import HideableTable, { HidableTableHeader, HidableTableHeaderItem } from "./hideableTable";
import { useEffect, useState } from "react";
import { MetricName } from "@/types/metric-name";
import { IndexingMetric } from "@/types/indexing-metric";
import { DocumentStats } from "@/types/document-stats";
import { Dataset } from "@/types/dataset";

const ResultTable = () => {
    const context = useApplicationContext();

    const averageHeaderTable = {
        row1: [
            {title: 'Datasets'},
            {title: 'Terms'},
            {title: 'Precision (%)'},
            {title: 'Recall (%)'},
            {title: 'FMeasure (%)'}
        ]
    }

    function getDatasetsHeaderTable() {
        const result : HidableTableHeader = {
            row1: [
                {title: 'Id', rowspan: 2}
            ],
            row2: []
        }
        context.datasets.forEach((ds) => {
            if(ds.data.size > 0) {
                result.row1.push({title: ds.label, colspan: 3});
                (result.row2 as HidableTableHeaderItem[]).push({title: 'Precision (%)'});
                (result.row2 as HidableTableHeaderItem[]).push({title: 'Recall (%)'});
                (result.row2 as HidableTableHeaderItem[]).push({title: 'FMeasure (%)'});
            }
        });

        return result;
    }

    const [datasetsHeaderTable, setDatasetsHeaderTable] = useState(getDatasetsHeaderTable());

    const [averageTableData, setAverageTableData] = useState<string[][]>([]);
    const [datasetsTableData, setDatasetsTableData] = useState<string[][]>([]);

    useEffect(() => {
        if(context.datasetsStats.size > 0) {
            const averageTableData : string[][] = [['Gold Indexing', context.goldIndexStats.averageOfTerms.toString(), '-', '-', '-']]
            context.datasetsStats.forEach((dsStats,  l) => {
                averageTableData.push([(context.datasets.get(l) as Dataset).label, dsStats.averageOfTerms.toString(),  (dsStats.averageMetrics.get(MetricName.Precision) as IndexingMetric).percentage.toLocaleString('pt-br', {maximumFractionDigits: 2}), (dsStats.averageMetrics.get(MetricName.Recall) as IndexingMetric).percentage.toLocaleString('pt-br', {maximumFractionDigits: 2}), (dsStats.averageMetrics.get(MetricName.FMeasure) as IndexingMetric).percentage.toLocaleString('pt-br', {maximumFractionDigits: 2})])
            });

            const tableData : string[][] = [];
            context.goldIndex.data.forEach((doc) => {
                const row : string[] = [doc.id];
                context.datasetsStats.forEach((dsStats) => {
                    row.push(((dsStats.documentsStats.get(doc.id) as DocumentStats).metrics.get(MetricName.Precision) as IndexingMetric).percentage.toLocaleString('pt-br', { maximumFractionDigits: 2 }));
                    row.push(((dsStats.documentsStats.get(doc.id) as DocumentStats).metrics.get(MetricName.Recall) as IndexingMetric).percentage.toLocaleString('pt-br', { maximumFractionDigits: 2 }));
                    row.push(((dsStats.documentsStats.get(doc.id) as DocumentStats).metrics.get(MetricName.FMeasure) as IndexingMetric).percentage.toLocaleString('pt-br', { maximumFractionDigits: 2 }));
                });
                tableData.push(row);
            });

            setAverageTableData(averageTableData);
            setDatasetsTableData(tableData);
            setDatasetsHeaderTable(getDatasetsHeaderTable());
        }
        // if(context.dataset1Stats.documentsStats.size > 0) {
        //     setAverageTableData([
        //         ['Gold Index', context.goldIndexStats.averageOfTerms.toString(), '-', '-', '-'],
        //         [context.dataset1Name, context.dataset1Stats.averageOfTerms.toString(),  (context.dataset1Stats.averageMetrics.get(MetricName.Precision) as IndexingMetric).percentage.toLocaleString('pt-br', {maximumFractionDigits: 2}), (context.dataset1Stats.averageMetrics.get(MetricName.Recall) as IndexingMetric).percentage.toLocaleString('pt-br', {maximumFractionDigits: 2}), (context.dataset1Stats.averageMetrics.get(MetricName.FMeasure) as IndexingMetric).percentage.toLocaleString('pt-br', {maximumFractionDigits: 2})],
        //         [context.dataset2Name, context.dataset2Stats.averageOfTerms.toString(),  (context.dataset2Stats.averageMetrics.get(MetricName.Precision) as IndexingMetric).percentage.toLocaleString('pt-br', {maximumFractionDigits: 2}), (context.dataset2Stats.averageMetrics.get(MetricName.Recall) as IndexingMetric).percentage.toLocaleString('pt-br', {maximumFractionDigits: 2}), (context.dataset2Stats.averageMetrics.get(MetricName.FMeasure) as IndexingMetric).percentage.toLocaleString('pt-br', {maximumFractionDigits: 2})]
        //     ]);
        //     const tableData : string[][] = []
        //     context.goldIndex.data.forEach((doc) => {
        //         const row : string[] = [
        //             doc.id,
        //             ((context.dataset1Stats.documentsStats.get(doc.id) as DocumentStats).metrics.get(MetricName.Precision) as IndexingMetric).percentage.toLocaleString('pt-br', { maximumFractionDigits: 2 }),
        //             ((context.dataset1Stats.documentsStats.get(doc.id) as DocumentStats).metrics.get(MetricName.Recall) as IndexingMetric).percentage.toLocaleString('pt-br', { maximumFractionDigits: 2 }),
        //             ((context.dataset1Stats.documentsStats.get(doc.id) as DocumentStats).metrics.get(MetricName.FMeasure) as IndexingMetric).percentage.toLocaleString('pt-br', { maximumFractionDigits: 2 }),
        //             ((context.dataset2Stats.documentsStats.get(doc.id) as DocumentStats).metrics.get(MetricName.Precision) as IndexingMetric).percentage.toLocaleString('pt-br', { maximumFractionDigits: 2 }),
        //             ((context.dataset2Stats.documentsStats.get(doc.id) as DocumentStats).metrics.get(MetricName.Recall) as IndexingMetric).percentage.toLocaleString('pt-br', { maximumFractionDigits: 2 }),
        //             ((context.dataset2Stats.documentsStats.get(doc.id) as DocumentStats).metrics.get(MetricName.FMeasure) as IndexingMetric).percentage.toLocaleString('pt-br', { maximumFractionDigits: 2 })
        //         ];
        //         tableData.push(row);
        //     });
        //     setDatasetsTableData(tableData);
        // } else {
        //     setAverageTableData([]);
        //     setDatasetsTableData([]);
        // }
    }, [context.datasetsStats])
    
    return (
        <>
        {context.goldIndexStats.numberOfTerms > 0 ?
        <div>
            <h1 className="p-4 font-bold text-2xl text-center">Results</h1>
            <h1 className="p-4 font-bold text-1xl text-center">Averages</h1>
            <HideableTable canBeExported={true} header={averageHeaderTable} data={averageTableData} startHidden={false} labelWhenHidden="Average Table" />

            <h1 className="p-4 font-bold text-1xl text-center">Datasets</h1>
            <HideableTable canBeExported={true} header={datasetsHeaderTable} data={datasetsTableData} startHidden={false} />
        </div> : ''}
        </>
    );
}

export default ResultTable;