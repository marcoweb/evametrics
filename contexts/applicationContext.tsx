'use client'
import { createContext, ReactNode, useContext, useState } from "react";

export type DatasetItem = {
    id: string;
    terms: string[];
}

export type Dataset = {
    label: string;
    data: Map<string, DatasetItem>;
}

interface ApplicationContextType {
    goldIndex : Dataset;
    setGoldIndex : React.Dispatch<React.SetStateAction<Dataset>>;
    dataset1 : Dataset;
    setDataset1 : React.Dispatch<React.SetStateAction<Dataset>>;
    dataset2 : Dataset;
    setDataset2 : React.Dispatch<React.SetStateAction<Dataset>>;
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

interface ApplicationContextProviderProps {
    children : ReactNode;
}

const ApplicationContextProvider = ({ children } : ApplicationContextProviderProps) => {
    const [goldIndex, setGoldIndex] = useState<Dataset>({label: 'GoldIndex', data: new Map<string, DatasetItem>()});
    const [dataset1, setDataset1] = useState<Dataset>({label: 'Dataset1', data: new Map<string, DatasetItem>()});
    const [dataset2, setDataset2] = useState<Dataset>({label: 'Dataset2', data: new Map<string, DatasetItem>()});

    return (
        <ApplicationContext.Provider value={{goldIndex, setGoldIndex, dataset1, setDataset1, dataset2, setDataset2}}>
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