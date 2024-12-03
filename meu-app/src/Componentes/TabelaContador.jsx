import React, { useState, useEffect }  from 'react';
import axios from 'axios';
import estilos from './TabelaContador.module.css';

export function TabelaContador(){

    const [contador, setContador] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchContador = async () => {
            const token = localStorage.getItem("token");

            if(!token){
                setError("Usuário não logado!")
                return;
            }

            try{
                const response = await axios.get("http://127.0.0.1:8000/api/contador/", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setContador(response.data);
            } catch(error){
                console.error('Erro ao buscar os dados: ', error);
                setError("Erro ao buscar dados")
            }
        };

        fetchContador();

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
            <h1 className={estilos.h1}>CONTADOR</h1>
            <div className={estilos.rolagem}>
                <table className={estilos.tabela}>
                    <thead>
                        <tr className={estilos.cabecalho}>
                            <th>ID</th>
                            <th>SENSOR_ID</th>
                            <th>TIMESTAMP</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contador.map((cont) => (
                        <tr key={cont.id} className={estilos.linha}>
                            <td>{cont.id}</td>
                            <td>{cont.sensor_id}</td>
                            <td>{cont.timestamp}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}