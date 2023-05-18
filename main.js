const formulario = document.getElementById('form-itens');
const listaDeItens = document.getElementById('lista-de-itens');
let listaDeCompras = []


formulario.addEventListener('submit',event => {
    enviarForm(event)
})

function enviarForm(event){
    event.preventDefault();
    const recebItem = document.getElementById('receber-item');
    const novoItem = recebItem.value.toLowerCase();
    const novoItemF = novoItem.replace(novoItem[0] , novoItem[0].toUpperCase())
    console.log(novoItemF);
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
            <i class="fa-solid fa-trash is-clickable deletar"></i>
        </div>
         </li>
        `
    })  
}
