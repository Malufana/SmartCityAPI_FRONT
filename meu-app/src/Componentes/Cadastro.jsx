import React, { useState } from "react";
import axios from "axios";
import estilos from '../Componentes/Cadastro.module.css';

export function Cadastro(){
    const [username, setUsername] = useState(" ");
    const [password, setPassword] = useState(" ");
    const [email, setEmail] = useState(" ");
    const [error, setError] = useState(" ");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post("http://127.0.0.1:8000/api/create_user/", {
                username: username,
                email: email,
                password: password
            }); 
            console.log("aaa");

            const tokenResponse = await axios.post("http://127.0.0.1:8000/api/token/", {
                username: username,
                password: password
            });
            console.log("Token recebido");
            const token = tokenResponse.data.access;

            alert("Conta Criada com sucesso");
            setUsername("");
            setEmail("");
            setPassword("");

        }catch(error){
            if (error.response) {
                console.log("Erro na resposta da API:", error.response.data);
            } else {
                console.error("Erro desconhecido:", error.message);
            }
        }
    }

    // if(error){
    //     return <div>
    //         {error && (
    //             <div className={estilos.cardErro}>
    //                 <h2>ERRO</h2>
    //                 <p>{error}</p>
    //             </div>
    //         )}
    //     </div>
    // }

    return(
        <body>
            <div className={estilos.container}>
                <h2>Cadastro de Novo Usuário</h2>
                <form onSubmit={handleSubmit}>
                    <div className={estilos.form}>
                        <label>Nome de Usuário:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className={estilos.form}>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className={estilos.form}>
                        <label>Senha:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Cadastrar</button>
                </form>
            </div>
        </body>
        
    )
}