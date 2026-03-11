import api from "./api.js";

const formulario = document.querySelector(".vehicle-form")

const listMarcas = document.getElementById("marcas");
const listModelos = document.getElementById("modelos");
const listAnos = document.getElementById("anos");

const listaVeiculo = document.querySelector('.result-list')

async function exibirMarcas() {

  listModelos.innerHTML = ""
  listAnos.innerHTML = ""
  listaVeiculo.innerHTML = ""

  const colecaoMarcas = await api.marcas();

  colecaoMarcas.forEach((marcas) => {
    const option = document.createElement("option");

    option.value = marcas.codigo;
    option.textContent = marcas.nome;

    listMarcas.append(option);
  });
}

let idMarcas = 0
let idModelos = 0
let idAnos = 0

listMarcas.addEventListener('change',()=>{
    idMarcas = listMarcas.value
    exibirModelos()
})

listModelos.addEventListener('change',()=>{
    idModelos = listModelos.value
    exibirAnos()
})

listAnos.addEventListener('change',()=>{
    idAnos = listAnos.value
    apagarVeiculo()
})

formulario.addEventListener("submit", (event)=>{
  event.preventDefault();
  exibirVeiculo()
})

async function exibirModelos() {

  listModelos.innerHTML = ""
    
  const colecaoModelos = await api.modelo(idMarcas);

  colecaoModelos.modelos.forEach((modelos) => {
    const option = document.createElement("option");

    option.value = modelos.codigo;
    option.textContent = modelos.nome;

    listModelos.append(option);
  });
}

async function exibirAnos() {

  listAnos.innerHTML = ""
    
  const colecaoAnos = await api.anos(idMarcas,idModelos);

  colecaoAnos.forEach((anos) => {
    const option = document.createElement("option");

    option.value = anos.codigo;
    option.textContent = anos.nome;

    listAnos.append(option);
  });
}

async function exibirVeiculo() {

  const infoVeiculo = await api.veiculo(idMarcas, idModelos, idAnos);

  listaVeiculo.innerHTML = `<li> Marca do carro: ${infoVeiculo.Marca}</li> <li> Modelo: ${infoVeiculo.Modelo}</li> <li> Combustível: ${infoVeiculo.Combustivel}</li> <li> Preço médio: ${infoVeiculo.Valor}</li>`

}


function apagarVeiculo(){
  listaVeiculo.innerHTML = ""
}


exibirMarcas();