const apiKey = 'b61248c1'; 

async function getApi(title) {
  const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(title)}`;
  try {
    const response = await fetch(apiUrl);

    if (response.status = 404) {
        console.error('Nombre de pelicula no encontrado');
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error al realizar la solicitud:', error);
  }
}

const movies = ["Batman", "The Matrix", "Ted"];

movies.forEach(movie => {
    getApi(movie);
});