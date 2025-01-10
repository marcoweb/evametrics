export enum MetricName {
    Precision = "Precision",
    Recall = "Recall",
    FMeasure = "F-Measure"
}

export interface IIndexingMetric {
    metric: MetricName
    value: number,
    percentage: number
}

function getMetricsPrecision(numberOfCorrectTerms : number, numberOfAssignedTerms : number) : IIndexingMetric {
    const result = numberOfCorrectTerms / numberOfAssignedTerms;
    return {metric: MetricName.Precision, value: result, percentage: result * 100};
}

function getMetricsRecall(numberOfAssignedTerms : number, numberOfGoldIndexTerms : number) : IIndexingMetric {
    const result = numberOfAssignedTerms / numberOfGoldIndexTerms;
    return {metric: MetricName.Recall, value: result, percentage: result * 100};
}

function getMetricsFMeasure(precision : number, recall : number) : IIndexingMetric {
    let result = 0
    if (recall > 0)
        result = 2 * (precision * recall) / (precision + recall)
    return {metric: MetricName.FMeasure, value: result, percentage: result * 100};
}

export function getMetrics(datasetData) {
    const result = []
    datasetData.forEach((element) => {
        const precision = getMetricsPrecision(element.numberOfCorrectTerms, element.numberOfAssignedTerms);
        const recall = getMetricsRecall(element.numberOfCorrectTerms, element.numberOfGoldIndexTerms);
        const fMeasure = getMetricsFMeasure(precision.value, recall.value);
        const doc = {
            id: element.id,
            precision: precision,
            recall: recall,
            fMeasure: fMeasure
        }
        result.push(doc);
    });
    return result;
}

export function processDataSet(goldIndex, dataset) {
    const result = []
    dataset.forEach(element => {
        const doc = {
            id: element.id,
            numberOfCorrectTerms: 0,
            numberOfAssignedTerms: element.terms.length,
            numberOfGoldIndexTerms: 0
        }
        const gi = goldIndex.find((obj) => obj.id == element.id);
        doc.numberOfGoldIndexTerms = gi.terms.length
        element.terms.forEach((item) => {
            if(gi.terms.map((git) => {return git.toLowerCase()}).includes(item.toLowerCase()))
                doc.numberOfCorrectTerms += 1;
        });
        result.push(doc)
    });
    return result;
}
