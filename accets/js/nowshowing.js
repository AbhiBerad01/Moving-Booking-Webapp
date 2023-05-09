let nowShowingMovies = JSON.parse(localStorage.getItem('nowShowingMovies'))||[];
if(nowShowingMovies.length==0)
{

    nowShowingMovies.push({
        Movie_name: "Bholaa" ,
        movie_id : "bholaa",
        Movie_genre: ["Action","Drama"],
        poster_url : "../accets/img/now showing/bhola.jpg"
      });
    nowShowingMovies.push({
        Movie_name: "Evil dead rise" ,
        Movie_genre: ["Horror"],
        movie_id : "evild",
        poster_url:"../accets/img/now showing/evildeadrise.jpg"
      });
    nowShowingMovies.push({
        Movie_name: "Fast X" ,
        Movie_genre: ["Action"],
        movie_id : "fastx",
        poster_url: "../accets/img/now showing/fastX.jpg"
      });
    nowShowingMovies.push({
        Movie_name: "Guardians of the galaxy vol 3" ,
        Movie_genre: ["Action","Drama", "Sci-fi"],
        movie_id : "gog3",
        poster_url : "../accets/img/now showing/gog3.jpg"
      });
    
      // Save the updated cart items to Local Storage
      localStorage.setItem('nowShowingMovies', JSON.stringify(nowShowingMovies));
}
/////////////////// *******  Search movie by name  ********?///////////////////////////////


function searchMovie() {
    let movieInput = document.getElementById('userInput').value;
    let outerBox = document.getElementById('outerBox');
    let box = document.getElementById('box');
    let nowShowingMovies = JSON.parse(localStorage.getItem('nowShowingMovies'))||[];
    //Making all cards hidden
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.display = 'none';
      });

      //If user not enter any this and then search making all cards visible
    if (movieInput == "" ) {
        cards.forEach(card => {
            card.style.display = 'flex';
          });
      }
      //checking names of all movies from database
    for(let i = 0;i<nowShowingMovies.length;i++)
    {

            //If the movie name matched only that card get visible
            if(nowShowingMovies[i].Movie_name.toLowerCase()==movieInput.toLowerCase())
            {
                let temp = document.getElementById(nowShowingMovies[i].movie_id);
                temp.style.display = "flex";
            }

        
    }
}

/////////////////// *******  Search movie using filter  ********?///////////////////////////////

function searchMovieByG()
{
    let nowShowingMovies = JSON.parse(localStorage.getItem('nowShowingMovies'))||[];
    let dropdown = document.getElementById("filterDropdown");
    let selectedValue = dropdown.value;
    const cards = document.querySelectorAll('.card');
        //Making all cards hidden
    cards.forEach(card => {
        card.style.display = 'none';
      });
    var flag =0;
    //If user not enter any this and then search making all cards visible
    if (selectedValue == '#' ) {
        cards.forEach(card => {
            card.style.display = 'flex';
          });
      }
    for(let i = 0;i<nowShowingMovies.length;i++)
    {
        // checking all genres from database that only card will visible
        for(let j=0;j<nowShowingMovies[i].Movie_genre.length;j++)
        {
            // console.log(nowShowingMovies[i].Movie_genre[j]);
            if(nowShowingMovies[i].Movie_genre[j]==selectedValue)
            {
                // console.log(nowShowingMovies[i].movie_id);
                let temp = document.getElementById(nowShowingMovies[i].movie_id);
                temp.style.display = "flex";

            }

        }
    }
}