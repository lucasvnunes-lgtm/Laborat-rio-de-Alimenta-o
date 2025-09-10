const valorMultiplo=2;

function valorFinal(){
    let valor = (document.getElementById("Pegarvalor").value);
    let multiplo = valor * valorMultiplo;
    document.getElementById("valor").innerText=multiplo
    console.log(multiplo)
}