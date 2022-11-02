// variables and fetch call for random nasa image for jumbotron background idea we don't have to go with it
const img = document.getElementById("apod");
let date, start = Date.parse('2021-01-01'), end = new Date();
end.setDate(end.getDate() - 1);
const getDate = () => {
    date = new Date(Math.floor(Math.random() * (end - start + 1) + start)).toISOString().split('T')[0];
    return date
};
fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&start_date=${getDate()}&end_date=${date}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        img.src = data[0].url

    })

//fetch to our glitch api database
fetch(`https:playful-future-durian.glitch.me/movies`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
