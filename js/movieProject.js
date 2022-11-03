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
            let titleString = datum.title.replace(" ", "-");
            let cardID = `movie${datum.id}`
            html += `
            <div class="card" id=${cardID}>
                <h3>${datum.title}</h3>
                <p>Rating: ${datum.rating}</p>
                <button class="btn btn-primary edit" data-id="${datum.id}" >Edit</button>
                <button class="btn btn-primary delete"  id="delete${titleString}" onclick="clickTester()">Delete</button>
            </div>
            `
        }
        // format data to html
        // update inner html of #movieDisplay
        $(`#movieDisplay`).html(html);


    })
    .then(()=> {
        let editButtons = document.querySelectorAll(".edit");
        editButtons.forEach((btn) =>{
            let btnId= btn.getAttribute('data-id');
            btn.addEventListener("click", editMovieFields);
        });
        // attach event listener
        // create input fields
        // change edit -> submit
        // update call CRUD
        // Fetch to update the shown movies fetchMovies()
        });

}
fetchMovies()

// --------------- Add New Movie ---------------
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

// --------------- Edit Button ---------------

// when any `edit` button is clicked:
// change inner html elements to <h3><input placeholder= datum.title></h3>
// change edit button text to "update"
// disable all other edit and delete buttons
// on update.click => create new body object

function clickTester (){
    console.log("I got clicked");
}

function editMovieFields(element){
    // inside <h3> create an input type text with placeholder as movie title
    // select element for movie rating with current rating selected
    // change edit button to submit button
    console.log(element.target.attributes[1].nodeValue);
    let btnId = element.target.attributes[1].nodeValue;
}