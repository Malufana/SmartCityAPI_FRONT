import React, { useState, useEffect }  from 'react';
import axios from 'axios';
import estilos from './TabelaLuminosidade.module.css';

export function TabelaLuminosidade(){

    const [luminosidade, setLuminosidade] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchLuminosidade = async () => {
            const token = localStorage.getItem("token");

            if(!token){
                setError("Usuário não logado!")
                return;
            }

            try{
                const response = await axios.get("http://127.0.0.1:8000/api/luminosidade/", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setLuminosidade(response.data);
            } catch(error){
                console.error('Erro ao buscar os dados: ', error);
                setError("Erro ao buscar dados")
            }
        };

        fetchLuminosidade();

    }, []);

    if(error){
        return <div>
            {error && (
                <div className={estilos.cardErro}>
                    <h2>ERRO</h2>
                    <p>{error}</p>
                </div>
            )}
        </div>

    }

    return(
        <div>
            <h1 className={estilos.h1}>LUMINOSIDADE</h1>
            <div className={estilos.rolagem}>
                <table className={estilos.tabela}>
                    <thead>
                        <tr className={estilos.cabecalho}>
                            <th>ID</th>
                            <th>VALOR</th>
                            <th>SENSOR_ID</th>
                            <th>TIMESTAMP</th>
                        </tr>
                    </thead>
                    <tbody>
                        {luminosidade.map((luz) => (
                        <tr key={luz.id} className={estilos.linha}>
                            <td>{luz.id}</td>
                            <td>{luz.valor}</td>
                            <td>{luz.sensor_id}</td>
                            <td>{luz.timestamp}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}