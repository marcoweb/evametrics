import { ApplicationContextProvider } from "@/contexts/applicationContext";
import DatasetLoader from "./dataset-loader";
import GoldIndexLoader from "./gold-index-loader";
import ClearButton from "./clear-button";
import ProcessButton from "./process-button";

const MainScreen = () => {
    return (
        <main className="m-8">
            <h1 className="p-4 font-bold text-3xl text-center">Indexing Metrics</h1>
            <ApplicationContextProvider>
                <ClearButton />
                <GoldIndexLoader />
                <hr />
                <DatasetLoader />
                <hr />
                <ProcessButton />
            </ApplicationContextProvider>
        </main>
    );
}

export default MainScreen;