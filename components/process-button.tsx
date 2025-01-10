'use client'

import { useApplicationContext } from "@/contexts/applicationContext";

const ProcessButton = () => {
    const context = useApplicationContext();


    return(
        <div>
            <button className="rounded-md bg-green-500 p-2 text-white w-full hover:bg-green-600 transition-all cursor-pointer mt-4">Processar Conjuntos</button>
        </div>
    );
}

export default ProcessButton;