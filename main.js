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
            nome: novoItem,
            checar: false
        });
        mostrarItem()
    }
}

function mostrarItem(){
    listaDeItens.innerHTML = '';
    itensComprados.innerHTML = '';

    listaDeCompras.forEach((element,index) => {

        if(element.checar){
            const novaLinha = document.createElement('li');
            itensComprados.appendChild(novaLinha);
            novaLinha.innerHTML = `
            <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                <div>
                    <input type="checkbox" checked class="is-clickable" />  
                    <span class="itens-comprados is-size-5">${element.nome}</span>
                </div>
                <div>
                    <i class="fa-solid fa-trash is-clickable deletar" data-deletar></i>
                </div>
            </li>
            `    
        }
        else{
            const novaLinha = document.createElement('li');
            listaDeItens.appendChild(novaLinha);
            novaLinha.innerHTML = `
            <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                <div>
                    <input type="checkbox" class="is-clickable" />
                    <input type="text" class="is-size-5" value="">${element.nome}</input>
                </div>
                <div>
                <i class="fa-regular fa-floppy-disk is-clickable"></i><i class="fa-regular is-clickable fa-pen-to-square editar"></i>
                    <i class="fa-solid fa-trash is-clickable deletar" data-deletar></i>
                </div>
            </li>
            `
        }
        
    })
    
    var listaCheckBox = document.querySelectorAll('input[type="checkbox"]'); 
    listaCheckBox.forEach(e => e.addEventListener("click", event => checkboxClick(event)));

    var listaApagar = document.querySelectorAll('[data-deletar]');
    listaApagar.forEach(e => e.addEventListener("click", event => deletarClick(event)));

    var listaEditar = document.querySelectorAll('.editar');
    listaEditar.forEach(e => e.addEventListener('click', event => editarClick(event)));
}


function checkboxClick(event){
    const nItemClicado = event.target.parentNode.parentNode.dataset.value
    listaDeCompras[nItemClicado].checar = event.target.checked
    mostrarItem();
}

function deletarClick(event){
    const liItemDeletado = event.target.parentNode.parentNode.parentNode
    const nItemDeletado = event.target.parentNode.parentNode.dataset.value
    listaDeCompras.splice(nItemDeletado,1);
    liItemDeletado.remove();
}

function editarClick(event){
    const nItemEditado = event.target.parentElement.parentNode.dataset.value;
    listaDeCompras.splice(nItemEditado,1,{nome:"Leandro", checar: false})
    mostrarItem();
}