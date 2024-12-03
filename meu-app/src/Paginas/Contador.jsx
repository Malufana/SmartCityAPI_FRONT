import { Header } from '../Componentes/Header';
import { BarraNavegacao } from '../Componentes/BarraNavegacao';
import { TabelaContador } from '../Componentes/TabelaContador';

export function Contador(){
    return(
        <>
            <Header/>
            <BarraNavegacao/>
            <TabelaContador/>
        </>
    )
}