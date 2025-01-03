"use client";

import { useState } from 'react';
import { getMetrics, processDataSet } from './services/metrics.services';

export default function Home() {
  const [goldIndex, setGoldIndex] = useState([])

  const [ds1, setDs1] = useState([])
  const [ds1Name, setDs1Name] = useState('')

  const [ds2, setDs2] = useState([])
  const [ds2Name, setDs2Name] = useState('')

  const [resultProcess, setResultProcess] = useState([])

  const handleDataSetUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const rows = text.split('\n').map((row) => row.split(':'));
      const result = [];
      rows.forEach(element => {
        if (element[1] != undefined)
          result.push({ id: element[0], terms: element[1].split(',').map(item => item.trim()) })
      });
      console.log(event.target.id)
      if (event.target.id == 'dataSetFile1')
        setDs1(result);
      else
        setDs2(result);
    };
    reader.readAsText(file);
  }

  const handleGoldIndexUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const rows = text.split('\n').map((row) => row.split(':'));
      const result = [];// new Map<string, string[]>;
      rows.forEach(element => {
        if (element[1] != undefined)
          result.push({ id: element[0], terms: element[1].split(',').map(item => item.trim()) })
        //result.set(element[0], element[1].split(',').map(item => item.trim()))
      });
      setGoldIndex(result);
    };
    reader.readAsText(file);
  }

  const handleProcess = (event) => {
    event.preventDefault();
    const ds1data = processDataSet(goldIndex, ds1)
    //console.log(ds1data)
    const ds1Metrics = getMetrics(ds1data);
    const ds2data = processDataSet(goldIndex, ds2)
    //console.log(ds1data)
    const ds2Metrics = getMetrics(ds2data);

    const result = [];
    goldIndex.forEach(element => {
      const doc = {
        id: element.id,
        ds1: ds1Metrics.find(obj => obj.id == element.id),
        ds2: ds2Metrics.find(obj => obj.id == element.id)
      }
      result.push(doc);
    });
    setResultProcess(result);
  }

  return (
    <div className="m-8">
      <h1 className="p-4 font-bold text-3xl text-center">Indexing Metrics</h1>
      <form>
        <label htmlFor="goldIndexFile">Gold Index</label>
        <input type="file" name="goldIndexFile" id="goldIndexFile" onChange={handleGoldIndexUpload} />
        {goldIndex.length > 0 ?
          <div>
            <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
              <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                <tr>
                  <th>Document Id</th>
                  <th>Terms</th>
                </tr>
              </thead>
              <tbody>
                {goldIndex.slice(0, 5).map(value => (<tr key={value['id']} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'><td>{value['id']}</td><td>{value['terms'].join(', ')}</td></tr>))}
                <tr key={'last'} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'><td colSpan={2}>...</td></tr>
              </tbody>
            </table>
            <p>Primeiros 5 ítens de um total de {goldIndex.length}</p>
          </div>
          : ''}

        <div className="m-8">
          <label htmlFor="nameDS1">Nome do Conjunto</label>
          <input type="text" name="nameDS1" id="nameDS1" onChange={(e) => setDs1Name(e.target.value)} />
          <label htmlFor="dataSetFile1">Conjunto de Dados</label>
          <input type="file" name="dataSetFile1" id="dataSetFile1" onChange={handleDataSetUpload} />

          {ds1.length > 0 ?
            <div>
              <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                  <tr>
                    <th>Document Id</th>
                    <th>Terms</th>
                  </tr>
                </thead>
                <tbody>
                  {ds1.slice(0, 5).map(value => (<tr key={value['id']} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'><td>{value['id']}</td><td>{value['terms'].join(', ')}</td></tr>))}
                  <tr key={'last'} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'><td colSpan={2}>...</td></tr>
                </tbody>
              </table>
              <p>Primeiros 5 ítens de um total de {ds1.length}</p>
            </div>
            : ''}
        </div>

        <div className="m-8">
          <label htmlFor="nameDS2">Nome do Conjunto</label>
          <input type="text" name="nameDS2" id="nameDS2" onChange={(e) => setDs2Name(e.target.value)} />
          <label htmlFor="dataSetFile2">Conjunto de Dados</label>
          <input type="file" name="dataSetFile2" id="dataSetFile2" onChange={handleDataSetUpload} />

          {ds2.length > 0 ?
            <div>
              <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                  <tr>
                    <th>Document Id</th>
                    <th>Terms</th>
                  </tr>
                </thead>
                <tbody>
                  {ds2.slice(0, 5).map(value => (<tr key={value['id']} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'><td>{value['id']}</td><td>{value['terms'].join(', ')}</td></tr>))}
                  <tr key={'last'} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'><td colSpan={2}>...</td></tr>
                </tbody>
              </table>
              <p>Primeiros 5 ítens de um total de {ds2.length}</p>
            </div>
            : ''}
        </div>
        <button className="bg-sky-500 p-2 text-white w-full hover:bg-sky-600 transition-all cursor-pointer mt-4" onClick={handleProcess}>Processar</button>
      </form>
      {resultProcess.length > 0 ?
        <div>
          <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th rowSpan={2}>Document Id</th>
                <th colSpan={3}>{ds1Name}</th>
                <th colSpan={3}>{ds2Name}</th>
              </tr>
              <tr>
                <th>Precision</th>
                <th>Recall</th>
                <th>FMeasure</th>
                <th>Precision</th>
                <th>Recall</th>
                <th>FMeasure</th>
              </tr>
            </thead>
            <tbody>
              {resultProcess.map(value => (<tr key={value['id']} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'><td>{value['id']}</td>
              <td>{value['ds1'].precision.value}</td><td>{value['ds1'].recall.value}</td><td>{value['ds1'].fMeasure.value}</td>
              <td>{value['ds2'].precision.value}</td><td>{value['ds2'].recall.value}</td><td>{value['ds2'].fMeasure.value}</td></tr>))}
            </tbody>
          </table>
        </div>
        : ''}
    </div>
  );
}
