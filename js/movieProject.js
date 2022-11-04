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
function fetchMovies() {
    fetch(movieUrl)
        .then(response => response.json())
        .then(data => {
            let html = "";
            for (const datum of data) {
                let titleString = datum.title.replace(" ", "-");
                let cardID = `movie${datum.id}`
                html += `
            <div class="card" id=${cardID}>
                <h3>${datum.title}</h3>
                <p>Rating: ${datum.rating}</p>
                <button class="btn btn-primary edit" data-id="${datum.id}" >Edit</button>
                <button class="btn btn-primary delete"  data-id="${datum.id}" id="delete${titleString}">Delete</button>
            </div>
            `
            }
            // format data to html
            // update inner html of #movieDisplay
            $(`#movieDisplay`).html(html);


        })
        .then(() => {
            let editButtons = document.querySelectorAll(".edit");
            editButtons.forEach((btn) => {
                btn.addEventListener("click", editMovieFields);
            });
            // attach event listener
            // create input fields
            // change edit -> submit
            // update call CRUD
            // Fetch to update the shown movies fetchMovies()

            // Delete Buttons
            let deleteButtons = document.querySelectorAll(".delete");
            deleteButtons.forEach((btn) => {
                btn.addEventListener("click", deleteMovie);
            });

        })
        .catch((err) => console.log("fetchMovies error: ", err));

}

fetchMovies()

// --------------- Add New Movie ---------------
$('#movieSubmit').click((e) => {
    e.preventDefault();
    let movieSubmitBtn = $(`#movieSubmit`)
    movieSubmitBtn.attr('disabled', true);

    let movieAdd = $('#movieAdd')
    let movieRating = $('#movieRating')
    let movieName = movieAdd.val();
    let movieRate = movieRating.val()
    movieAdd.val('');
    // document.getElementById(`#movieRating`).reset();
    const movieInfo = {title: movieName, rating: movieRate,}
    const options = {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(movieInfo),};
    if(movieName === "")
    {
        movieSubmitBtn.attr('disabled', false)
    }else{

    fetch(movieUrl, options)
        .then(fetchMovies)
        .then(() => movieSubmitBtn.attr('disabled', false))// remove disabled attribute
        .catch(error => console.log('Add new Movie Error: ', error))
}});

// --------------- Edit Button ---------------

// when any `edit` button is clicked:
// change inner html elements to <h3><input placeholder= datum.title></h3>
// change edit button text to "update"
// disable all other edit and delete buttons
// on update.click => create new body object


function editMovieFields(element) {
    // inside <h3> create an input type text with placeholder as movie title
    // select element for movie rating with current rating selected
    // change edit button to submit button

    let btnId = element.target.attributes[1].nodeValue;
    let title = $(`#movie${btnId} > h3`).html()
    let movieUpdateUrl = `https:evening-fortune-cover.glitch.me/movies/${btnId}`
    $(`#movie${btnId}`).html(`
            <div class="card" id=${btnId}>
                <h3><input type="text" class="form-control" placeholder="Edit: ${title}" id="editInput" aria-describedby="movieAdd"></h3>
                <select id="movieRatingEdit" class="form-select" aria-label="movieRating">
                <option selected>Re-Rate your movie</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
                <option value="4">Four</option>
                <option value="5">Five</option>
            </select>
                <button class="btn btn-primary edit" id="update">Update</button>
                </div>
            `)

    $('#update').click((e) => {
        let updateBtn = $(`#update`)
        updateBtn.attr('disabled', true);
        let editInfo = $('#editInput')
        let ratingInfo = $('#movieRatingEdit')
        fetch(movieUpdateUrl, {
            method: 'PUT', body: JSON.stringify({
                title: `${editInfo[0].value}`,
                rating: `${ratingInfo[0].selectedIndex}`,
                id: `${btnId}`
            }), headers: {'Content-Type': 'application/json'},
        })
            .then(fetchMovies)
            .catch((err) => console.log("Error in movieUpdate: ", err))
    })
}

function deleteMovie(element) {
    let btnId = element.target.attributes[1].nodeValue;
    let movieDeleteUrl = `https:evening-fortune-cover.glitch.me/movies/${btnId}`;
    fetch(movieDeleteUrl, {method: 'DELETE',})
        .then(fetchMovies)
        .catch((err) => console.log("Error in deleteMovie", err));
}