import { aviso } from "./avisos.js";

adicionar(aviso);

function adicionar(item) {
    let dataAtual = new Date();
    let boxNoticia = document.querySelector("#itensAvisos");

    
    item.sort((a, b) => converterDate(b.data) - converterDate(a.data));

    item.forEach(element => {
        let dataDia = converterDate(element.data);
        let tempoNoticia = (dataAtual - dataDia) / (1000 * 60 * 60 * 24); 

        if (tempoNoticia <= 4 && tempoNoticia >= 0) {
            let dataNoticia = document.createElement("data");
            dataNoticia.classList.add('dataNoticia');
            dataNoticia.textContent = element.data;

            let infoNoticia = document.createElement("p");
            infoNoticia.classList.add('infoNoticia');
            infoNoticia.textContent = element.informacao;

            let importanciaNoticia = document.createElement("h3");
            importanciaNoticia.classList.add('importancia');
            importanciaNoticia.textContent = element.importancia;

            let nomeNoticia = document.createElement("h2");
            nomeNoticia.classList.add('nomeNoticia');
            nomeNoticia.textContent = element.nome;

            let baseNoticia = document.createElement("div");
            baseNoticia.classList.add('baseNoticia');
            baseNoticia.appendChild(nomeNoticia);
            baseNoticia.appendChild(importanciaNoticia);

            let noticias = document.createElement("div");
            noticias.classList.add('noticia');
            noticias.appendChild(baseNoticia);
            noticias.appendChild(infoNoticia);
            noticias.appendChild(dataNoticia);

            boxNoticia.appendChild(noticias);
        }
    });
}

function converterDate(dataString) {
    const partes = dataString.split("/");
    const dia = parseInt(partes[0], 10);
    const mes = parseInt(partes[1], 10) - 1;
    const ano = parseInt(partes[2], 10);
    return new Date(ano, mes, dia);
};
