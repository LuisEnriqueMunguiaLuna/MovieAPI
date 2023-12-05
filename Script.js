const apiKey = 'b61248c1';
const movieArray = [];

document.getElementById("search").addEventListener('click', () => {
  displayMovie();
  document.getElementById('movie-input').value = '';
});

document.getElementById("sort").addEventListener('click', () => {
  sortMovies()
  document.getElementById('movie-container').innerHTML = '';
});

async function displayMovie() {
  const movieName = document.getElementById('movie-input').value;
  if (!movieName) {
    alert("Favor de escribir un nombre.")
    return;
  }
  const movie = await getApi(movieName);
  addMovie(movie);
}

async function getApi(title) {
  const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(title)}`;
  try {
    const response = await fetch(apiUrl);

    const data = await response.json();
    console.log(data);

    if (data.Response == "False") {
      console.error('Nombre de pelicula no encontrado');
      return;
    }

    return data;
  } catch (error) {
    console.error('Error al realizar la solicitud:', error);
    return;
  }
}

function addMovie(movie) {
  movieArray.push(movie);
  const movieList = document.getElementById('movie-container');
  const element = document.createElement('div');
  element.classList.add('col-4');
  element.innerHTML = `
   <div class="card border-primary mb-3" style="width: 18rem;">
       <img src="${movie.Poster}" class="card-img-top" alt="...">
       <div class="card-body row ">
           <div class="card-title">
           <strong>Titulo </strong>${movie.Title}
           <br>
           <strong>Año </strong>${movie.Year}  
           <br>
           <strong>Lenguaje </strong>${movie.Language}
           <br>  
           <strong>Genero </strong>${movie.Genre}
           <br> 
           <strong>Clasificacion </strong>${movie.Rated}
           </div>
         
    </div>
   </div>            

`;
  movieList.appendChild(element);
}

function sortMovies() {
  const sortMoviesContainer = document.getElementById('sortMovies-container');
  sortMoviesContainer.innerHTML = '';
  movieArray.sort((a, b) => {
    return a.Year - b.Year;
  });
  movieArray.forEach((movie) => {
    const element = document.createElement('div');
    console.log(movie);
      element.innerHTML = `
      <div class="card border-primary mb-3" style="width: 18rem; justify-content: center;">
          <img src="${movie.Poster}" class="card-img-top" alt="...">
          <div class="card-body">
              <div class="card-title">
              <strong>Titulo </strong>${movie.Title}
              <br>
              <strong>Año </strong>${movie.Year}
              <br>  
              <strong>Lenguaje </strong>${movie.Language}  
              <br>
              <strong>Genero </strong>${movie.Genre} 
              <br>
              <strong>Clasificacion </strong>${movie.Rated}
              </div>
            
       </div>
      </div> `;
    sortMoviesContainer.appendChild(element);
  });
}


// const comedyMovies = ["Batman", "The Matrix", "Ted", "Cars 2", "La Monja 2", "Anabel", "John Wick 4", "The flash", "Avatar 2", "Sonic 2", "Hulk", "Transformers", "Scary Movie", "Terrifier"];

// movies.forEach(movie => {
//     getApi(movie);
// });
