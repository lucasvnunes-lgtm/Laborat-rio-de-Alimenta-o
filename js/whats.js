    const numero = "5579991020073";
function mandarWhatssap() {

    let nome = document.getElementById("nomeForm").value;
    let gmail = document.getElementById("gmailForm").value;
    let comentario = document.getElementById("comment").value;
    if (numero && gmail && comentario) {
        let mensagem =
            `📌 Novo Pedido
1 - Nome: ${nome}
2 - Gmail: ${gmail}
3 - Explicação: ${comentario}`;

        let url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
        window.open(url, "_blank");
    }
    else {
        alert("Preencha todos os campos!");
    }
}


function ligarWhatssap(){
    let url = `https://wa.me/${numero}`;
        window.open(url, "_blank");
}



/*<div class="col-md-12">
                    <div class="mail_section_1">
                        <!-- Formulário de contato -->
                        <input type="text" class="mail_text" id="nomeForm" placeholder="Seu Nome" name="Your Name">
                        <input type="text" class="mail_text" id="gmailForm" placeholder="Seu Gmail" name="Your Email">
                        
                        <textarea class="massage-bt" placeholder="Mensagem" rows="5" id="comment" name="Massage"></textarea>
                        <div class="send_bt"><a href="#" onclicl="mandarWhatssap()">Enviar</a></div>
                    </div>
                </div>*/