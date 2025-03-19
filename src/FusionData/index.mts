import fetch from "node-fetch"; 

const calcularDistancia = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371;
  const toRadians = (deg: number) => deg * (Math.PI / 180);
  
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  return R * c;
};

  const getPersonajes = async () => {
    try {
      const response = await fetch("https://hf33no971k.execute-api.us-east-1.amazonaws.com/Prod/listPersonajes");
      const data = await response.json();
      return data
    } catch (error) {
      return false
    }
  }

  const getPlanetas = async () => {
    try {
      const response = await fetch("https://hf33no971k.execute-api.us-east-1.amazonaws.com/Prod/listPlanetas");
      const data = await response.json();
      return data
    } catch (error) {
      return false
    }
  }

  const getFusion = async (id:number) => {
    try {
      const response = await fetch(`https://hf33no971k.execute-api.us-east-1.amazonaws.com/Prod/getFusion?id=${id}`);
      const data = await response.json();
      return data
    } catch (error) {
      return false
    }
  }

  const createFusion = async (bodyData) => {
    try {
      const response = await fetch("https://hf33no971k.execute-api.us-east-1.amazonaws.com/Prod/createDataFusion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bodyData)
      });
  
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
  
    } catch (error) {
      console.error("Error en la petición POST:", error);
      throw error;
    }
  }

export const handler = async () => {
  try {

    const personajes:any = await getPersonajes()
    const planetas:any = await getPlanetas()

    let fusionados: any[] = [];
    for (let personaje of personajes.data) {
      const validarExistencia:any = await getFusion(personaje.id)
      if(validarExistencia.statusCode!=200){
        let planetaMasCercano = null;
        let distanciaMinima = Infinity;

        for (let planeta of planetas.data) {

          const distancia = calcularDistancia(
            parseFloat(personaje.latitud),
            parseFloat(personaje.longitud), 
            parseFloat(planeta.latitud), 
            parseFloat(planeta.longitud)
          );

          if (distancia < distanciaMinima) {
            distanciaMinima = distancia;
            planetaMasCercano = planeta;
          }
        }

        let fusion = {
          id: personaje.id,
          personaje: personaje.name,
          latitud: personaje.latitud,
          longitud: personaje.longitud,
          planetaMasCercano: planetaMasCercano ? planetaMasCercano.name : "Desconocido",
          clima: planetaMasCercano ? planetaMasCercano.climate : "Sin información",
          distancia_km: distanciaMinima.toFixed(2),
        };
        await createFusion(fusion)
        fusionados.push(fusion);
      }else{
        fusionados.push(validarExistencia)
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Datos fusionados correctamente",
        data: fusionados,
      }),
    };
  } catch (error) {
    console.error("Error fusionando datos:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error al fusionar datos",
        error: error.message,
      }),
    };
  }
};
