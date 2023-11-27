import axios from "axios";

export default class LocationService {
  public static async getCities() {
    const result = await axios.get(
      "https://servicodados.ibge.gov.br/api/v1/localidades/municipios"
    );

    return result.data.map((location: any) => {
      return `${location.nome}, ${location.microrregiao.mesorregiao.UF.nome}`;
    });
  }
}
