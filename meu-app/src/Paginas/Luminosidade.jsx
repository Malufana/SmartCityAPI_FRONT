import { Header } from '../Componentes/Header';
import { BarraNavegacao } from '../Componentes/BarraNavegacao';
import { TabelaLuminosidade } from '../Componentes/TabelaLuminosidade';

export function Luminosidade(){
    return(
        <>
            <Header/>
            <BarraNavegacao/>
            <TabelaLuminosidade/>
        </>
    )
}