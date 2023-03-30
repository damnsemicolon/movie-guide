let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

// function to open google search for actor name
const searchActor = (event) => {
    event.preventDefault();
    const actorName = event.target.innerHTML;
    const googleSearchUrl = `https://www.google.com/search?q=${actorName}`;
    window.open(googleSearchUrl, "_blank");
};

// function to fetch data from api
let getMovie = () => {
    let movieName = movieNameRef.value;
    let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;

    // if input field is empty
    if (movieName.length <= 0) {
        result.innerHTML = `<h3 class="msg">Please enter a movie name </h3>`;
    }

    // if input isn't empty
    else {
        fetch(url)
            .then((resp) => resp.json())
            .then((data) => {
                // if movie exist in database
                if (data.Response == "True") {
                    result.innerHTML = `
                        <div class="info">
                            <img src=${data.Poster} class="poster">
                            <div>
                                <h2>${data.Title}</h2>
                                <div class="rating">
                                    <img src="imdb.png">
                                    <h4>${data.imdbRating}</h4>
                                </div>
                                <div class="details">
                                    <span>${data.Rated}</span>
                                    <span>${data.Year}</span>
                                    <span>${data.Runtime}</span>
                                </div>
                                <div class="genre">
                                    <div>${data.Genre.split(",").join("</div><div>")}</div>
                                </div>
                            </div>
                        </div>
                        <h3>Plot:</h3>
                        <p>${data.Plot}</p>
                        <h3>Cast:</h3>
                        <p>${data.Actors.split(",").map((actor) => `<span class="actor" onclick="searchActor(event)" onmouseover="this.style.cursor='pointer'">${actor.trim()}</span>`).join(", ")}</p>
                    `;
                }

                // if movie doesn't exist in database
                else {
                    result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
                }
            })
            // if error occurs
            .catch(() => {
                result.innerHTML = `<h3 class="msg">Error Occured</h3>`;
            });
    }
};

searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);
