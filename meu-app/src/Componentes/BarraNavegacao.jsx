import estilos from './BarraNavegacao.module.css';

export function BarraNavegacao(){

    return(
        <nav className={estilos.navbar}>
            <a href="/Sensores">Sensores</a>
            <a href="/Temperatura" >Temperatura</a>
            <a href="/Umidade">Umidade</a> 
            <a href="/Luminosidade">Luminosidade</a>
            <a href="/Contador">Contador</a>
        </nav>
    )
}