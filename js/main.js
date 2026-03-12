import api from "./api.js";

const formulario = document.querySelector(".vehicle-form")

const listMarcas = document.getElementById("marcas");
const listModelos = document.getElementById("modelos");
const listAnos = document.getElementById("anos");

const listaVeiculo = document.querySelector('.result-list')
const btnFavoritar = document.querySelector('.btn-favorite') 

let idMarcas = 0
let idModelos = 0
let idAnos = 0

listMarcas.addEventListener("change", () => {
  apagarTudo();
  listMarcas.disabled = false;
  idMarcas = listMarcas.value;
  exibirModelos();
});

listModelos.addEventListener("change", () => {
  idModelos = listModelos.value;
  exibirAnos();
});

listAnos.addEventListener("change", () => {
  idAnos = listAnos.value;
  apagarVeiculo();
});

formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  exibirVeiculo();
});

btnFavoritar.addEventListener('click', ()=>{
  favoritarCarro()
})

async function exibirMarcas() {

  listMarcas.innerHTML = '<option disabled selected>Selecione a marca do veiculo</option>'

  listModelos.disabled = true
  listAnos.disabled = true

  const colecaoMarcas = await api.marcas();

  colecaoMarcas.forEach((marcas) => {
    const option = document.createElement("option");

    option.value = marcas.codigo;
    option.textContent = marcas.nome;

    listMarcas.append(option);
  });

}

async function exibirModelos() {

  listModelos.disabled = false
  apagarModelos();

  const colecaoModelos = await api.modelo(idMarcas);

  colecaoModelos.modelos.forEach((modelos) => {
    const option = document.createElement("option");

    option.value = modelos.codigo;
    option.textContent = modelos.nome;

    listModelos.append(option);
  });
}

async function exibirAnos() {

  listAnos.disabled = false
  apagarAnos();
    
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

  btnFavoritar.classList.toggle("hidden")

}

async function favoritarCarro(){

  const infoVeiculo = await api.veiculo(idMarcas, idModelos, idAnos)
  
  const veiculo = {IdMarca: idMarcas, IdModelo: idModelos, IdAno: idAnos, Marca: infoVeiculo.Marca, Modelo: infoVeiculo.Modelo, Ano: infoVeiculo.AnoModelo}

  await api.postFavorite(veiculo)

}

function apagarModelos() {
  listModelos.innerHTML = "<option disabled selected>Selecione o modelo do veiculo</option>";
}

function apagarAnos() {
  listAnos.innerHTML = "<option disabled selected>Selecione o ano modelo do veiculo</option>";
}

function apagarVeiculo() {
  listaVeiculo.innerHTML = "";
}

function apagarTudo() {
  listModelos.innerHTML = "<option disabled selected>Selecione o modelo do veiculo</option>";
  listAnos.innerHTML = "<option disabled selected>Selecione o ano modelo do veiculo</option>";
  listaVeiculo.innerHTML = "";
}

exibirMarcas();