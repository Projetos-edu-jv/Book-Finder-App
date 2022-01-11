import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';

export default function App()
{
  const [ data, setData ]: Array<any> = useState();
  const [ load, setLoad ] = useState(false);
  const [ pesquisa, setPesquisa ] = useState("");
  const [ pesq, setPesq] = useState('');

  useEffect( () =>
  {
    Axios.get(`https://www.googleapis.com/books/v1/volumes?q=${pesq && pesq || pesq == '' && 'finanças'}&orderBy=relevance`)
      .then((res) => setData(res.data.items)
    );

  }, [pesq]);

  if (data != undefined && data){
    data.map((data:any) => {
      console.log(data);
      
    })
  }
  
  return (
    <>
      <div className="container">
          <h2>Pesquisa de livros</h2>
          <label htmlFor="book">Nome do livro: </label>
          <input type="text" name="book" id="book" onChange={ (e) => setPesquisa(e.target.value) }/>
          <button onClick={ () => setPesq(pesquisa) }>Pesquisar?</button>

          { data !== undefined &&
            <div className="lista">
            {data.map((data: any) => {
              return (
              <div>
                <h1>{data.volumeInfo.title}</h1>
                {data.volumeInfo.subtitle && <h2>data.volumeInfo.subtitle</h2>}
              </div>
              )
            })}
            </div>
          }

          { !data && <h3>Nenhum livro pesquisado ainda!</h3> }
      </div>
    </>
  );
};