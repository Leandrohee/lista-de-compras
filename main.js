const formulario = document.getElementById('form-itens');
const listaDeItens = document.getElementById('lista-de-itens');
const itensComprados = document.getElementById('itens-comprados');
var listaDeCompras = []


formulario.addEventListener('submit',event => {
    enviarForm(event)
})

function enviarForm(event){
    event.preventDefault();
    const recebItem = document.getElementById('receber-item');
    const novoItem = recebItem.value.toLowerCase();
    const novoItemF = novoItem.replace(novoItem[0] , novoItem[0].toUpperCase())
    addNovoItem(novoItemF)
}

function addNovoItem(novoItem){
    if(listaDeCompras.some(e => e.nome === novoItem)){
        console.log("ja tem esse item")
    }
    else{ 
        listaDeCompras.push({
            nome: novoItem
        });
        preencherItem()
    }
}

function preencherItem(){
    listaDeItens.innerHTML = '';
    listaDeCompras.forEach((element,index) => {
        const novaLinha = document.createElement('li');
        listaDeItens.appendChild(novaLinha);
        novaLinha.innerHTML = `
        <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
        <div>
            <input type="checkbox" class="is-clickable" />
            <input type="text" class="is-size-5" value="">${element.nome}</input>
        </div>
        <div>
            <i class="fa-solid fa-trash is-clickable deletar" data-deletar></i>
        </div>
         </li>
        `
    })
    
    var listaCheckBox = document.querySelectorAll('input[type="checkbox"]'); 
    listaCheckBox.forEach(e => e.addEventListener("click", event => checkboxClick(event))) 

    var listaApagar = document.querySelectorAll('[data-deletar]');
    listaApagar.forEach(e => e.addEventListener("click", event => deletarClick(event)))
}


function checkboxClick(event){
    const itemComprado =  event.target.parentNode.innerText;

    const novaLinha = document.createElement('li');
    itensComprados.appendChild(novaLinha);
    novaLinha.innerHTML = `
    <li class="item-compra is-flex is-justify-content-space-between" data-value="">
        <div>
            <input type="checkbox" checked class="is-clickable" />  
            <span class="itens-comprados is-size-5"></span>
        </div>
        <div>
            <i class="fa-solid fa-trash is-clickable deletar"></i>
        </div>
    </li>
    `
}

function deletarClick (event){
    const liItemDeletado = event.target.parentNode.parentNode.parentNode
    const nItemDeletado = event.target.parentNode.parentNode.dataset.value
    console.log(nItemDeletado)
    listaDeCompras.splice(nItemDeletado,1);
    liItemDeletado.remove();
}
