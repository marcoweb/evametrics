import { Dataset } from "@/types/dataset";
import { DatasetItem } from "@/types/dataset-item";
import { DatasetStats } from "@/types/dataset-stats";
import { DocumentStats } from "@/types/document-stats";
import { GoldIndexStats } from "@/types/gold-index-stats";
import { IndexingMetric } from "@/types/indexing-metric";
import { MetricName } from "@/types/metric-name";


function getMetricsPrecision(numberOfCorrectTerms : number, numberOfAssignedTerms : number) : IndexingMetric {
    const result : number = numberOfCorrectTerms / numberOfAssignedTerms;
    return {metric: MetricName.Precision, value: result, percentage: result * 100};
}

function getMetricsRecall(numberOfAssignedTerms : number, numberOfGoldIndexTerms : number) : IndexingMetric {
    const result :number = numberOfAssignedTerms / numberOfGoldIndexTerms;
    return {metric: MetricName.Recall, value: result, percentage: result * 100};
}

function getMetricsFMeasure(precision : number, recall : number) : IndexingMetric {
    let result = 0
    if (recall > 0)
        result = 2 * (precision * recall) / (precision + recall)
    return {metric: MetricName.FMeasure, value: result, percentage: result * 100};
}

export function processGoldIndex(goldIndexDatatset: Dataset) : GoldIndexStats {
    const result : GoldIndexStats = {averageOfTerms: 0, numberOfTerms: 0};
    goldIndexDatatset.data.forEach((item) => {
        result.numberOfTerms += item.terms.length;
    });
    result.averageOfTerms = result.numberOfTerms / goldIndexDatatset.data.size;
    return result;
}

export function processDataset(goldIndexDatatset : Dataset, dataset : Dataset, goldIndexStats : GoldIndexStats) : DatasetStats {
    const result : DatasetStats = {averageOfTerms: 0, numberOfTerms: 0, documentsStats: new Map<string, DocumentStats>(), averageMetrics: new Map<string, IndexingMetric>()};
    dataset.data.forEach((doc, id) => {
        const docStats : DocumentStats = {id: doc.id, numberOfAssignedTerms: doc.terms.length, numberOfCorrectTerms: 0, metrics: new Map<string, IndexingMetric>()};
        doc.terms.forEach((term) => {
            if(goldIndexDatatset.data.get(id)?.terms.map((git) => {return git.toLowerCase()}).includes(term.toLowerCase())) {
                docStats.numberOfCorrectTerms += 1;
            }
        });
        docStats.metrics.set(MetricName.Precision, getMetricsPrecision(docStats.numberOfCorrectTerms, docStats.numberOfAssignedTerms));
        docStats.metrics.set(MetricName.Recall, getMetricsRecall(docStats.numberOfAssignedTerms, (goldIndexDatatset.data.get(id) as DatasetItem).terms.length))
        docStats.metrics.set(MetricName.FMeasure, getMetricsFMeasure((docStats.metrics.get(MetricName.Precision) as IndexingMetric).value, (docStats.metrics.get(MetricName.Recall) as IndexingMetric).value));
        result.documentsStats.set(docStats.id, docStats);
    });
    Object.keys(MetricName).filter((v) => isNaN(Number(v))).forEach((key, index) => {
        let metricName : MetricName;
        if(key == "Precision")
            metricName = MetricName.Precision;
        else if (key == "Recall")
            metricName = MetricName.Recall;
        else
            metricName = MetricName.FMeasure;
        let cont = 0;
        result.documentsStats.forEach((item) => {
            cont += (item.metrics.get(key)as IndexingMetric).value;
        });
        const average = {metric: metricName, value: cont / result.documentsStats.size, percentage: 0}
        average.percentage = average.value * 100;
        result.averageMetrics.set(key, average);
    })
    return result;
}
