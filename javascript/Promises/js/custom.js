var page = 1;
var url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=${ page }`;

const movies = async (APIURL) => {
    var moviesData = await fetch(APIURL);
    moviesData = await moviesData.json();
    displayMovies(moviesData.results);
}

movies(url);

function displayMovies(movieData){
    var data = document.getElementById('movies').innerHTML;
    movieData.forEach((v,i) => {
        data += `
            <div class="items">
                <div>
                    <img src="https://image.tmdb.org/t/p/w1280${ v.poster_path }"/>
                </div>
                <h2>${ v.original_title }</h2>
            </div>
        `;
    });

    document.getElementById('movies').innerHTML = data;
}

document.getElementById('loadmore').addEventListener('click', () => {
    page++;
    var url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=${ page }`;
    movies(url);
});