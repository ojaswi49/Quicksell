import React, { useEffect, useState } from 'react';
import './css/app.css';
import Navbar from './components/Navbar';
import Content from './components/Content';

const apiUrl = 'https://api.quicksell.co/v1/internal/frontend-assignment';

const App = () => {

  const [dataFromApi, setDataFromApi] = useState();
  const [grouping, setGrouping] = useState('status');
  const [sorting, setSorting] = useState('priority');

  useEffect(() => {
    const group = localStorage.getItem('grouping');
    const sort = localStorage.getItem('sorting');
    if(group) setGrouping(group);
    if(sort) setSorting(sort);
  }, []);

  useEffect(() => {
    fetch(apiUrl)
      .then(res => {
        if(!res.ok){
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        setDataFromApi(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className='main'>
      <Navbar grouping={grouping} setGrouping={setGrouping} sorting={sorting} setSorting={setSorting}/>
      {dataFromApi && 
        <Content grouping={grouping} sorting={sorting} dataFromApi={dataFromApi}/>
      }
    </div>
  )
}

export default App
