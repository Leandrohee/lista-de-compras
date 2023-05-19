const formulario = document.getElementById('form-itens');                                               //Localizando a tag HTML form
const listaDeItens = document.getElementById('lista-de-itens');                                         //Localizando a tag HTML ul lista de itens
const itensComprados = document.getElementById('itens-comprados');                                      //Localizando a tag HTML ul lista de itens comprados
const itensRecuperados = localStorage.getItem('listaDeItens');                                          //Criando uma constante para receber a string do LocalStorage
var listaDeCompras = []                                                                                 //Array criado para armazenar itens de compra em forma de objetos

function atualizaLocalStorage(){                                                                        //Envia a lista de Compras para o LocalStorage
    localStorage.setItem('listaDeItens',JSON.stringify(listaDeCompras));
}

if(itensRecuperados){                                                                                   //Se a constante de retorno do LocalStorage tiver algo atualiza a lista de compras
    listaDeCompras = JSON.parse(itensRecuperados);
    mostrarItem();
}

formulario.addEventListener('submit',event => {                                                         //Cria uma função "enviarForm" para quando o botao Salvar é precionado 
    enviarForm(event)
})

function enviarForm(event){                                                                                      
    event.preventDefault();                                                                             //Previne o formulário de atualizar e apagar o input
    const recebItem = document.getElementById('receber-item');                                          //ecebe a palavra escrita no campo input do formulário   
    const novoItem = recebItem.value.toLowerCase();                                                     //Coloca todas as palavras do input para minusculo
    const novoItemF = novoItem.replace(novoItem[0] , novoItem[0].toUpperCase())                         //Coloca somente a primeira letra do input para maiusculo
    addNovoItem(novoItemF)                                                                              //Chama a função "addNovoItem" que adciona a palavra escrita para a lista de compras
}

function addNovoItem(novoItem){
    if(listaDeCompras.some(e => e.nome === novoItem)){                                                  //Se o nome digitado já existir na lista n acontece printa no console "ja tem esse item"
        console.log("ja tem esse item")
    }
    else{                                                                                               //Se o nome digitado nao existir na lista add ele na lista   
        listaDeCompras.push({
            nome: novoItem,                                                                             
            checar: false                                                                               //Esse checar é somente para verificar o campo check a esquerda do nome
        });
        mostrarItem()
    }
}

function mostrarItem(){                                                                                 //A funcao "mostrarItem" é atualizada toda vez que: um item novo é add | um item é deletado | um item é comprado | um item é editado | quando o site é carregado
    listaDeItens.innerHTML = '';                                                                        //Apaga a ul lista de itens para nao duplicar
    itensComprados.innerHTML = '';                                                                      //Apaga a ul itens comprados para nao duplicar

    listaDeCompras.forEach((element,index) => {                                                         //Para cada elemento da lista

        if(element.checar){                                                                             //Se checar = true entao item comprado
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
        else{                                                                                         //Se checar = false entao item adicionado | editado | página carregada
            const novaLinha = document.createElement('li');
            listaDeItens.appendChild(novaLinha);
            novaLinha.innerHTML = `
            <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                <div>
                    <input type="checkbox" class="is-clickable" />
                    <input type="text" class="is-size-5" value="${element.nome}"></input>
                </div>
                <div>
                    <i class="fa-regular is-clickable fa-pen-to-square editar"></i>
                    <i class="fa-solid fa-trash is-clickable deletar" data-deletar></i>
                </div>
            </li>
            `
        }
        
    })
    
    var listaCheckBox = document.querySelectorAll('input[type="checkbox"]');                        //Adcionado escutador click no checkBox que chama a funcao "checkBoxClick"
    listaCheckBox.forEach(e => e.addEventListener("click", event => checkboxClick(event)));

    var listaApagar = document.querySelectorAll('[data-deletar]');                                  //Adcionado escutador click no icone lixeira que chama a funcao "deletarClick"
    listaApagar.forEach(e => e.addEventListener("click", event => deletarClick(event)));

    var listaEditar = document.querySelectorAll('.editar');                                         //Adcionado escutador click no icone editar que chama a funcao "editarlick"
    listaEditar.forEach(e => e.addEventListener('click', event => editarClick(event)));

    atualizaLocalStorage();
}


function checkboxClick(event){                                                                      //Essa funcao troca o checar de false para true e chama a funcao mostrarItem para atualizar
    const nItemClicado = event.target.parentNode.parentNode.dataset.value;
    listaDeCompras[nItemClicado].checar = event.target.checked;
    mostrarItem();
}

function deletarClick(event){                                                                       //Essa funcao deleta o li referente da lista de compra e chama a funcao mostrarItem para atualizar
    const nItemDeletado = event.target.parentNode.parentNode.dataset.value;
    listaDeCompras.splice(nItemDeletado,1);
    mostrarItem();
}

function editarClick(event){                                                                        //Essa funcao atualiza a edicao feita no input e chama a funcao mostrarItem para atualizar
    const nItemEditado = event.target.parentElement.parentNode.dataset.value;               
    const itemEditado = event.target.parentNode.parentNode.querySelector('[type=text]').value;
    listaDeCompras.splice(nItemEditado,1,{nome:`${itemEditado}`, checar: false});
    mostrarItem();
}