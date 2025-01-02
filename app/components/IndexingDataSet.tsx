export default function IndexingDataSet() {
    return (
        <div className="m-8">
            <label htmlFor="name">Nome do Conjunto</label>
            <input type="text" name="name" id="name" />
            <label htmlFor="dataSetFile">Conjunto de Dados</label>
            <input type="file" name="dataSetFile" id="dataSetFile" />
        </div>
    );
}