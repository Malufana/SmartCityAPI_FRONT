import React, { useState, useEffect }  from 'react';
import axios from 'axios';
import estilos from './Entrar.module.css';
import { useLocation, useNavigate} from 'react-router-dom';


export function Entrar(){

    const [username, setUsername] = useState(' ');
    const [password, setPassword] = useState(' ');
    const [error, setError] = useState(' ');
    // const [token, setToken] = useEffect(' ');
    const navigate = useNavigate();
    // const location = useLocation();

    const navigateCriar = () => {
        navigate('/NovoUsuario');
    }

    useEffect ( () => {
        localStorage.removeItem('token');
    })

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try{
            const tokenResponse = await axios.post(
                "http://127.0.0.1:8000/api/token/",
                {
                    username: username,
                    password: password
                }
            )
            const token = tokenResponse.data.access;
            console.log(tokenResponse.data.access);
            localStorage.setItem('token', token);
            navigate('/');
        }catch(error){
            console.error(error)
            alert("Usuario não identificado!")
        }
    }

    return(
        <body>
            <div className={estilos.login_container}>
                <form className={estilos.login_form} onSubmit={handleSubmit}>
                    <h2>LOGIN</h2>
                    <div className={estilos.input}>
                        <label>Username</label>
                        <input 
                            type="text" 
                            id='username' 
                            name='username' 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            />
                    </div>
                    <div className={estilos.input}>
                        <label>Password</label>
                        <input 
                            type="password" 
                            id='password' 
                            name='password' 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required/>
                    </div>
                    <button type='submit'>Login</button>
                    <p className={estilos.signup}>Faça seu <a onClick={navigateCriar}>Cadastro</a></p>
                </form>
            </div>
        </body>
        
    )
}