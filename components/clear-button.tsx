'use client'
// import { useApplicationContext } from "@/contexts/applicationContext";
// import { DatasetItem } from "@/types/dataset-item";
// import { DocumentStats } from "@/types/document-stats";
// import { IndexingMetric } from "@/types/indexing-metric";

const ClearButton = () => {
    // const context = useApplicationContext();    

    function clearHandle() {
        // context.setGoldIndex({label: 'GoldIndex', data: new Map<string, DatasetItem>()});
        // context.setDataset1({label: 'Dataset1', data: new Map<string, DatasetItem>()});
        // context.setDataset2({label: 'Dataset2', data: new Map<string, DatasetItem>()});
        // context.setGoldIndexStats({averageOfTerms: 0, numberOfTerms: 0});
        // context.setDataset1Stats({averageOfTerms: 0, numberOfTerms: 0, documentsStats: new Map<string, DocumentStats>(), averageMetrics: new Map<string, IndexingMetric>()});
        // context.setDataset2Stats({averageOfTerms: 0, numberOfTerms: 0, documentsStats: new Map<string, DocumentStats>(), averageMetrics: new Map<string, IndexingMetric>()});
        // context.setDataset1Name('');
        // context.setDataset2Name('');
        window.location.reload();
    }

    return (
        <div className="text-right">
            <button onClick={clearHandle} className="rounded-md bg-red-500 p-2 text-white hover:bg-red-600 transition-all cursor-pointer mt-4" >Limpar Dados</button>
        </div>
    );
}

export default ClearButton;