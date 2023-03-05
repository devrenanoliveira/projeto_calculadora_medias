const form = document.getElementById('form-notas');
const imgAprovado = '<img src="./images/aprovado.png" alt="Emoji celebrando" />';
const imgReprovado = '<img src="./images/reprovado.png" alt="Emoji decepcionado" />';
const atividades = []; // array criado para armazenar todas as atividades incluídas pelo usuário //
const notas = []; // array criado para armazenar todas as notas incluídas pelo usuário //
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>'; // aqui foi incluída a constante para dar o efeito de aprovado (retorno em verde) //
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>'; // aqui foi incluída a constante para dar o efeito de reprovado (retorno em vermelho) //
const notaMinima = parseFloat(prompt("Digite a nota mínima:"));

let linhas = ''; // colocando a variável aqui, tornamos ela global, ou seja, não vai mais substituir toda vez que outro elemento for incluído na tabela //

form.addEventListener("submit", function(e) { //criando o evento de submit e remover o comportamento do formulário que atualiza a tela sempre que recebe algum valor//
    e.preventDefault();

    // o trabalho do evento será o de chamar as funções abaixo //

    adicionaLinha(); 
    atualizaTabela();
    atualizaMediaFinal();
});

function adicionaLinha() { // a lógica de adicionar uma linha vai ficar dentro dessa função //
    const inputNomeAtividade = document.getElementById("nome-atividade");
    const inputNotaAtividade = document.getElementById("nota-atividade");

    if (atividades.includes(inputNomeAtividade.value)) { // o "if" nesse caso serve para garantir que atividades repetidas não sejam incluídas por engano //
        alert(`A atividade: ${inputNomeAtividade.value} já foi inserida.`);
    } else {
        atividades.push(inputNomeAtividade.value); // fazendo um push do array criado (atividades[]), ou seja, push é o mesmo que dizer que está adicionando algo ao array //
        notas.push(parseFloat(inputNotaAtividade.value)); // fazendo um push do array criado (notas[]),ou seja, push é o mesmo que dizer que está adicionando algo ao array //

        // código abaixo serve para ir adicionando linhas na tabela com as informações que o usuário coloca no formulário //

        let linha = '<tr>'; // inicia a linha da tabela //
        linha += `<td>${inputNomeAtividade.value}</td>`; // "linha +=" é o mesmo que concatenar. E o código completo é para adicionar as informações nas colunas da tabela//
        linha += `<td>${inputNotaAtividade.value}</td>`;
        linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>`; // usando o operador ternário: o "?" significa o if e o ":" significa o else //
        linha += '</tr>'; //finaliza a linha da tabela //

        linhas += linha;

        inputNomeAtividade.value = ''; // limpa o campo do formulário após adicionar o conteúdo //
        inputNotaAtividade.value = ''; // limpa o campo do formulário após adicionar o conteúdo //
    }
}

function atualizaTabela() { //função responsável por atualizar o conteúdo da tabela //
    const corpoTabela = document.querySelector('tbody'); // para colocar todo o conteúdo acima no corpo da tabela, recuperamos o corpo dela primeiro (tbody) //
    corpoTabela.innerHTML = linhas; // insere o conteúdo na tag usando o "innerHTML" //
}

// todos os itens abaixo servem como base para o cálculo da média das notas //

function atualizaMediaFinal() { 
    const mediaFinal = calculaMediaFinal();
    
    document.getElementById("media-final-valor").innerHTML = mediaFinal.toFixed(2); // o item "toFixed()" limita as casas decimas de acordo com o valor que eu colocar nos parênteses //
    document.getElementById("media-final-resultado").innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
}

function calculaMediaFinal() {
    let somaDasNotas = 0;

    for (let i = 0; i < notas.length; i++) {
        somaDasNotas += notas[i];
    }

    return somaDasNotas / notas.length;
}
