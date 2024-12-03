import { Header } from '../Componentes/Header';
import { BarraNavegacao } from '../Componentes/BarraNavegacao';
import { CorpoPrincipal } from '../Componentes/CorpoPrincipal';

export function Home(){
    return(
        <>
            <Header/>
            <BarraNavegacao/>
            <CorpoPrincipal/>
        </>
    )
}