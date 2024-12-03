import { Header } from '../Componentes/Header';
import { BarraNavegacao } from '../Componentes/BarraNavegacao';
import { CsvUploadForm } from '../Componentes/CsvUploadForm';

export function EnviarArquivos(){
    return(
        <>
            <Header/>
            <BarraNavegacao/>
            <CsvUploadForm/>
        </>
    )
}