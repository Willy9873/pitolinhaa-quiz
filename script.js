const questoes = document.querySelectorAll(".questao");
const resultados = document.querySelectorAll(".resultado");

let perguntaAtual = 0;
let pontos = 0;

// limpa resultados iniciais
for(let i = 0; i < resultados.length; i++) {
    resultados[i].innerHTML = "";
}

function mostrarPergunta() {

    // esconde todas as perguntas
    for(let i = 0; i < questoes.length; i++) {
        questoes[i].style.display = "none";
    }

    // mostra atual
    questoes[perguntaAtual].style.display = "block";

    // limpa feedback anterior
    for(let i = 0; i < resultados.length; i++) {
        resultados[i].innerHTML = "";
    }
}

function proximaPergunta() {

    perguntaAtual++;

    if(perguntaAtual < questoes.length){
        mostrarPergunta();
    } else {
        mostrarTelaFinal();
    }
}

function resposta(valor, idResultado){

    const resultado = document.getElementById(idResultado);

    if(valor === "certo"){
        pontos++;
        resultado.innerHTML = "✅ Resposta Correta!";
        resultado.style.color = "green";
    } else {
        resultado.innerHTML = "❌ Resposta Errada!";
        resultado.style.color = "red";
    }

    setTimeout(proximaPergunta, 1000);
}

// 📊 ranking fora da função resposta (CORRETO)
function calcularRanking(pontos, total) {

    const porcentagem = (pontos / total) * 100;

    if(porcentagem === 100) return "🏆 Cê é PBX, né?";
    if(porcentagem >= 70) return "🥇 Oia como Deos é bão";
    if(porcentagem >= 40) return "🥈 Cê é CXV né?";
    return "🥉 Bronze";
}

// 🎬 tela final completa
function mostrarTelaFinal() {

    // esconde perguntas
    for(let i = 0; i < questoes.length; i++) {
        questoes[i].style.display = "none";
    }

    const telaFinal = document.getElementById("telaFinal");
    telaFinal.style.display = "block";

    const total = questoes.length;
    const ranking = calcularRanking(pontos, total);

    const elementoPontuacao = document.getElementById("pontuacaoFinal");
    const elementoRanking = document.getElementById("rankingFinal");

    elementoRanking.innerHTML = ranking;

    // animação de contagem
    let atual = 0;

    const intervalo = setInterval(() => {

        elementoPontuacao.innerHTML = atual;

        if(atual >= pontos) {
            clearInterval(intervalo);
        }

        atual++;

    }, 100);
}

// inicia quiz
mostrarPergunta();

function reiniciarQuiz() {

    // resetar variáveis
    perguntaAtual = 0;
    pontos = 0;

    // esconder tela final
    document.getElementById("telaFinal").style.display = "none";

    // limpar resultados
    for (let i = 0; i < resultados.length; i++) {
        resultados[i].innerHTML = "";
    }

    // resetar estilos de resultado (caso tenha cor aplicada)
    for (let i = 0; i < resultados.length; i++) {
        resultados[i].style.color = "";
    }

    // voltar para primeira pergunta
    mostrarPergunta();
}