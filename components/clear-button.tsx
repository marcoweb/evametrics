'use client'
import { DatasetItem, useApplicationContext } from "@/contexts/applicationContext";

const ClearButton = () => {
    const context = useApplicationContext();

    function clearHandle() {
        context.setGoldIndex({label: 'GoldIndex', data: new Map<string, DatasetItem>()});
        context.setDataset1({label: 'Dataset1', data: new Map<string, DatasetItem>()});
        context.setDataset2({label: 'Dataset2', data: new Map<string, DatasetItem>()});
    }

    return (
        <div className="text-right">
            <button onClick={clearHandle} className="rounded-md bg-red-500 p-2 text-white hover:bg-red-600 transition-all cursor-pointer mt-4" >Limpar Dados</button>
        </div>
    );
}

export default ClearButton;