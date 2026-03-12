const api = {

  async marcas() {
    try {
      const response = await fetch(
        "https://parallelum.com.br/fipe/api/v1/carros/marcas"
      );

      return await response.json();

    } catch (error) {
      console.error("Erro ao buscar marcas");
    }
  },

  async modelo(idMarca) {
    try {

      const response = await fetch(
        `https://parallelum.com.br/fipe/api/v1/carros/marcas/${idMarca}/modelos`
      );

      return await response.json();

    } catch (error) {
      console.error("Erro ao buscar modelos");
    }
  },

  async anos(idMarca, idModelo) {
    try {

      const response = await fetch(
        `https://parallelum.com.br/fipe/api/v1/carros/marcas/${idMarca}/modelos/${idModelo}/anos`
      );

      return await response.json();

    } catch (error) {
      console.error("Erro ao buscar anos:");
    }
  },

  async veiculo(idMarca, idModelo, idAno) {
    try {

      const response = await fetch(
        `https://parallelum.com.br/fipe/api/v1/carros/marcas/${idMarca}/modelos/${idModelo}/anos/${idAno}`
      );

      return await response.json();

    } catch (error) {
      console.error("Erro ao buscar veículo:");
    }
  },

  async postFavorite(veiculo) {
    try {
      const response = await fetch(
        "http://localhost:3000/favorite_car",{
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(veiculo)
        }
      );

      return response.json()

    } catch {
      console.error("Erro ao favoritar o veiculo");
    }
  },

};

export default api;
