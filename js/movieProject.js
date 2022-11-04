
const movieUrl = `https:evening-fortune-cover.glitch.me/movies`

let sortType = "id" // this thing is updated with a drop down menu
$(`.sortType`).click(function() {
    sortType = $(this).attr("data-sorttype");
    console.log(sortType);
    fetchMovies();
})
$(`#searchField`).keyup(function() {
    sortType = "search"
    console.log("hello from on change");
    fetchMovies();
})

//fetch to our glitch api database
function fetchMovies() {
    fetch(movieUrl)
        .then(response => response.json())
        .then(data => {
            let newDataArray = [];
            let html = "";
            // sort here
            switch(sortType){
                case "title" :
                    data.sort((a, b) => a.title.localeCompare(b.title)>0? 1 : -1);
                    break;
                case "rating" :
                    data.sort((a, b) => a.rating > b.rating ? -1 : 1);
                    break;
                case "genre":
                    data.sort((a, b) => a.genre.localeCompare(b.genre)>0? 1 : -1)
                    break;
                case "search":
                    console.log("hello from search");
                    newDataArray = data.filter((e)=>{
                        let inputText = $(`#searchField`)[0].value.toLowerCase();
                        let title = e.title.toLowerCase() + e.rating + e.genre.toLowerCase();
                        if(title.includes(inputText)){
                            return true
                        } else {
                            return false;
                        }
                        // add element t onewData if element.startwith(inputText)
                        // somehow get this new array displayed
                    })
                    /* search by text
                    * when search input changes state:
                    * use filter to create a new array from data
                    * display new data list*/
                default:
                    break;
            }
            console.log(data);
            let sortedData = sortType === "search"? newDataArray: data;
            for (const datum of sortedData) {
                let titleString = datum.title.replace(" ", "-");
                let cardID = `movie${datum.id}`
                html += `
            <div class="card bg-transparent" id=${cardID}>
                <h3>${datum.title}</h3>
                <p>Rating: ${datum.rating}</p>
                <p>Genre: ${datum.genre}</p>
                <div class="d-flex">
                <button class="btn btn-secondary edit" data-id="${datum.id}" >Edit</button>
                <button class="btn btn-secondary delete"  data-id="${datum.id}" id="delete${titleString}">Delete</button>
                </div>
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
    let movieGenre = $('#genreAdd')
    let movieName = movieAdd.val();
    let movieRate = movieRating.val();
    let genreVal = movieGenre.val();
    movieAdd.val('');
    // document.getElementById(`#movieRating`).reset();
    const movieInfo = {title: movieName, rating: movieRate, genre: genreVal}
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
    let genre = $(`#movie${btnId} > p`).last().html().slice(7)
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
            <p><input type="text" class="form-control" id="genreEdit" placeholder="Edit: ${genre}" aria-describedby="genreEdit"></p>
<!--            add select here for editing genre-->
                <button class="btn btn-primary edit" id="update">Update</button>
                </div>
            `)

    $('#update').click((e) => {
        let updateBtn = $(`#update`)
        updateBtn.attr('disabled', true);
        let editInfo = $('#editInput')
        let ratingInfo = $('#movieRatingEdit')
        let genreEdit = $('#genreEdit')
        fetch(movieUpdateUrl, {
            method: 'PUT', body: JSON.stringify({
                title: `${editInfo[0].value}`,
                rating: `${ratingInfo[0].selectedIndex}`,
                genre: `${genreEdit[0].value}`,
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
/*add a selector for adding genre in the add a movie
* add a selector in the edit function for editing the genre
* add the genre to the displayed movie cards
* add sort functionality for genre, name, rating in nav bar with the add movie modal button */

