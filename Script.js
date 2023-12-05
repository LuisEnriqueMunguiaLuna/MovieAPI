const apiKey = "b61248c1";
const movieArray = [];

document.getElementById("search").addEventListener("click", () => {
  displayMovie();
  document.getElementById("movie-input").value = "";
  document.getElementById("sortMovies-container").innerHTML = "";
});

document.getElementById("sort").addEventListener("click", () => {
  document.getElementById("movie-container").innerHTML = "";
  sortMovies();
});

document.getElementById("reset").addEventListener("click", () => {
  document.getElementById("movie-container").innerHTML = "";
  document.getElementById("sortMovies-container").innerHTML = "";
  disableElements(true);
});

async function displayMovie() {
  const movieName = document.getElementById("movie-input").value;
  if (!movieName) {
    showAlert("Favor de escribir un nombre");
    disableElements(true);
    return;
  } else {
    document.getElementById("message-alert").innerHTML = "";
    disableElements(false);
  }
  const movie = await getApi(movieName);
  addMovie(movie);
}

async function getApi(title) {
  const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(
    title
  )}`;
  try {
    const response = await fetch(apiUrl);

    const data = await response.json();
    console.log(data);

    if (data.Response == "False") {
      console.error("Nombre de pelicula no encontrado");
      showAlert("Nombre de pelicula no encontrado");
      disableElements(true);
      return;
    }

    return data;
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
    return;
  }
}

function addMovie(movie) {
  movieArray.push(movie);
  const movieList = document.getElementById("movie-container");
  const element = document.createElement("div");
  element.classList.add("col-3");
  element.innerHTML = `
   <div class="card border-primary mb-5 mx-auto" style="width: 18rem;">
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
           <br>
           <strong>Sinopsis </strong>${movie.Plot} 
           </div>
         
    </div>
   </div>            

`;
  movieList.appendChild(element);
}

function sortMovies() {
  const sortMoviesContainer = document.getElementById("sortMovies-container");
  sortMoviesContainer.innerHTML = "";
  movieArray.sort((a, b) => {
    return a.Year - b.Year;
  });
  movieArray.forEach((movie) => {
    const element = document.createElement("div");
    element.classList.add("col-3");
    element.innerHTML = `
      <div class="card border-primary mb-3 mx-auto" style="width: 18rem;">
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
              <br>
              <strong>Sinopsis </strong>${movie.Plot} 
              </div>
       </div>
      </div> `;
    sortMoviesContainer.appendChild(element);
  });
}

function disableElements(status) {
  document.getElementById('sort').disabled = status;
  document.getElementById('reset').disabled = status;
}

function showAlert(message) {
  document.getElementById("message-alert").innerHTML = "";
  const movieAlert = document.getElementById("message-alert");
  const element = document.createElement("div");
  element.innerHTML = `
      <h2>--${message}--</h2>
  `;
  movieAlert.appendChild(element);
}

/////////// - - - - //////////

const arrayMovies = [
  "Batman",
  "asdadasdas",
  "The Matrix",
  "Ted",
  "Cars 2",
  "La Monja 2",
  "Anabel",
  "John Wick 4",
  "The Flash",
  "Avatar",
  "Sonic the Hedgehog",
  "Hulk",
  "Transformers",
  "Scary Movie",
  "Terrifier",
  "Jurassic Park",
  "Inception",
  "The Godfather",
  "Forrest Gump",
  "Pulp Fiction",
  "Titanic",
  "The Shawshank Redemption",
  "The Dark Knight",
  "Spider-Man: No Way Home",
  "Wonder Woman",
  "Black Panther",
  "Toy Story",
  "The Lion King",
  "The Avengers",
  "Frozen",
  "The Incredibles",
  "Harry Potter and the Sorcerer's Stone",
  "The Lord of the Rings: The Fellowship of the Ring",
  "Star Wars: Episode IV - A New Hope",
  "Back to the Future",
  "E.T. the Extra-Terrestrial",
  "Indiana Jones and the Last Crusade",
  "The Terminator",
  "The Shining",
  "The Silence of the Lambs",
  "The Matrix Reloaded",
  "The Matrix Revolutions",
  "Jurassic World",
  "Mad Max: Fury Road",
  "Guardians of the Galaxy",
  "The Revenant",
  "Interstellar",
  "Avengers: Endgame",
  "Django Unchained",
  "The Social Network",
  "Fight Club",
  "The Sixth Sense",
];

const selectElement = document.getElementById('select-genre');
const movieList = document.getElementById('arrayMovies-container');
const movieElements = [];

async function getAndDisplayMoreMovies() {
  for (const movieTitle of arrayMovies) {
    const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(movieTitle)}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.Response === "False") {
        console.error(`Nombre de película no encontrado: ${movieTitle}`);
        continue;
      }

      const element = document.createElement("div");
      element.classList.add("col-2");
      element.dataset.genre = data.Genre;
      element.innerHTML = `
        <div class="card border-primary mb-5 mx-auto" style="width: 18rem;">
          <img src="${data.Poster}" class="card-img-top" alt="...">
          <div class="card-body">
            <div class="card-title">
              <strong>Titulo </strong>${data.Title}
              <br>
              <strong>Año </strong>${data.Year}  
              <br>
              <strong>Lenguaje </strong>${data.Language}
              <br>  
              <strong>Genero </strong>${data.Genre}
              <br> 
              <strong>Clasificacion </strong>${data.Rated}
              <br>
              <strong>Sinopsis </strong>${data.Plot} 
            </div>
          </div>
        </div>
      `;
      movieElements.push(element);
    } catch (error) {
      console.error(
        `Error al realizar la solicitud para ${movieTitle}:`,error);
    }
  }
    movieElements.forEach((element) => {
    movieList.appendChild(element);
  });
}

getAndDisplayMoreMovies();

function filterMoviesBasedOnGenre(selectedGenre) {
  movieList.innerHTML = '';

  const filteredMovies = movieElements.filter((movieElement) => {
    return selectedGenre === '[-------]' || movieElement.dataset.genre.includes(selectedGenre);
  });

  filteredMovies.forEach((element) => {
    movieList.appendChild(element);
  });
}

selectElement.addEventListener('change', () => {
  const selectedGenre = selectElement.value;
  filterMoviesBasedOnGenre(selectedGenre);
});
