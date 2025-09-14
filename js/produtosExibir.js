import { salgado } from "./proutos.js";
import { gelados } from "./proutos.js";
import { docesChocolate } from "./proutos.js";
import { bebidas } from "./proutos.js";
import { salgadinhos } from "./proutos.js";

let carrinho = [];

function checarLargura() {
    let largura = window.innerWidth;

    adicionarItem(salgado, "SALGADOS", largura);
    adicionarItem(salgadinhos, "SALGADINHOS", largura);
    adicionarItem(bebidas, "BEBIDAS", largura);
    adicionarItem(docesChocolate, "DOCES", largura);
    adicionarItem(gelados, "GELADOS", largura);
}

checarLargura();

window.addEventListener("resize", () => {
    document.querySelector("#itensProdutos").innerHTML = "";
    checarLargura();
});

function adicionarItem(itens, tipo, largura) {
    let quantia = 0;
    if (largura > 990) {
        quantia = 4;
    }
    else if (largura > 576) {
        quantia = 2;
    }
    else {
        quantia = 1;
    }

    let divClass = document.querySelector("#itensProdutos");

    const textConteiner = document.createElement("div");
    textConteiner.classList.add('container');

    const textRow = document.createElement("div");
    textRow.classList.add('layout_padding');

    const textCol = document.createElement("div");
    textCol.classList.add('col-md-12');

    const texth1 = document.createElement("div");
    texth1.classList.add('coffee_taital');

    texth1.textContent = tipo;
    textCol.appendChild(texth1);
    textRow.appendChild(textCol);
    textConteiner.appendChild(textRow);

    divClass.appendChild(textConteiner);

    const section = document.createElement("div");
    section.classList.add('coffee_section_2');

    const divSecundaria = document.createElement("div");
    divSecundaria.classList.add('carousel-inner');

    const divPrincipal = document.createElement("div");
    divPrincipal.id = "main_slider_" + tipo.toLowerCase();
    divPrincipal.classList.add('carousel', 'slide');
    divPrincipal.setAttribute('data-ride', 'carousel');
    divPrincipal.setAttribute("data-wrap", "true");


    let proximo, antreior;
    if (itens.length > quantia) {
        antreior = document.createElement("a");
        antreior.className = "carousel-control-prev";
        antreior.href = "#main_slider_" + tipo.toLowerCase();
        antreior.setAttribute("role", "button");
        antreior.setAttribute("data-slide", "prev");

        const visualAnterios = document.createElement("i");
        visualAnterios.className = "fa fa-arrow-left";
        antreior.appendChild(visualAnterios);

        proximo = document.createElement("a");
        proximo.className = "carousel-control-next";
        proximo.href = "#main_slider_" + tipo.toLowerCase();
        proximo.setAttribute("role", "button");
        proximo.setAttribute("data-slide", "next");

        const visualProximo = document.createElement("i");
        visualProximo.className = "fa fa-arrow-right";
        proximo.appendChild(visualProximo);

        divPrincipal.appendChild(proximo);
        divPrincipal.appendChild(antreior);
    }

    const produtoPorCard = quantia;

    for (let i = 0; i < itens.length; i += produtoPorCard) {
        let carrosel = document.createElement("div");
        carrosel.classList.add("carousel-item");
        if (i === 0) carrosel.classList.add("active");

        let containerFluid = document.createElement("div");
        containerFluid.classList.add('container-fluid');

        let row = document.createElement("div");
        row.classList.add("row");


        let grupoProdutos = itens.slice(i, i + produtoPorCard);

        grupoProdutos.forEach(produto => {
            let boxitem = document.createElement("div");
            boxitem.classList.add("col-lg-3", "col-md-6");

            let boxImagem = document.createElement("div");
            boxImagem.classList.add("coffee_img");
            let img = document.createElement("img");
            img.src = produto.url;
            boxImagem.appendChild(img);

            let boxInf = document.createElement("div");
            boxInf.classList.add("coffee_box");

            let nomeProduto = document.createElement("h3");
            nomeProduto.classList.add("types_text");
            nomeProduto.textContent = produto.nome;

            let info = document.createElement("p");
            info.classList.add("looking_text");
            info.textContent = produto.info;

            let boxValor = document.createElement("div");
            boxValor.classList.add("read_bt");

            let valor = document.createElement("a");
            valor.textContent = `INSERIR: ${produto.preco}R$`;

            valor.addEventListener("click", (e) => {
                e.preventDefault();
                let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
                carrinho.push({
                    nome: produto.nome,
                    preco: produto.preco,
                    categoria:tipo,
                    img:produto.url
                });
                localStorage.setItem("carrinho", JSON.stringify(carrinho));
                console.log("Adicionado ao carrinho:", produto.nome);
            });

            boxValor.appendChild(valor);
            boxInf.appendChild(nomeProduto);
            boxInf.appendChild(info);
            boxInf.appendChild(boxValor);

            boxitem.appendChild(boxImagem);
            boxitem.appendChild(boxInf);

            row.appendChild(boxitem);
        });

        containerFluid.appendChild(row);
        carrosel.appendChild(containerFluid);
        divSecundaria.appendChild(carrosel);
    }

    divPrincipal.appendChild(divSecundaria);
    section.appendChild(divPrincipal);
    divClass.appendChild(section);
}

window.addEventListener("resize", () => {
    adicionarItem()
});