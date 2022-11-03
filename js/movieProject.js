// variables and fetch call for random nasa image for jumbotron background idea we don't have to go with it
// const img = document.getElementById("apod");
// let date, start = Date.parse('2021-01-01'), end = new Date();
// end.setDate(end.getDate() - 1);
// const getDate = () => {
//     date = new Date(Math.floor(Math.random() * (end - start + 1) + start)).toISOString().split('T')[0];
//     return date
// };
// fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&start_date=${getDate()}&end_date=${date}`)
//     .then(response => response.json())
//     .then(data => {
//         console.log(data)
//         img.src = data[0].url
//     })
const movieUrl = `https:evening-fortune-cover.glitch.me/movies`
//fetch to our glitch api database
function fetchMovies(){
fetch(movieUrl)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        let html = "";
        for (const datum of data) {
            html += `
            <div class="card">
                <h3>${datum.title}</h3>
                <p>Rating: ${datum.rating}</p>
            </div>
            `
        }
        // format data to html
        // update inner html of #movieDisplay
        $(`#movieDisplay`).html(html);
    });
}
fetchMovies()
$('#movieSubmit').click((e) => {
    e.preventDefault();
    console.log(e)
    let movieName = $('#movieInput').val()
    console.log(movieName)
    let movieRate = $('#movieRating').val()
    console.log(movieRate)
    const movieInfo = {title: movieName, rating: movieRate,}
    const options = {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(movieInfo),};
    fetch(movieUrl,options)
        .then(fetchMovies)
        .catch(error => console.log('Error:',error))
});
