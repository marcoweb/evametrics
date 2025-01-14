import { DatasetItem } from "./dataset-item";

export type Dataset = {
    label: string;
    data: Map<string, DatasetItem>;
}