const apiKey = 'fec8b5ab27b292a68294261bb21b04a5';
// All api calls go to the this link
const apiBaseUrl = 'http://api.themoviedb.org/3';
// All images use this link
const imageBaseUrl = 'http://image.tmdb.org/t/p/';

const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
$.getJSON(nowPlayingUrl,(movieData)=>{
    // console.log(movieData)
    movieData.results.forEach((movie)=>{
        const posterUrl = `${imageBaseUrl}w300${movie.poster_path}`
        const newHTML = `
            <div class="col-md-2">
            <img class="img" src="${posterUrl}"/>
            </div>
            `
        $('#movie-grid').append(newHTML)
        console.log(movie.id)
    })
})
const detailsUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`
$('#myModal').append(detailsUrl)
let modal = document.getElementById('myModal')
let span = document.getElementsByClassName("close")[0];
$.getJSON(detailsUrl,(movieData)=>{
    movieData.results.forEach((movie)=>{
        const posterUrl = `${imageBaseUrl}w300${movie.poster_path}`
        const newHTML = `
            <div class ="col-3">
                <img src="${posterUrl}"/>
            </div>
        `
        $('#myModal').append(newHTML)
        // $('#myModal').append(`
        //     <td>${movie.title}</td>
        //     `
        // )
    })
    $('.img').click(()=>{
        modal.style.display = "block";
    })
    $(span).click(()=>{
        modal.style.display = "none"
        })
    $(window).click((event)=>{
        if (event.target == modal){
            modal.style.display = "none";
        }
    })

})
        
$('#movie-form').submit((event)=>{
    event.preventDefault();
    const movieSearch = $('#search-input').val();
    // console.log(movieSearch)
    localStorage.setItem('movieList',movieSearch)
    const searchUrl = `${apiBaseUrl}/search/movie?api_key=${apiKey}&query=${movieSearch}`
    let newHTML = '';
    $.getJSON(searchUrl,(movieData)=>{
        movieData.results.forEach((movie)=>{
            const posterUrl = `${imageBaseUrl}w300${movie.poster_path}`
            newHTML += `
            <div class="col-2">
                <img src="${posterUrl}" />
            </div>
            `
        })
        $('#movie-grid').html(newHTML)
    })
})