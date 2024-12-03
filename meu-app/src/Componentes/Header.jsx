import estilos from './Header.module.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router-dom';

export function Header(){
    const navigate = useNavigate();

    const navigateHome = () => {
        navigate('/');
    }

    const navigateLogin = () => {
        navigate('/Login');
    }

    const navigateUpload = () =>{
        navigate('/EnviarArquivos');
    }

    const navigateDados = () => {
        navigate('/VisualizacaoDados');
    }

    return(
        <header className={estilos.header}>
            <button onClick={navigateHome} className={estilos.button}>
                <i class="bi bi-house"></i>
            </button>
            
            <button onClick={navigateUpload} className={estilos.button}>
                <i class="bi bi-upload"></i>
            </button>

            <div className={estilos.logo}>
                <h1>Sensores</h1>
            </div>

            <button onClick={navigateDados} className={estilos.button}>
                <i class="bi bi-bar-chart-line"></i>
            </button>

            <button onClick={navigateLogin} className={estilos.button}>
                <i class="bi bi-person"></i>
            </button>
        </header>
    )
}