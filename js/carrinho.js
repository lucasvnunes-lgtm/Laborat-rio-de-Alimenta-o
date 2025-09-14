document.addEventListener("DOMContentLoaded", () => {

    let tbody = document.querySelector("#tabela");

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    function agruparProdutos() {
        const agrupado = [];
        carrinho.forEach(produto => {
            let existente = agrupado.find(p => p.nome === produto.nome);
            if (existente) {
                existente.quantidade = (existente.quantidade || 1) + (produto.quantidade || 1);
            } else {
                agrupado.push({ ...produto, quantidade: produto.quantidade || 1 });
            }
        });
        carrinho = agrupado;
    }

    function atualizarResumo() {
        localStorage.setItem("carrinho", JSON.stringify(carrinho));

        let subTotal = carrinho.reduce((acc, produto) => acc + produto.preco * produto.quantidade, 0);

        document.querySelector(".box .info div:first-child span:last-child").textContent = "R$ " + subTotal;
        document.querySelector(".box footer span:last-child").textContent = "R$ " + subTotal;

        let totalItens = carrinho.reduce((acc, produto) => acc + produto.quantidade, 0);
        let extra = totalItens > 3 ? 10 : 0;
        document.getElementById("extra-total").textContent = "R$ " + extra;
        let totalFinal = subTotal + extra;
        document.getElementById("total").textContent = "R$ " + totalFinal;

    }

    function criarLinha(produto, index) {
        let tr = document.createElement("tr");

        // Produto
        let tdProduto = document.createElement("td");
        tdProduto.innerHTML = `
        <div class="product">
        <img src="${produto.img || "https://picsum.photos/100/120"}" alt="" />
        <div class="info">
            <div class="name">${produto.nome}</div>
            <div class="category">${produto.categoria || "Categoria"}</div>
        </div>
        </div>
        `;
        tr.appendChild(tdProduto);

        // Preço
        let tdPreco = document.createElement("td");
        tdPreco.textContent = "R$ " + produto.preco;
        tr.appendChild(tdPreco);

        // Quantidade
        let tdQty = document.createElement("td");
        tdQty.innerHTML = `
        <div class="qty">
            <button class="minus"><i class="bx bx-minus"></i></button>
            <span>${produto.quantidade}</span>
            <button class="plus"><i class="bx bx-plus"></i></button>
        </div>
        
        `;
        tr.appendChild(tdQty);

        // Total
        let tdTotal = document.createElement("td");
        tdTotal.textContent = "R$ " + produto.preco * produto.quantidade;
        tr.appendChild(tdTotal);

        // Remover
        let tdRemove = document.createElement("td");
        tdRemove.innerHTML = `<button class="remove"><i class="bx bx-x"></i></button>`;
        tr.appendChild(tdRemove);

        // Eventos
        tdQty.querySelector(".minus").addEventListener("click", () => {
            if (produto.quantidade > 1) {
                produto.quantidade--;
                tdQty.querySelector("span").textContent = produto.quantidade;
                tdTotal.textContent = "R$ " + produto.preco * produto.quantidade;
                atualizarResumo();
            }
        });

        tdQty.querySelector(".plus").addEventListener("click", () => {
            produto.quantidade++;
            tdQty.querySelector("span").textContent = produto.quantidade;
            tdTotal.textContent = "R$ " + produto.preco * produto.quantidade;
            atualizarResumo();
        });

        tdRemove.querySelector(".remove").addEventListener("click", () => {
            let pos = carrinho.findIndex(p => p.nome == produto.nome);
            if (pos > -1) {
                carrinho.splice(pos, 1);
                const hrDepois = tr.nextElementSibling;
                tbody.removeChild(tr);
                if (hrDepois && hrDepois.querySelector('hr')) {
                    tbody.removeChild(hrDepois);
                }
                if (pos === 0 && carrinho.length > 0) {
                    const primeiroProduto = tbody.firstElementChild;
                    if (primeiroProduto) {
                        const hrAntesDoPrimeiro = primeiroProduto.previousElementSibling;
                        if (hrAntesDoPrimeiro && hrAntesDoPrimeiro.querySelector('hr')) {
                            tbody.removeChild(hrAntesDoPrimeiro);
                        }
                    }
                }

                atualizarResumo();
            }
        });



        return tr;
    }

    // Agrupa produtos iguais antes de renderizar
    agruparProdutos();

    // Limpa tabela e adiciona linhas
    tbody.innerHTML = "";
    carrinho.forEach((produto, index) => {
        tbody.appendChild(criarLinha(produto, index));
        if (index < carrinho.length - 1) {
            let trHr = document.createElement("tr");
            let tdHr = document.createElement("td");
            tdHr.colSpan = 5;
            tdHr.innerHTML = '<hr>';
            trHr.appendChild(tdHr);
            tbody.appendChild(trHr);
        }
    });

    atualizarResumo();
});

const numero = "5579991020073";

// Whatsssap
function mandarWhatssap() {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    if (carrinho.length === 0) {
        alert("Carrinho vazio");
        return;
    }

    let total = carrinho.reduce((acc, produto) => acc + produto.preco * produto.quantidade, 0);

    let mensagem = `--- NOVO PEDIDO ---\n\n`;

    carrinho.forEach((produto, index) => {
        mensagem += `*${index + 1}. ${produto.quantidade}x ${produto.nome}*\n`;
        mensagem += `   Preço: R$ ${produto.preco.toFixed(2)}\n`;
        mensagem += `   Total: R$ ${(produto.preco * produto.quantidade).toFixed(2)}\n\n`;
    });

    mensagem += `   TOTAL DO PEDIDO: R$ ${total.toFixed(2)}*\n\n`;

    let url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

    // PRIMEIRO: Abrir o WhatsApp
    const whatsappWindow = window.open(url, "_blank");
    
    // SÓ DEPOIS: Limpar o carrinho e atualizar a tela
    if (whatsappWindow) {
        // WhatsApp abriu com sucesso
        localStorage.removeItem("carrinho");
        
        // Atualizar a tela
        const tbody = document.querySelector("#tabela");
        tbody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; padding: 40px; color: #28a745;">
                    <i class='bx bx-check-circle' style="font-size: 48px; display: block; margin-bottom: 15px;"></i>
                    Pedido enviado com sucesso! 🎉
                </td>
            </tr>
        `;
        
        document.querySelector(".box .info div:first-child span:last-child").textContent = "R$ 0,00";
        document.querySelector(".box footer span:last-child").textContent = "R$ 0,00";
        document.getElementById("extra-total").textContent = "R$ 0,00";
        document.getElementById("total").textContent = "R$ 0,00";
    } else {
        // Se o pop-up foi bloqueado
        alert("Permita pop-ups para abrir o WhatsApp. Clique novamente para enviar.");
    }
}