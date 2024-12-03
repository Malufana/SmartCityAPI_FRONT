import { Header } from '../Componentes/Header';
import { BarraNavegacao } from '../Componentes/BarraNavegacao';
import { TabelaSensores } from '../Componentes/TabelaSensores';

export function Sensores(){
    return(
        <>
            <Header/>
            <BarraNavegacao/>
            <TabelaSensores/>
        </>
    )
}