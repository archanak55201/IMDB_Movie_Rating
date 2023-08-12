// const api_key="a20ad9eb";
// const api_key="a20ad9eb1";

// console.log("connected");
console.log("a20ad9eb");
const api_key = document.getElementById("inputapi").value;
// console.log(api_key);

const searchinput = document.getElementById("searchstring");
// console.log(searchinput);

const loader = document.getElementsByClassName("loader")[0];
// console.log(loader);

const allcards = document.getElementsByClassName("all-cards")[0];
// console.log(allcards);
const SEARCH_TERM = "";
searchinput.addEventListener("keydown",function(event) {
  if (event.keyCode === 13 || event.key === 'Enter') {
        event.preventDefault();
        const api_key = document.getElementById("inputapi").value;
        // console.log(api_key);
        loader.classList.remove("close");
        loader.classList.add("show");

      console.log('Enter key was pressed');
    //   console.log(searchinput.value);
      const SEARCH_TERM = searchinput.value;
    
        getMovie(SEARCH_TERM,api_key).then().catch(error=>{
            console.log(error);
            const ErrorDiv = document.createElement("div");
            
            ErrorDiv.innerHTML= `${error} &nbsp; &nbsp; IF Not have APIKey Access from console `;
            ErrorDiv.classList.add("errordiv");
            allcards.innerHTML="";
           
            allcards.appendChild(ErrorDiv);
        })
    } 
});
const button = document.getElementById("search");
// console.log(button);


async function getMovie(SEARCH_TERM,api_key){
    console.log(SEARCH_TERM,api_key);
    try{
    const url = `https://www.omdbapi.com/?s=${SEARCH_TERM}&apikey=${api_key}`;
    const response  = await fetch(url);
    if(!response.ok){
        const result = await response.json();
        console.log(result.Error);
        throw new Error(`${result.Error}`);
    }
    const result = await response.json();
    loader.classList.remove("show");
    loader.classList.add("close");
    //  console.log(result);
     allcards.innerHTML="";
    const movieArr= result.Search;

    movieArr.forEach((value)=>{
    // console.log(value.imdbID);

    //fetching from Id======================================
    const imdbresult = getMovieId(value.imdbID,api_key);
    imdbresult.then(snippet=>{
        // console.log(snippet);
   
    //======================================================
        const src=getImage(value.Poster);
        const card = document.createElement("div");
            card.innerHTML=`
                    <div class="image" style="height:63%" >
                    
                        <img src="${src}" alt="movie" style="width: 100%;">
                            
                    </div>
                    <div style="padding:5px;font-size: 20px;height:37%;margin-bottom:5px">
                        <div class="rating">${snippet.imdbRating}<i class="fa-solid fa-star" style="color: #f2f519;"></i></div>
                        <div class="movie-title">${value.Title}</div>
                        <div class="movie-type"> ${snippet.Genre} </div>
                        <div class="imbdID close"><span>imdb : </span>${value.imdbID}</div>
                        <div class="imbdID"><span class="head">Actors : </span>${snippet.Actors}</div>
                        <div class="imbdID"><span class="head">Country : </span>${snippet.Country}</div>
                        <div class="year"><span class="head">Release Date : </span>${snippet.Released}</div>
                    </div>
                
            `;
            card.className="card";
            allcards.appendChild(card);
    })
    })

    }catch(error){
    throw error;
    }
    
}
// getMovie();

function getImage(Img){
    if(Img==='N/A'){
        return "noImage.webp";
    }else{
        return Img;
    }

}

async function getMovieId(imdbId,api_key){
    const IMDBUrl = `http://www.omdbapi.com/?i=${imdbId}&apikey=${api_key}`;
    const response  = await fetch(IMDBUrl);
    const result = await response.json();
    // console.log(result);
    return result;
}
