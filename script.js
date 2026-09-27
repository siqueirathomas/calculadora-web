const visor = document.getElementById("visor");

const expressao = document.getElementById("expressao");

const botoesNumeros = document.querySelectorAll(".numero");

const botoesOperadores = document.querySelectorAll(".operador");

const botaoIgual = document.querySelector(".igual");

const botaoLimpar = document.querySelector('[data-acao="limpar"]');

const botaoApagar = document.querySelector('[data-acao="apagar"]');

const botaoPorcentagem = document.querySelector('[data-acao="porcentagem"]');


let numeroAtual = "";

let primeiroNumero = null;

let operadorAtual = null;

let aguardandoSegundoNumero = false;


/* ATUALIZA O VISOR */

function atualizarVisor() {

    if (numeroAtual === "") {
        visor.value = "0";

        return;
    }

    visor.value = numeroAtual;
}


/* ADICIONA NÚMERO */

function adicionarNumero(numero) {

    if (aguardandoSegundoNumero) {

        numeroAtual = "";

        aguardandoSegundoNumero = false;
    }

    if (numero === "." && numeroAtual.includes(".")) {
        return;
    }

    if (numeroAtual === "0" && numero !== ".") {

        numeroAtual = numero;

    } else {

        numeroAtual += numero;
    }

    atualizarVisor();
}


/* ESCOLHE OPERADOR */

function escolherOperador(operador) {

    if (numeroAtual === "") {
        return;
    }

    if (primeiroNumero !== null && operadorAtual !== null) {

        calcularResultado();
    }

    primeiroNumero = Number(numeroAtual);

    operadorAtual = operador;

    aguardandoSegundoNumero = true;

    expressao.textContent =
        `${primeiroNumero} ${mostrarOperador(operador)}`;
}


/* CALCULA */

function calcularResultado() {

    if (
        primeiroNumero === null ||
        operadorAtual === null ||
        numeroAtual === ""
    ) {
        return;
    }

    const segundoNumero = Number(numeroAtual);

    let resultado;


    switch (operadorAtual) {

        case "+":

            resultado = primeiroNumero + segundoNumero;

            break;


        case "-":

            resultado = primeiroNumero - segundoNumero;

            break;


        case "*":

            resultado = primeiroNumero * segundoNumero;

            break;


        case "/":

            if (segundoNumero === 0) {

                visor.value = "Erro";

                numeroAtual = "";

                primeiroNumero = null;

                operadorAtual = null;

                expressao.textContent = "Não é possível dividir por zero";

                return;
            }

            resultado = primeiroNumero / segundoNumero;

            break;
    }


    resultado = Number(resultado.toFixed(10));

    numeroAtual = String(resultado);

    primeiroNumero = null;

    operadorAtual = null;

    aguardandoSegundoNumero = true;

    expressao.textContent = "";

    atualizarVisor();
}


/* LIMPA TUDO */

function limparCalculadora() {

    numeroAtual = "";

    primeiroNumero = null;

    operadorAtual = null;

    aguardandoSegundoNumero = false;

    expressao.textContent = "";

    atualizarVisor();
}


/* APAGA ÚLTIMO CARACTERE */

function apagarUltimo() {

    if (aguardandoSegundoNumero) {
        return;
    }

    numeroAtual = numeroAtual.slice(0, -1);

    atualizarVisor();
}


/* PORCENTAGEM */

function calcularPorcentagem() {

    if (numeroAtual === "") {
        return;
    }

    numeroAtual = String(Number(numeroAtual) / 100);

    atualizarVisor();
}


/* MOSTRA O OPERADOR BONITO */

function mostrarOperador(operador) {

    if (operador === "*") {
        return "×";
    }

    if (operador === "/") {
        return "÷";
    }

    if (operador === "-") {
        return "−";
    }

    return operador;
}


/* CLIQUES NOS NÚMEROS */

botoesNumeros.forEach(function(botao) {

    botao.addEventListener("click", function() {

        adicionarNumero(botao.textContent);

    });

});


/* CLIQUES NOS OPERADORES */

botoesOperadores.forEach(function(botao) {

    botao.addEventListener("click", function() {

        escolherOperador(botao.dataset.operador);

    });

});


/* IGUAL */

botaoIgual.addEventListener("click", function() {

    calcularResultado();

});


/* LIMPAR */

botaoLimpar.addEventListener("click", function() {

    limparCalculadora();

});


/* APAGAR */

botaoApagar.addEventListener("click", function() {

    apagarUltimo();

});


/* PORCENTAGEM */

botaoPorcentagem.addEventListener("click", function() {

    calcularPorcentagem();

});


/* TECLADO DO COMPUTADOR */

document.addEventListener("keydown", function(event) {

    const tecla = event.key;


    if (
        (tecla >= "0" && tecla <= "9") ||
        tecla === "."
    ) {

        adicionarNumero(tecla);

        return;
    }


    if (
        tecla === "+" ||
        tecla === "-" ||
        tecla === "*" ||
        tecla === "/"
    ) {

        escolherOperador(tecla);

        return;
    }


    if (tecla === "Enter" || tecla === "=") {

        calcularResultado();

        return;
    }


    if (tecla === "Backspace") {

        apagarUltimo();

        return;
    }


    if (tecla === "Escape") {

        limparCalculadora();

        return;
    }


    if (tecla === "%") {

        calcularPorcentagem();

    }

});