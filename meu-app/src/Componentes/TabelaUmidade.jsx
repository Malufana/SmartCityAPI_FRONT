import React, { useState, useEffect }  from 'react';
import axios from 'axios';
import estilos from './TabelaUmidade.module.css';

export function TabelaUmidade() {
    const [umidade, setUmidade] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUmidade = async () => {
            const token = localStorage.getItem("token");

            if(!token){
                setError("Usuário não logado!");
                return;
            }

            try{
                const response = await axios.get("http://127.0.0.1:8000/api/umidade/",{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUmidade(response.data);
            }catch(error){
                console.error('Erro ao buscar os dados: ', error);
                setError("Erro ao buscar dados")
            }
        };
        
        fetchUmidade();

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
            <h1 className={estilos.h1}>UMIDADE</h1>
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
                        {umidade.map((umido) => (
                            <tr key={umido.id} className={estilos.linha}>
                                <td>{umido.id}</td>
                                <td>{umido.valor}</td>
                                <td>{umido.sensor_id}</td>
                                <td>{umido.timestamp}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}