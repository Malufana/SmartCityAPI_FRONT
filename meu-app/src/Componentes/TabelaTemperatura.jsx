import React, { useState, useEffect }  from 'react';
import axios from 'axios';
import estilos from './TabelaTemperatura.module.css';

export function TabelaTemperatura(){

    const [temperatura, setTemperatura] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTemperatura = async () => {
            const token = localStorage.getItem("token");

            if(!token){
                setError("Usuário não logado!")
                return;
            }

            try{
                const response = await axios.get("http://127.0.0.1:8000/api/temperatura/", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setTemperatura(response.data);
            } catch(error){
                console.error('Erro ao buscar os dados: ', error);
                setError("Erro ao buscar dados")
            }
        };

        fetchTemperatura();

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
            <h1 className={estilos.h1}>TEMPERATURA</h1>
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
                        {temperatura.map((temp) => (
                        <tr key={temp.id} className={estilos.linha}>
                            <td>{temp.id}</td>
                            <td>{temp.valor}</td>
                            <td>{temp.sensor_id}</td>
                            <td>{temp.timestamp}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}