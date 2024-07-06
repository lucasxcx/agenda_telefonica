const agenda = document.getElementById('form')
const incluirNumero = [];
const incluirNome = [];
const tabela = document.querySelector ('tbody');

let linhas = '';


function formatarNumero(numero) {
    const cleaned = ('' + numero).replace(/\D/g, '');

    
    const match = cleaned.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);

    if (match) {
        let numeroFormatado = '';
        if (match[1]) {
            numeroFormatado += '(' + match[1];
        }
        if (match[2]) {
            numeroFormatado += ') ' + match[2];
        }
        if (match[3]) {
            numeroFormatado += '-' + match[3];
        }
        return numeroFormatado.trim(); 
    }
    return numero; 
    }
agenda.addEventListener('submit', function(e) {
    e.preventDefault();

    adicionarLinha();
});

function adicionarLinha(){
    const numero = document.getElementById('numero');
    const nome = document.getElementById('nome');

    

    let numeroFormatado = formatarNumero(numero.value);

    if(incluirNumero.includes(numeroFormatado)){
        alert ("Esse numero ja foi salvo!")
    } else {

    incluirNumero.push(numeroFormatado);
    incluirNome.push(nome.value);    

    if (numero.value.length !== 11){
        alert("Por favor digite o DDD + o número completo com 9 dígitos");
    } else {
    
    let linha = '<tr>';

    linha += `<td>${numeroFormatado}</td>`;
    linha += `<td>${nome.value}</td>`;
    linha += `<td><button class="btn-excluir" onclick="excluirContato(this)">Excluir</button></td>`;
    linha += '</tr>'; 

    linhas += linha; 
    }
    
    nome.value = '';
    numero.value = '';
    
    tabela.innerHTML = linhas;  
}}

function excluirContato(botao) {
    const linhaExcluir = botao.closest('tr'); 
    const index = Array.from(tabela.children).indexOf(linhaExcluir);
    
    if (index !== -1) {
        incluirNumero.splice(index, 1);
        incluirNome.splice(index, 1);
        linhas = linhas.replace(linhaExcluir.outerHTML, ''); // Remove a linha da string linhas
        tabela.innerHTML = linhas; // Atualiza a tabela sem a linha removida
    }
    
    linhaExcluir.remove();
}




