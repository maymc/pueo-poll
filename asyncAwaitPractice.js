//write a function to retrieve a blob of JSON
//make a ajax request! 'USe the 'fetch' function - available with default JS, part of es2017 starndard library. make ajax requests to arbitrary endpoints from any web server
// use fetch API

// function fetchAlbums() {
//   fetch('https://rallycoding.herokuapp.com/api/music_albums')
//     //fetch returns a promise, the promise is resolved with an object that represents the underlying request. To get a response that the promise is resolved, add a .then
//     .then(res => res.json()) //can get the real json response by calling '.json()' on it. This returns another promise
//     .then(json => console.log(json)); //After getting the json you can do whatever.
//   //2 .then() statements because there are 2 promises
// }

// these 2 work the same way

//Async Await - makes code more legible
async function fetchAlbums() {
  const res = await fetch('https://rallycoding.herokuapp.com/api/music_albums')
  const json = await res.json()

  console.log(json);
}

//using arrow functions
const fetchAlbums = async () => {
  const res = await fetch('https://rallycoding.herokuapp.com/api/music_albums')
  const json = await res.json()

  console.log(json);
}

fetchAlbums();