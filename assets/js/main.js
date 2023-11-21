const input = document.querySelector('.input');
const adicionar = document.querySelector('.adicionar');
const tarefas = document.querySelector('.tarefas');

function criaLi(){
    const li = document.createElement('li');
    return li;
}

input.addEventListener('keypress', function(e){
    if (e.keyCode === 13) {
        if (!input.value) return;
        criaTarefa(input.value);
        limpaInput();
    }
});

function criaBotaoApagar(li) {
    li.innerHTML += ' ';
    const botaoApagar = document.createElement('button');
    //botaoApagar.type = 'checkbox';
    botaoApagar.innerHTML = 'Apagar';
    botaoApagar.setAttribute('class', 'apagar')
    li.appendChild(botaoApagar);
}



function limpaInput() {
    input.value = '';
    input.focus();
}

function criaTarefa(texto) {
    const li = criaLi();
    li.innerHTML = texto;
    tarefas.appendChild(li);
    criaBotaoApagar(li);
    salvaTarefas();
}
adicionar.addEventListener('click', function(){
    if (!input.value) return;
    criaTarefa(input.value);
    limpaInput();
});

document.addEventListener('click', function(e){
    const el = e.target;
    if(el.classList.contains('apagar')){
        el.parentElement.remove();
        salvaTarefas();
    }
});

function salvaTarefas() {
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        listaDeTarefas.push(tarefaTexto);
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas);
    console.log(tarefasJSON);
    localStorage.setItem('tarefas', tarefasJSON);
}

function adicionaTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);

    for(let tarefa of listaDeTarefas) {
        criaTarefa(tarefa);
    }
}
adicionaTarefasSalvas();

