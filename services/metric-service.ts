import { Dataset } from "@/types/dataset";
import { DatasetItem } from "@/types/dataset-item";
import { DatasetStats } from "@/types/dataset-stats";
import { DocumentStats } from "@/types/document-stats";
import { IndexingMetric } from "@/types/indexing-metric";
import { MetricName } from "@/types/metric-name";

function getMetricsPrecision(numberOfCorrectTerms : number, numberOfAssignedTerms : number) : IndexingMetric {
    const result : number = numberOfCorrectTerms / numberOfAssignedTerms;
    return {metric: MetricName.Precision, value: result, percentage: result * 100};
}

function getMetricsRecall(numberOfCorrectTerms : number, numberOfGoldIndexTerms : number) : IndexingMetric {
    const result :number = numberOfCorrectTerms / numberOfGoldIndexTerms;
    return {metric: MetricName.Recall, value: result, percentage: result * 100};
}

function getMetricsFMeasure(precision : number, recall : number) : IndexingMetric {
    let result = 0
    if (recall > 0)
        result = 2 * (precision * recall) / (precision + recall)
    return {metric: MetricName.FMeasure, value: result, percentage: result * 100};
}

function getAllMetricsFromDocument(documentStats: DocumentStats, goldIndexDatatset: Dataset) : Map<string, IndexingMetric> {
    let result = new Map<string, IndexingMetric>();
    result.set(MetricName.Precision, getMetricsPrecision(documentStats.numberOfCorrectTerms, documentStats.numberOfAssignedTerms));
    result.set(MetricName.Recall, getMetricsRecall(documentStats.numberOfCorrectTerms, (goldIndexDatatset.data.get(documentStats.id) as DatasetItem).terms.length));
    result.set(MetricName.FMeasure, getMetricsFMeasure(((result.get(MetricName.Precision) as IndexingMetric).value), (result.get(MetricName.Recall) as IndexingMetric).value))
    return result;
}

function getDocumentStats(datasetItem: DatasetItem, goldIndexDatatset: Dataset) : DocumentStats {
    const result : DocumentStats = {id: datasetItem.id, numberOfAssignedTerms: datasetItem.terms.length, numberOfCorrectTerms: 0, metrics: new Map<string, IndexingMetric>()};
    datasetItem.terms.forEach((term) => {
        if(goldIndexDatatset.data.get(datasetItem.id)?.terms.map((git) => {return git.toLowerCase()}).includes(term.toLowerCase())) {
            result.numberOfCorrectTerms += 1;
        }
    });
    result.metrics = getAllMetricsFromDocument(result, goldIndexDatatset);
    return result;
}

function getStatsFromDataset(dataset: Dataset, goldindex: Dataset) : DatasetStats {
    const result : DatasetStats = {averageOfTerms: 0, numberOfTerms: 0, documentsStats: new Map<string, DocumentStats>(), averageMetrics: new Map<string, IndexingMetric>()};
    let precisionCount = 0;
    let recallCount = 0;
    let fMeasureCount = 0;
    dataset.data.forEach((doc) => {
        result.numberOfTerms += doc.terms.length;
        const documentStats = getDocumentStats(doc, goldindex);
        result.documentsStats.set(doc.id, documentStats);
        precisionCount += (documentStats.metrics.get(MetricName.Precision) as IndexingMetric).value
        recallCount += (documentStats.metrics.get(MetricName.Recall) as IndexingMetric).value
        fMeasureCount += (documentStats.metrics.get(MetricName.FMeasure) as IndexingMetric).value
    });
    result.averageOfTerms = result.numberOfTerms / dataset.data.size;
    result.averageMetrics.set(MetricName.Precision, {metric: MetricName.Precision, value: precisionCount / dataset.data.size, percentage: (precisionCount / dataset.data.size) * 100 });
    result.averageMetrics.set(MetricName.Recall, {metric: MetricName.Recall, value: recallCount / dataset.data.size, percentage: (recallCount / dataset.data.size) * 100 });
    result.averageMetrics.set(MetricName.FMeasure, {metric: MetricName.FMeasure, value: fMeasureCount / dataset.data.size, percentage: (fMeasureCount / dataset.data.size) * 100 });
    return result;
}

export { getStatsFromDataset }