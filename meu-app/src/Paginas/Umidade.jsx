import { Header } from '../Componentes/Header';
import { BarraNavegacao } from '../Componentes/BarraNavegacao';
import { TabelaUmidade } from '../Componentes/TabelaUmidade';

export function Umidade(){
    return(
        <>
            <Header/>
            <BarraNavegacao/>
            <TabelaUmidade/>
        </>
    )
}