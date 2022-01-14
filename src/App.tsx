import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';

export default function App()
{
	const [ data, setData ]: Array<any> = useState();
	//const [ load, setLoad ] = useState(false);
	const [ pesquisa, setPesquisa ] = useState("");
	const [ pesq, setPesq] = useState('');

	useEffect( () =>
	{
		Axios.get(`https://www.googleapis.com/books/v1/volumes?q=${pesq && pesq || pesq == '' && 'finanças'}&orderBy=relevance`)
		.then( (res) =>
		{
			setData(res.data.items);
			console.log( res.data.items[0].volumeInfo.imageLinks.thumbnail );
		});
	}, [pesq]);

	return (
		<>
			<div className="container">

				<div className="main-header">
					<h2>Pesquisa de livros</h2>

					<input placeholder="Nome do livro" type="text" name="book" id="book" onChange={ (e) => setPesquisa(e.target.value) }/>

					<button onClick={ () => setPesq(pesquisa) }>Pesquisar</button>
				</div>

				{ data !== undefined &&
					<div className="lista">
					{
						data.map( (data: any) =>
						{
							return (
								<div className="card">
									<h3>{ data.volumeInfo.title }</h3>
									{ data.volumeInfo.subtitle && <h4>{data.volumeInfo.subtitle}</h4> }
									{ data.volumeInfo.imageLinks && <img src={data.volumeInfo.imageLinks.thumbnail} alt="IMAGEM" />}
								</div>
							)
						})
					}
					</div>
				}

				{ !data && <h3>Nenhum livro pesquisado ainda!</h3> }
			</div>
		</>
	);
};
