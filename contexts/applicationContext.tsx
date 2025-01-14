'use client'

import { Dataset } from "@/types/dataset";
import { DatasetItem } from "@/types/dataset-item";
import { DatasetStats } from "@/types/dataset-stats";
import { DocumentStats } from "@/types/document-stats";
import { GoldIndexStats } from "@/types/gold-index-stats";
import { IndexingMetric } from "@/types/indexing-metric";
import { createContext, ReactNode, useContext, useState } from "react";

// export type DatasetItem = {
//     id: string;
//     terms: string[];
// }

// export type Dataset = {
//     label: string;
//     data: Map<string, DatasetItem>;
// }

interface ApplicationContextType {
    goldIndex : Dataset;
    setGoldIndex : React.Dispatch<React.SetStateAction<Dataset>>;
    dataset1 : Dataset;
    setDataset1 : React.Dispatch<React.SetStateAction<Dataset>>;
    dataset2 : Dataset;
    setDataset2 : React.Dispatch<React.SetStateAction<Dataset>>;
    dataset1Name : string;
    setDataset1Name : React.Dispatch<React.SetStateAction<string>>;
    dataset2Name : string;
    setDataset2Name : React.Dispatch<React.SetStateAction<string>>;

    goldIndexStats: GoldIndexStats;
    setGoldIndexStats : React.Dispatch<React.SetStateAction<GoldIndexStats>>;
    dataset1Stats: DatasetStats;
    setDataset1Stats : React.Dispatch<React.SetStateAction<DatasetStats>>;
    dataset2Stats: DatasetStats;
    setDataset2Stats : React.Dispatch<React.SetStateAction<DatasetStats>>;
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

interface ApplicationContextProviderProps {
    children : ReactNode;
}

const ApplicationContextProvider = ({ children } : ApplicationContextProviderProps) => {
    const [goldIndex, setGoldIndex] = useState<Dataset>({label: 'GoldIndex', data: new Map<string, DatasetItem>()});
    const [dataset1, setDataset1] = useState<Dataset>({label: 'Dataset1', data: new Map<string, DatasetItem>()});
    const [dataset2, setDataset2] = useState<Dataset>({label: 'Dataset2', data: new Map<string, DatasetItem>()});
    const [dataset1Name, setDataset1Name] = useState<string>('');
    const [dataset2Name, setDataset2Name] = useState<string>('');

    const [goldIndexStats, setGoldIndexStats] = useState<GoldIndexStats>({averageOfTerms: 0, numberOfTerms: 0});
    const [dataset1Stats, setDataset1Stats] = useState<DatasetStats>({averageOfTerms: 0, numberOfTerms: 0, documentsStats: new Map<string, DocumentStats>(), averageMetrics: new Map<string, IndexingMetric>()})
    const [dataset2Stats, setDataset2Stats] = useState<DatasetStats>({averageOfTerms: 0, numberOfTerms: 0, documentsStats: new Map<string, DocumentStats>(), averageMetrics: new Map<string, IndexingMetric>()})

    return (
        <ApplicationContext.Provider value={{goldIndex, setGoldIndex, dataset1, setDataset1, dataset2, setDataset2, goldIndexStats, setGoldIndexStats, dataset1Stats, setDataset1Stats, dataset2Stats, setDataset2Stats, dataset1Name, setDataset1Name, dataset2Name, setDataset2Name}}>
            {children}
        </ApplicationContext.Provider>
    )
}

const useApplicationContext = () : ApplicationContextType => {
    const context = useContext(ApplicationContext);
    if(!context) {
        throw new Error('useApplicationContext deve ser utilizado dentro de um ApplicationContextProvider');
    }
    return context;
}

export { ApplicationContext, ApplicationContextProvider, useApplicationContext };