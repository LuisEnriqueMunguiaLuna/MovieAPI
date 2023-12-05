const apiKey = 'b61248c1'; 

document.getElementById("movieForm").addEventListener("click", () => {
  getApi();

});

async function getApi(title) {
  const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(title)}`;
  try {
    const response = await fetch(apiUrl);

    if (response.status == 404) {
        console.error('Nombre de pelicula no encontrado');
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error al realizar la solicitud:', error);
  }
}

const movies = ["Batman", "The Matrix", "Ted", "Cars 2", "La Monja 2", "Anabel", "John Wick 4", "The flash", "Avatar 2", "Sonic 2", "Hulk", "Transformers", "Scary Movie", "Terrifier"];

movies.forEach(movie => {
    getApi(movie);
});