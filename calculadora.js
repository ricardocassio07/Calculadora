// Botão que habilita o modo científico
function btnCientifico() {
    var btn = document.getElementById("btnCientifico");
    var containerPadrao = document.getElementById("ContainerBotoesPadrao");
    var containerCientifico = document.getElementById("ContainerBotoesCientifico");

    if (containerPadrao.classList.contains('mostrar')) {
       btn.style.color = "black";
       containerPadrao.classList.remove('mostrar');
       containerCientifico.classList.add('mostrar');
    } else {
       btn.style.color = "rgb(142, 142, 142)";
       containerPadrao.classList.add('mostrar');
       containerCientifico.classList.remove('mostrar');
    }
    console.log('Você mudou o modo da sua calculadora!');
    console.log(btnCientifico);
    console.log(btn); // Aqui estamos imprimindo o elemento btn para verificar seu estado ou propriedades
}

var numAnterior = "";
var numAtual = "";
// var resultado = 0;
var operador = "";


// Adicione um event listener para capturar pressionamento de teclas
document.addEventListener('keydown', function(event) {
    const teclaPressionada = event.key;
    const shiftPressionado = event.shiftKey;
    
    // Verifica se a tecla pressionada é um número de 0 a 9
    if (!isNaN(teclaPressionada) && teclaPressionada !== ' ') {
        AdicionarNumero(teclaPressionada);
        console.log('Você digitou o número ' + teclaPressionada)
    } else if (teclaPressionada === '.') {
        btnDecimal();
        console.log('Você tornou o seu número inteiro em decimal')
    } else if (teclaPressionada === '+') {
        operacao('+');
        console.log('Você clicou no operador matemático: +');
    } else if (teclaPressionada === '-') {
        operacao('-');
        console.log('Você clicou no operador matemático: -');
    } else if (teclaPressionada === '*') {
        operacao('×');
        console.log('Você clicou no operador matemático: ×');
    } else if (teclaPressionada === '/') {
        operacao('÷');
        console.log('Você clicou no operador matemático: ÷');
    } else if (teclaPressionada === '%') {
        operacao('%');
        console.log('Você clicou no operador matemático: %');
    } else if (teclaPressionada === 'Enter' || teclaPressionada === '=') {
        Calcular();
    } else if (shiftPressionado && event.code === 'KeyC'){
        console.log(btnCientifico, btnCientifico());
    } else if (teclaPressionada === 'Backspace'){
        console.log(RetirarUltimoNumero, RetirarUltimoNumero());
    } else if (teclaPressionada === 'Delete'){
        console.log(btnLimpar, btnLimpar());
    }
});

// Botão que habilita o menu mais opções 
function tresPontos(){
    document.getElementById("tresPontos").style.opacity = "0";
    document.getElementById("menu").style.display = "flex";
}

// Botão que fecha o menu mais opções
function fecharMenu(){
    document.getElementById("menu").style.display = "none";
    document.getElementById("tresPontos").style.opacity = "100";
}

// Fução para retomar os valores iniciais das variáveis e do display
function btnLimpar(){
    operador = "";
    numAnterior = "";
    numAtual = "";
    document.getElementById("telaResultado").value = "0";
    document.getElementById("telaResultadoCima").style.display = "none";
    document.getElementById("telaResultado").style.paddingTop = "";
    console.log ("Apagar todo o número")
}

// Função para adicionar vários números à variãvel
function AdicionarNumero(numero) {
    numAtual += numero;
    console.log("O atual número é " + numAtual);
    mostrarResultado();   
}

// Função para adicionar uma vírgula no número
function btnDecimal(){
    if(numAtual===""){
        document.getElementById("telaResultado").value = 0;
    }else {
        numAtual+=".";
    }
    mostrarResultado();
}

function btnPositivoNegativo(){
    if(numAtual === ""){
        numAtual = "" + numAtual;
    }else {
        numAtual = "-" + numAtual;
    }
}

// Funções: - Definir qual operação será realizada; - Adicionar o valor atual na variável "numAnterior" para podermos adicionar mais um número na operação; - Retirar os valores alocados na variável "numAtual" para inserimos o próximo número da conta; - Modificação do layout do display, inserindo mais um input para podermos colocar o últimmo número da conta e a operação na parte de cima do display, para deixarmos livre a parte de baixo para o próximo número
function operacao(op) {
    if (numAtual === '') return;

    if (op === 'fatorial') {
        numAnterior = numAtual;
        let numAnteriorFloat = parseFloat(numAnterior);
        let resultadoFatorial = calcularFatorial(numAnteriorFloat);
        document.getElementById("telaResultadoCima").value = numAnterior + "!";
        document.getElementById("telaResultadoCima").style.display = "flex";
        document.getElementById("telaResultado").value = resultadoFatorial;
        numAtual = resultadoFatorial;
        numAnterior = "";
        operador = "";
        return;
    }

    if (numAnterior !== '') {
        Calcular();
        console.log("Foi efetuado o calculo dos números digitados!")
    }
    
    operador = op;
    numAnterior = numAtual;
    numAtual = '';
    document.getElementById("telaResultadoCima").style.display = "flex";

    switch (operador) {
        case '+':
            document.getElementById("telaResultadoCima").value = numAnterior + " + ";
            console.log('Você digitou clicou no operador matemático: +');
            break;
        case '-':
            document.getElementById("telaResultadoCima").value = numAnterior + " - ";
            console.log('Você digitou clicou no operador matemático: -');
            break;
        case '×':
            document.getElementById("telaResultadoCima").value = numAnterior + " × ";
            console.log('Você digitou clicou no operador matemático: ×');
            break;
        case '÷':
            document.getElementById("telaResultadoCima").value = numAnterior + " ÷ ";
            console.log('Você digitou clicou no operador matemático: ÷');
            break;
        case '%':
            document.getElementById("telaResultadoCima").value = numAnterior + "% × ";
            console.log('Você digitou clicou no operador matemático: %');
            break;
        default:
            return;
    }

    document.getElementById("telaResultado").value = "0";
}

function calcularFatorial(num) {
    if (num === 0 || num === 1) {
        return 1;
    }
    let resultado = 1;
    for (let i = num; i > 1; i--) {
        resultado *= i;
    }
    return resultado;
}

function Calcular(){
    let anterior = parseFloat(numAnterior);
    let atual = parseFloat(numAtual);

    switch(operador) {
        case '+':
            document.getElementById("telaResultadoCima").value = anterior + " + " + atual + " =";
            console.log(numAtual = anterior + atual);
            break;
        case '-':
            document.getElementById("telaResultadoCima").value = anterior + " – " + atual + " =";
            console.log(numAtual = anterior - atual);
            break;
        case '×':
            document.getElementById("telaResultadoCima").value = anterior + " × " + atual + " =";
            console.log(numAtual = anterior * atual);
            break;
        case '÷':
            document.getElementById("telaResultadoCima").value = anterior + " ÷ " + atual + " =";
            console.log(numAtual = anterior / atual);
            break;
        case '%':
            document.getElementById("telaResultadoCima").value = anterior + "% × " + atual + " =";
            console.log(numAtual = anterior / 100 * atual);
            break;
        default:
        return;
    }
    document.getElementById("telaResultado").value = numAtual;
    numAnterior = "";
    operador = "";
}

// Função para imprimir o resultado no display
function mostrarResultado(){
    document.getElementById("telaResultado").value = numAtual;
}

function RetirarUltimoNumero() {
    if(numAtual != 0){
        numAtual = numAtual.slice(0, -1);
        mostrarResultado();
        console.log ("Retirar o ultimo número");
        console.log ("O atual número é " + numAtual);
    } else{
        document.getElementById("telaResultado").value = "0";
    }
}