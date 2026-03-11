const api = {

  async marcas() {
    try {
      const response = await fetch(
        "https://parallelum.com.br/fipe/api/v1/carros/marcas"
      );

      return await response.json();

    } catch (error) {
      console.error("Erro ao buscar marcas:", error);
    }
  },

  async modelo(idMarca) {
    try {

      const response = await fetch(
        `https://parallelum.com.br/fipe/api/v1/carros/marcas/${idMarca}/modelos`
      );

      return await response.json();

    } catch (error) {
      console.error("Erro ao buscar modelos:", error);
    }
  },

  async anos(idMarca, idModelo) {
    try {

      const response = await fetch(
        `https://parallelum.com.br/fipe/api/v1/carros/marcas/${idMarca}/modelos/${idModelo}/anos`
      );

      return await response.json();

    } catch (error) {
      console.error("Erro ao buscar anos:", error);
    }
  },

  async veiculo(idMarca, idModelo, idAno) {
    try {

      const response = await fetch(
        `https://parallelum.com.br/fipe/api/v1/carros/marcas/${idMarca}/modelos/${idModelo}/anos/${idAno}`
      );

      return await response.json();

    } catch (error) {
      console.error("Erro ao buscar veículo:", error);
    }
  }

};

export default api;
