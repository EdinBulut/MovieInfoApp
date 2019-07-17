var moviesBtn = document.querySelector('#movies');
var showsBtn = document.querySelector('#shows');
var moviesBody = document.querySelector('#mBody');
var moviesTable = document.querySelector('#mTable');
var moviesShow = document.querySelector('#mShow');
var showsBody = document.querySelector('#sBody');
var showsShow= document.querySelector('#sShow');
var moreMovies = document.querySelector('#moreM');
var moreShows = document.querySelector('#moreS');
var filterMovies = document.querySelector('#fMovies');


var m=0;
var s=0;

// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       var response = JSON.parse(xhttp.responseText);
       var allMovies = JSON.parse(xhttp.responseText).movies;
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//////MOVIESLIST////////MOVIESLIST////////////MOVIESLIST////////MOVIESLIST////////////MOVIESLIST////////MOVIESLIST////////////MOVIESLIST////////MOVIESLIST//////
        
        
        var movies= response.movies;
        // console.log(allMovies);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        var sortMoviesByRating = (movies) =>
        movies.sort((movieA, movieB) =>
        {
            if(movieA.rate > movieB.rate) return -1;
            if(movieA.rate < movieB.rate) return 1;
            
        })

        var sortedMoviesByRating = sortMoviesByRating(movies);
        // console.log(movies);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////AT LEAST THREE STARS//////////////////////////////////////////////////////////

        var filterByRating = (sortedMoviesByRating, min, max) => 
            sortedMoviesByRating.filter(sortedMoviesByRating => sortedMoviesByRating.rate >=min && sortedMoviesByRating.rate <=max);
        

        var atLeastThreeStars = filterByRating(movies, 3,5);
        console.log( 'atLeastThreeStars: ');
        console.log( atLeastThreeStars);



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

       function createMoviesList(){
        var text = '';
        for (var i = 0; i<10; i++) {
          text += `
          <div class="wrapp">
      
              <div class="row ">
              
                  <div class="col-8 offset-2 offset-sm-0 col-sm-6  col-md-8 col-lg-9 col-xl-10">
                      <h2 >${sortedMoviesByRating[i].title}</h2>
                        
                      <p><strong>Description:</strong> ${sortedMoviesByRating[i].description}</p>
                      <p><strong>Release date:</strong> ${sortedMoviesByRating[i].date}</p>
                      <p><strong>Actors:</strong> ${sortedMoviesByRating[i].actors}</p>
                      <p><strong>Rating: </strong> ${sortedMoviesByRating[i].rate}<i class="far fa-star"></i></p>
                      
                    </div>
                    
                    <div class="col-8 offset-2 offset-sm-0 col-sm-6 col-md-4 col-lg-3 col-xl-2 align-items-center" >
                      
                        <img class="img-fluid rounded" src="${sortedMoviesByRating[i].img}" alt="">
                      
                    </div>
                </div>      
            
            </div>
            
            
          `;
          
        };
        m=i;
        
        moviesBody.innerHTML = text; 
    }

    createMoviesList();
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// **********************************************************************************************************************

function createMoviesTable(){
   
    var text = '';
    for (var i = 0; i<allMovies.length; i++) {
      text += `
      <tr >
            <th scope="row" class="">${[i+1]}</th>
            <td><a href="#">${allMovies[i].title}</a></td>
            <td>
                <div class="stars" data-rating="0">
                <span class="star">&nbsp;</span>
                <span class="star">&nbsp;</span>
                <span class="star">&nbsp;</span>
                <span class="star">&nbsp;</span>
                <span class="star">&nbsp;</span>
                </div>
            </td>

            <td ><i class="far fa-star"></i> ${allMovies[i].rate}</td>
          </tr>
      `;
      
    };
    
    
    moviesTable.innerHTML += text; 
    
}

createMoviesTable()

// oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo STAR-RATING (NOT WORKING)
document.addEventListener('DOMContentLoaded', function(){
    let stars = document.querySelectorAll('.star');
    stars.forEach(function(star){
        star.addEventListener('click', setRating); 
    });
    
    let rating = parseInt(document.querySelector('.stars').getAttribute('data-rating'));
    let target = stars[rating - 1];
    target.dispatchEvent(new MouseEvent('click'));
});
function setRating(ev){
    let span = ev.currentTarget;
    let stars = document.querySelectorAll('.star');
    let match = false;
    let num = 0;
    stars.forEach(function(star, index){
        if(match){
            star.classList.remove('rated');
        }else{
            star.classList.add('rated');
        }
        
        if(star === span){
            match = true;
            num = index + 1;
        }
    });
    document.querySelector('.stars').setAttribute('data-rating', num);
}
// oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo STAR-RATING


// **********************************************************************************************************************
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function moreInMoviesList(){
    var text = '';
    if((m+10)<sortedMoviesByRating.length) {
        
        for (var i = 0; i<(m+10); i++) {
            
            text += `
            <div class="wrapp">
        
                <div class="row ">
                
                    <div class="col-8 offset-2 offset-sm-0 col-sm-6  col-md-8 col-lg-9 col-xl-10">
                        <h2 >${sortedMoviesByRating[i].title}</h2>
                          
                        <p><strong>Description:</strong> ${sortedMoviesByRating[i].description}</p>
                        <p><strong>Release date:</strong> ${sortedMoviesByRating[i].date}</p>
                        <p><strong>Actors:</strong> ${sortedMoviesByRating[i].actors}</p>
                        <p><strong>Rating: </strong> ${sortedMoviesByRating[i].rate}<i class="far fa-star"></i></p>
                        
                      </div>
                      
                      <div class="col-8 offset-2 offset-sm-0 col-sm-6 col-md-4 col-lg-3 col-xl-2 align-items-center" >
                        
                          <img class="img-fluid rounded" src="${sortedMoviesByRating[i].img}" alt="">
                        
                      </div>
                  </div>      
              
              </div>
            `;
            
          };
          m=i
          moreMovies.style.display='block';
    } else {
        for (var i = 0; i<sortedMoviesByRating.length; i++) {
            
            text += `
            <div class="wrapp">
        
                <div class="row ">
                
                    <div class="col-8 offset-2 offset-sm-0 col-sm-6  col-md-8 col-lg-9 col-xl-10">
                        <h2 >${sortedMoviesByRating[i].title}</h2>
                          
                        <p><strong>Description:</strong> ${sortedMoviesByRating[i].description}</p>
                        <p><strong>Release date:</strong> ${sortedMoviesByRating[i].date}</p>
                        <p><strong>Actors:</strong> ${sortedMoviesByRating[i].actors}</p>
                        <p><strong>Rating </strong> ${sortedMoviesByRating[i].rate}<i class="far fa-star"></i></p>
                        
                      </div>
                      
                      <div class="col-8 offset-2 offset-sm-0 col-sm-6 col-md-4 col-lg-3 col-xl-2 align-items-center" >
                        
                          <img class="img-fluid rounded" src="${sortedMoviesByRating[i].img}" alt="">
                        
                      </div>
                  </div>      
              
              </div>
            `;
            
          };
          moreMovies.style.display='none';
    }

        
    
    // console.log(m);
    // console.log(sortedMoviesByRating.length);
    
    
    moviesBody.innerHTML = text; 
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

moreMovies.addEventListener('click', moreInMoviesList);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function showMoviesList() {
        moviesShow.style.display = 'block';
        showsShow.style.display = 'none';

        showsBtn.style.backgroundColor = '#fff';
        showsBtn.style.color = '#343a40';
        moviesBtn.style.backgroundColor = '#343a40';
        moviesBtn.style.color = '#fff';
        document.querySelector('#fMovies').value='';
        moreMovies.style.display='block';
        // createMoviesList();
      }
      
        function backToTop(){
        window.scrollTo(0,0);
        }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



/*******************************************************************************************************************/








////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    moviesBtn.addEventListener('click', showMoviesList);
    moviesBtn.addEventListener('click', createMoviesList);
    moviesBtn.addEventListener('click', backToTop);
    
//////MOVIESLISTEND////////MOVIESLISTEND/////////MOVIESLISTEND////////MOVIESLISTEND/////////MOVIESLISTEND////////MOVIESLISTEND/////////MOVIESEND//////MOVIESLISTEND//////

//////SHOWSLIST////////SHOWSLIST////////////SHOWSLIST////////SHOWSLIST////////////SHOWSLIST////////SHOWSLIST////////////SHOWSLIST////////SHOWSLIST//////

var shows= response.shows;

        var sortShowsByRating = (shows) =>
        shows.sort((showA, showB) =>
        {
            if(showA.rate > showB.rate) return -1;
            if(showA.rate < showB.rate) return 1;
            
        })

        var sortedShowsByRating = sortShowsByRating(shows);
        // console.log(sortedShowsByRating);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
       function createShowsList(){
        var text = '';
        for (var i = 0; i<10; i++) {
          text += `
          <div class="wrapp">
      
              <div class="row ">
              
                  <div class="col-8 offset-2 offset-sm-0 col-sm-6  col-md-8 col-lg-9 col-xl-10">
                      <h2 >${sortedShowsByRating[i].title}</h2>
                        
                      <p><strong>Description:</strong> ${sortedShowsByRating[i].description}</p>
                      <p><strong>Release date:</strong> ${sortedShowsByRating[i].date}</p>
                      <p><strong>Actors:</strong> ${sortedShowsByRating[i].actors}</p>
                      <p><strong>Rating: </strong> ${sortedShowsByRating[i].rate}<i class="far fa-star"></i></p>
                      
                    </div>
                    
                    <div class="col-8 offset-2 offset-sm-0 col-sm-6 col-md-4 col-lg-3 col-xl-2 align-items-center" >
                      
                        <img class="img-fluid rounded" src="${sortedShowsByRating[i].img}" alt="">
                      
                    </div>
                </div>      
            
            </div>
          `;
          
        };
        s=i;
        showsBody.innerHTML = text; 
    }

    createShowsList();
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function moreInShowsList(){
    var text = '';
    if((s+10)<sortedShowsByRating.length) {
        
        for (var i = 0; i<(s+10); i++) {
            
            text += `
            <div class="wrapp">
        
                <div class="row ">
                
                    <div class="col-8 offset-2 offset-sm-0 col-sm-6  col-md-8 col-lg-9 col-xl-10">
                        <h2 >${sortedShowsByRating[i].title}</h2>
                          
                        <p><strong>Description:</strong> ${sortedShowsByRating[i].description}</p>
                        <p><strong>Release date:</strong> ${sortedShowsByRating[i].date}</p>
                        <p><strong>Actors:</strong> ${sortedShowsByRating[i].actors}</p>
                        <p><strong>Rating: </strong> ${sortedShowsByRating[i].rate}<i class="far fa-star"></i></p>
                        
                      </div>
                      
                      <div class="col-8 offset-2 offset-sm-0 col-sm-6 col-md-4 col-lg-3 col-xl-2 align-items-center" >
                        
                          <img class="img-fluid rounded" src="${sortedShowsByRating[i].img}" alt="">
                        
                      </div>
                  </div>      
              
              </div>
            `;
            
          };
          s=i
    } else {
        for (var i = 0; i<sortedShowsByRating.length; i++) {
            
            text += `
            <div class="wrapp">
        
                <div class="row ">
                
                    <div class="col-8 offset-2 offset-sm-0 col-sm-6  col-md-8 col-lg-9 col-xl-10">
                        <h2 >${sortedShowsByRating[i].title}</h2>
                          
                        <p><strong>Description:</strong> ${sortedShowsByRating[i].description}</p>
                        <p><strong>Release date:</strong> ${sortedShowsByRating[i].date}</p>
                        <p><strong>Actors:</strong> ${sortedShowsByRating[i].actors}</p>
                        <p><strong>Rating: </strong> ${sortedShowsByRating[i].rate}<i class="far fa-star"></i></p>
                        
                      </div>
                      
                      <div class="col-8 offset-2 offset-sm-0 col-sm-6 col-md-4 col-lg-3 col-xl-2 align-items-center" >
                        
                          <img class="img-fluid rounded" src="${sortedShowsByRating[i].img}" alt="">
                        
                      </div>
                  </div>      
              
              </div>
            `;
            
          };
          moreShows.style.display='none';
    }

        


        
    
    // console.log(s);
    // console.log(sortedShowsByRating.length);
    
    
    showsBody.innerHTML = text; 
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

moreShows.addEventListener('click', moreInShowsList);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    }
    function showShowsList() {
        moviesShow.style.display = 'none';
        showsShow.style.display = 'block';

       
        moviesBtn.style.backgroundColor = '#fff';
        moviesBtn.style.color = '#343a40';
        showsBtn.style.backgroundColor = '#343a40';
        showsBtn.style.color = '#fff';
        document.querySelector('#fMovies').value='';
        moreShows.style.display='block';
        // createShowsList();
      }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    showsBtn.addEventListener('click', showShowsList);
    showsBtn.addEventListener('click', createShowsList);
    showsBtn.addEventListener('click', backToTop);



//////SHOWSLISTEND////////SHOWSLISTEND////////////SHOWSLISTEND////////SHOWSLISTEND////////////SHOWSLISTEND////////SHOWSLISTEND////////////SHOWSLISTEND////////SHOWSLISTEND/////

//////SEARCHMOVIES////////SEARCHMOVIES////////////SEARCHMOVIES////////SEARCHMOVIES////////////SEARCHMOVIES////////SEARCHMOVIES////////////SEARCHMOVIES////////SEARCHMOVIES//////


function filterMoviesList(){
    var filterMoviesValue = document.querySelector('#fMovies').value.toUpperCase();
    var response = JSON.parse(xhttp.responseText);
        var movies= response.movies;
        var sortMoviesByRating = (movies) =>
        movies.sort((movieA, movieB) =>
        {
            if(movieA.rate > movieB.rate) return -1;
            if(movieA.rate < movieB.rate) return 1;
            
        })

        var sortedMoviesByRating = sortMoviesByRating(movies);
    if (filterMoviesValue.length >= 2){
        
    var text = '';
    for (var i = 0; i<sortedMoviesByRating.length; i++) {
      text += `
      <div class="wrapp find-movie">
  
          <div class="row ">
          
              <div class="col-8 offset-2 offset-sm-0 col-sm-6  col-md-8 col-lg-9 col-xl-10 ">
                  <h2 class="mAttribute">${sortedMoviesByRating[i].title}</h2>
                    
                  <p><strong>Description:</strong> <span class="mAttribute">${sortedMoviesByRating[i].description}</span></p>
                  <p><strong>Release date:</strong> <span class="mAttribute">${sortedMoviesByRating[i].date}</span></p>
                  <p><strong>Actors:</strong> <span class="mAttribute">${sortedMoviesByRating[i].actors}</span></p>
                  <p><strong>Rating: </strong> <span class="mAttribute">${sortedMoviesByRating[i].rate}<i class="far fa-star"></i></span></p>
                  
                </div>
                
                <div class="col-8 offset-2 offset-sm-0 col-sm-6 col-md-4 col-lg-3 col-xl-2 align-items-center" >
                  
                    <img class="img-fluid rounded" src="${sortedMoviesByRating[i].img}" alt="">
                  
                </div>
            </div>      
        
        </div>  
      `;
      
    };
    m=i;
    moviesBody.innerHTML = text; 
    
    // console.log(filterMoviesValue);
    
    var filterAtt = moviesBody.getElementsByClassName('find-movie');
    for (let a = 0; a<sortedMoviesByRating.length; a++){
        let title = filterAtt[a].getElementsByClassName('mAttribute')[0];
        let description = filterAtt[a].getElementsByClassName('mAttribute')[1];
        let date = filterAtt[a].getElementsByClassName('mAttribute')[2];
        let actors = filterAtt[a].getElementsByClassName('mAttribute')[3];
        let rating = filterAtt[a].getElementsByClassName('mAttribute')[3];
        moreMovies.style.display='block';
        if (title.innerHTML.toUpperCase().indexOf(filterMoviesValue) > -1){
            filterAtt[a].style.display =''
        } else if (description.innerHTML.toUpperCase().indexOf(filterMoviesValue) > -1){
            filterAtt[a].style.display =''
        } else if (date.innerHTML.toUpperCase().indexOf(filterMoviesValue) > -1){
            filterAtt[a].style.display =''
        } else if (actors.innerHTML.toUpperCase().indexOf(filterMoviesValue) > -1){
            filterAtt[a].style.display =''
        }
         else if (rating.innerHTML.toString().indexOf(filterMoviesValue) > -1){
            filterAtt[a].style.display =''
        }
         else {
            filterAtt[a].style.display ='none';
            moreMovies.style.display='none';
        }
    }
} 
else if(filterMoviesValue == ''){
    
    var text = '';
        for (var i = 0; i<10; i++) {
          text += `
          <div class="wrapp">
      
              <div class="row ">
              
                  <div class="col-8 offset-2 offset-sm-0 col-sm-6  col-md-8 col-lg-9 col-xl-10">
                      <h2 >${sortedMoviesByRating[i].title}</h2>
                        
                      <p><strong>Description:</strong> ${sortedMoviesByRating[i].description}</p>
                      <p><strong>Release date:</strong> ${sortedMoviesByRating[i].date}</p>
                      <p><strong>Actors:</strong> ${sortedMoviesByRating[i].actors}</p>
                      <p><strong>Rating: </strong> ${sortedMoviesByRating[i].rate}<i class="far fa-star"></i></p>
                      
                    </div>
                    
                    <div class="col-8 offset-2 offset-sm-0 col-sm-6 col-md-4 col-lg-3 col-xl-2 align-items-center" >
                      
                        <img class="img-fluid rounded" src="${sortedMoviesByRating[i].img}" alt="">
                      
                    </div>
                </div>      
            
            </div>
            
            
          `;
          
        };
        m=i;
        
        moviesBody.innerHTML = text; 
        moreMovies.style.display='block';
        window.scrollTo(0,0);
        

}
}

filterMovies.addEventListener('keyup',filterMoviesList);


//////SEARCHMOVIESEND////////SEARCHMOVIESEND////////////SEARCHMOVIESEND////////SEARCHMOVIESEND////////////SEARCHMOVIESEND////////SEARCHMOVIESEND////////////SEARCHMOVIESEND////////SEARCHMOVIESEND//////

//////SEARCHSHOWS////////SEARCHSHOWS////////////SEARCHSHOWS////////SEARCHSHOWS////////////SEARCHSHOWS////////SEARCHSHOWS////////////SEARCHSHOWS////////SEARCHSHOWS//////

function filterShowsList(){
    var filterShowsValue = document.querySelector('#fMovies').value.toUpperCase();
    var response = JSON.parse(xhttp.responseText);
    var shows= response.shows;
    var sortShowsByRating = (shows) =>
    shows.sort((showA, showB) =>
    {
        if(showA.rate > showB.rate) return -1;
        if(showA.rate < showB.rate) return 1;
        
    })

    var sortedShowsByRating = sortShowsByRating(shows);
    if (filterShowsValue.length >= 2){
        
    var text = '';
    for (var i = 0; i<sortedShowsByRating.length; i++) {
      text += `
      <div class="wrapp find-movie">
  
          <div class="row ">
          
              <div class="col-8 offset-2 offset-sm-0 col-sm-6  col-md-8 col-lg-9 col-xl-10 ">
                  <h2 class="sAttribute">${sortedShowsByRating[i].title}</h2>
                    
                  <p><strong>Description:</strong> <span class="sAttribute">${sortedShowsByRating[i].description}<span></p>
                  <p><strong>Release date:</strong> <span class="sAttribute">${sortedShowsByRating[i].date}<span></p>
                  <p><strong>Actors:</strong> <span class="sAttribute">${sortedShowsByRating[i].actors}<span></p>
                  <p><strong>Rating: </strong> <span class="sAttribute">${sortedShowsByRating[i].rate}<i class="far fa-star"></i><span></p>
                  
                </div>
                
                <div class="col-8 offset-2 offset-sm-0 col-sm-6 col-md-4 col-lg-3 col-xl-2 align-items-center" >
                  
                    <img class="img-fluid rounded" src="${sortedShowsByRating[i].img}" alt="">
                  
                </div>
            </div>      
        
        </div>  
      `;
      
    };
    s=i;
    showsBody.innerHTML = text; 
    
    // console.log(filterShowsValue);
    
    var filterAtt = showsBody.getElementsByClassName('find-movie');
    for (let a = 0; a<sortedShowsByRating.length; a++){
        let title = filterAtt[a].getElementsByClassName('sAttribute')[0];
        let description = filterAtt[a].getElementsByClassName('sAttribute')[1];
        let date = filterAtt[a].getElementsByClassName('sAttribute')[2];
        let actors = filterAtt[a].getElementsByClassName('sAttribute')[3];
        let rating = filterAtt[a].getElementsByClassName('sAttribute')[3];

        if (title.innerHTML.toUpperCase().indexOf(filterShowsValue) > -1){
            filterAtt[a].style.display =''
        } else if (description.innerHTML.toUpperCase().indexOf(filterShowsValue) > -1){
            filterAtt[a].style.display =''
        } else if (date.innerHTML.toUpperCase().indexOf(filterShowsValue) > -1){
            filterAtt[a].style.display =''
        } else if (actors.innerHTML.toUpperCase().indexOf(filterShowsValue) > -1){
            filterAtt[a].style.display =''
        }
         else if (rating.innerHTML.toString().indexOf(filterShowsValue) > -1){
            filterAtt[a].style.display =''
        }
         else {
            filterAtt[a].style.display ='none';
            moreShows.style.display='none';
        }
    }
} 
else if(filterShowsValue == ''){
    
    var text = '';
        for (var i = 0; i<10; i++) {
          text += `
          <div class="wrapp">
      
              <div class="row ">
              
                  <div class="col-8 offset-2 offset-sm-0 col-sm-6  col-md-8 col-lg-9 col-xl-10">
                      <h2 >${sortedShowsByRating[i].title}</h2>
                        
                      <p><strong>Description:</strong> ${sortedShowsByRating[i].description}</p>
                      <p><strong>Release date:</strong> ${sortedShowsByRating[i].date}</p>
                      <p><strong>Actors:</strong> ${sortedShowsByRating[i].actors}</p>
                      <p><strong>Rating: </strong> ${sortedShowsByRating[i].rate}<i class="far fa-star"></i></p>
                      
                    </div>
                    
                    <div class="col-8 offset-2 offset-sm-0 col-sm-6 col-md-4 col-lg-3 col-xl-2 align-items-center" >
                      
                        <img class="img-fluid rounded" src="${sortedShowsByRating[i].img}" alt="">
                      
                    </div>
                </div>      
            
            </div>
            
            
          `;
          
        };
        s=i;
        
        showsBody.innerHTML = text; 
        moreShows.style.display='block';
        window.scrollTo(0,0);       
}
}

filterMovies.addEventListener('keyup',filterShowsList);

//////SEARCHSHOWSEND////////SEARCHSHOWSEND////////////SEARCHSHOWSEND////////SEARCHSHOWSEND////////////SEARCHSHOWSEND////////SEARCHSHOWSEND////////////SEARCHSHOWSEND////////SEARCHSHOWSEND//////






// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
};
xhttp.open("GET", "moviesandshows.json", true);
xhttp.send();
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

