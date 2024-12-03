import React, { useState } from "react";
import estilos from '../Componentes/CorpoPrincipal.module.css';

export function CorpoPrincipal() {
    return (
        <div className={estilos.container}>
            <h1 className={estilos.title}>Sensores</h1>

            <section className={estilos.section}>
                <h2 className={estilos.sub}>O que são Sensores?</h2>
                <p className={estilos.paragrafo}>
                    Sensores são dispositivos usados para monitorar e medir diferentes variáveis ambientais,
                    como temperatura, luminosidade e umidade. Eles coletam dados importantes que ajudam a manter
                    o controle e a segurança em uma cidade inteligente.
                </p>
            </section>

            <section className={estilos.section}>
                <h2 className={estilos.sub}>Tipos de Sensores Utilizados</h2>
                <ul className={estilos.list}>
                    <li className={estilos.listItem}><strong>Sensor de Temperatura:</strong> Monitora a temperatura em áreas específicas.</li>
                    <li className={estilos.listItem}><strong>Sensor de Luminosidade:</strong> Mede a intensidade da luz, útil para controle de iluminação.</li>
                    <li className={estilos.listItem}><strong>Sensor de Umidade:</strong> Avalia a umidade do ar, essencial para o monitoramento ambiental.</li>
                    <li className={estilos.listItem}><strong>Sensor de Contador:</strong> Funciona com sensores de proximidade, indutivos, capacitivos.</li>
                </ul>
            </section>
        </div>
    );
  }