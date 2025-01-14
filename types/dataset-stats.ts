import { DocumentStats } from "./document-stats";
import { IndexingMetric } from "./indexing-metric";

export type DatasetStats = {
    numberOfTerms: number;
    averageOfTerms: number;
    documentsStats : Map<string, DocumentStats>;
    averageMetrics : Map<string, IndexingMetric>;
}
