import { IndexingMetric } from "./indexing-metric";

export type DocumentStats = {
    id: string;
    numberOfCorrectTerms: number;
    numberOfAssignedTerms : number;
    metrics : Map<string, IndexingMetric>;
}