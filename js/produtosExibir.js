import { produtos } from "./proutos.js";

let divPrincipal = document.querySelector("#carrosel_Itens");
divPrincipal.innerHTML = '';

// Quantidade de produtos por slide
const produtoPorCard = 4;

// Dividir o array em pedaços de 4
for(let i = 0; i < produtos.length; i += produtoPorCard){
    let carrosel = document.createElement("div");
    carrosel.classList.add("carousel-item");
    if(i === 0){
        carrosel.classList.add("active");
    }

    let containerFluid = document.createElement("div");
    containerFluid.classList.add("container-fluid");

    let row = document.createElement("div");
    row.classList.add("row");
    let grupoProdutos = produtos.slice(i, i+produtoPorCard)

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
        valor.textContent = produto.preco;

        //sistema de adicionar
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
    divPrincipal.appendChild(carrosel);
}

function adicionarItem(){
    let divClass = document.createElement("div");
    divClass.id="main_slider";
    divClass.classList.add('carousel');
    divClass.classList.add('slide');
    divClass.setAttribute('carrosel');
    for(let i = 0; i < produtos.length; i += produtoPorCard){
        let carrosel = document.createElement("div");
        carrosel.classList.add("carousel-item");
        if(i === 0){
            carrosel.classList.add("active");
        }
    
        let containerFluid = document.createElement("div");
        containerFluid.classList.add("container-fluid");
    
        let row = document.createElement("div");
        row.classList.add("row");
        let grupoProdutos = produtos.slice(i, i+produtoPorCard)
    
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
            valor.textContent = produto.preco;
    
            //sistema de adicionar
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
        divPrincipal.appendChild(carrosel);

}

// <div id="main_slider" class="carousel slide" data-ride="carousel"></div>