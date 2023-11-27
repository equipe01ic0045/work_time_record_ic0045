interface Location {
  nome: string;
  microrregiao: {
    mesorregiao: {
      UF: {
        nome: string;
      };
    };
  };
}

const fetchData = async (): Promise<Location[]> => {
  const response = await fetch("@/utils/municipios.json"); // Replace with the actual URL
  const data = await response.json();
  return data;
};

export async function getLocations() {
  const jsonData = await fetchData();

  const extractedData = jsonData.map((location) => {
    return {
      nome: location.nome,
      UFNome: location.microrregiao.mesorregiao.UF.nome,
    };
  });

  return extractedData;
}
