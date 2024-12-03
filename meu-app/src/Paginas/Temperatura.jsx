import { Header } from '../Componentes/Header';
import { BarraNavegacao } from '../Componentes/BarraNavegacao';
import { TabelaTemperatura } from '../Componentes/TabelaTemperatura';

export function Temperatura(){
    return(
        <>
            <Header/>
            <BarraNavegacao/>
            <TabelaTemperatura/>
        </>
    )
}