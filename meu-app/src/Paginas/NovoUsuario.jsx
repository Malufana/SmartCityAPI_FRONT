import { Header } from '../Componentes/Header';
import { BarraNavegacao } from '../Componentes/BarraNavegacao';
import { Cadastro } from '../Componentes/Cadastro';

export function NovoUsuario(){
    return(
        <>
        <Header/>
        <BarraNavegacao/>
        <Cadastro/>
        </>
    )
}