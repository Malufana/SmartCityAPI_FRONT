import React, { useState, useEffect } from "react";
import axios from 'axios';
import estilos from './CriarSensor.module.css'

export function CriarSensor(){
    const[tipo, setTipo] = useState("");
    const[latitude, setLatitude] = useState("");
    const[longitude, setLongitude] = useState("");
    const[localizacao, setLocalizacao] = useState("");
    const[responsavel, setResponsavel] = useState("");
    const[observacao, setObservacao] = useState("");

    const[valor, setValor] = useState("");
    const[timestamp, setTimestamp] = useState("");

    const [error, setError] = useState("");

    

    // useEffect(() => {
    //     const token = localStorage.getItem("token");
    //     if(!token){
    //         setError("Usuário não logado!")
    //         return;
    //     }

    //     try{
    //         const response = await axios.get("http://127.0.0.1:8000/api/sensores/", {
    //             headers:{
    //                 Authorization: `Bearer ${token}`
    //             }
    //         })
    //     }catch(error){
    //         console.error('Erro: ', error);
    //         setError("Erro")
    //     }  
    // }, [])
    
    const criar = async () => {
        try{
            const token = localStorage.getItem("token");

            if(!token){
                setError("Usuário não logado!")
                return;
            }

            const sensorData = {
                tipo: tipo,
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
                localizacao: localizacao,
                responsavel: responsavel,
                observacao: observacao
            }

            const response = await axios.post("http://127.0.0.1:8000/api/sensores/",
                sensorData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            const sensorId = response.data.id;
            console.log("Sensor criado com sucesso");


            const sensorEspecificoData = {
                sensor: sensorId,
                valor,
                timestamp
            };

            const urlTipo = {
                Temperatura: "http://127.0.0.1:8000/api/temperatura/",
                Luminosidade: "http://127.0.0.1:8000/api/luminosidade/",
                Umidade: "http://127.0.0.1:8000/api/umidade/",
                Contador: "http://127.0.0.1:8000/api/contador/"
            }

            if(urlTipo[tipo]){
                await axios.post(urlTipo[tipo], sensorEspecificoData,{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            }

            console.log("Dados inseridos com sucesso");
            alert("Dados inseridos com sucesso");

            setTipo("");
            setLatitude("");
            setLongitude("");
            setLocalizacao("");
            setResponsavel("");
            setObservacao("");
            setValor("");
            setTimestamp("");

        }catch(error){
            console.log("Erro ao inserir os dados", error.response?.data || error.message);
            console.error(error)
        }
    }

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
        <>
            <div>
                <div className={estilos.criar_container}>
                    <h2>CRIAR SENSOR</h2>

                    <div>
                        <form>
                            <label>Tipo</label>
                            <select onChange={(e) => setTipo(e.target.value)}>
                                <option value="">Selecione o Tipo</option>
                                <option value="Temperatura">Temperatura</option>
                                <option value="Luminosidade">Luminosidade</option>
                                <option value="Umidade">Umidade</option>
                                <option value="Contador">Contador</option>
                            </select>
                            {["Temperatura", "Luminosidade", "Umidade", "Contador"].includes(tipo) && (
                                <>
                                    <label>Valor</label>
                                    <input type="number" value={valor} onChange={(e) => setValor(e.target.value)}/>

                                    <label>Timestamp</label>
                                    <input type="datetime-local" value={timestamp} onChange={(e) => setTimestamp(e.target.value)}/>
                                </>
                            )}

                            <label>Latitude</label>
                            <input type="number" value={latitude} onChange={(e) => {setLatitude(e.target.value);}}/>

                            <label>Longitude</label>
                            <input type="number" value={longitude} onChange={(e) => {setLongitude(e.target.value);}}/>

                            <label>Localizacao</label>
                            <input type="text" value={localizacao} onChange={(e) => {setLocalizacao(e.target.value);}}/>

                            <label>Responsavel</label>
                            <input type="text" value={responsavel} onChange={(e) => {setResponsavel(e.target.value);}}/>

                            <label>Observação</label>
                            <input type="text" value={observacao} onChange={(e) => {setObservacao(e.target.value);}}/>
                        </form>
                    </div>

                    <div>
                        <button onClick={criar}>Enviar</button>
                    </div>
                </div>
            </div>
        </>
    )
}