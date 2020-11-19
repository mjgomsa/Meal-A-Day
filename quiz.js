// want these to be available in other files
export let finalSongs;
export let arrayOfLists;


//global mood counters
var happyPoints = 0;
var sadPoints = 0;
var angryPoints = 0;
var anxiousPoints = 0;
var excitedPoints = 0;

//counter for number of questions called
var questionCount = 0;

var tempCounter = 0;

//copy of questions array of objects
var tempData = copyData(questions);

export function copyData(questions){
  let copyarr = [];
  for(let i = 0; i < questions.length; i++){
    copyarr[i] = questions[i];
  }
  return copyarr;
}

// html of page header/nav bar
/*HTML NEEDED:
  - header of page, inclduign nav bar
  - anything else you want to add at the top
*/
export function pageSet(){
    return `<div id="root">
    <section id="header">
        <div class ="title_Div"> 
          <i class="fab fa-twitter"></i>
          <h1> 426 Twitter </h1>
          <h5> by: MJ Gomez-Saavedra </h5>
            <button class="button_Refresh button">
              <i class="fas fa-redo-alt"></i> 
              Refresh Feed
            </button>
            <button class="button_NewTweet button">
              <i class="fas fa-plus"></i>
               New Tweet
            </button>
        </div>
    </section>
<section id="mainContainer">
    <div id="feed">
    </div>
</section>            
</div>`;

}

//first button - top left
//button associated with top left answer, id assigned to each answer which indicates mood. function goes through if statements to determine mood and increment appropriate mood counter
/*HTML NEEDED:
  - pop up window with button for re-directing to existing playlist
*/
export const handleAnswerButton = function(event){
  event.preventDefault();

  let tracker = event.target.getAttribute('id');
    let answerId = $("#"+tracker);
    if(answerId == "happy"){
      happyPoints++;
    }else if(answerId == "sad"){
      sadPoints++;
    }else if(answerId == "anxious"){
      anxiousPoints++;
    }else if(answerId == "angry"){
      angryPoints++;
    }else{
      excitedPoints++;
    }

    if(questionCount < 7){
      $('#'+event.target.getAttribute('quizData')).replaceWith(renderQuestion());
    } else {
       createPlaylist(finalSongs);

      //HTML INSERTED HERE
      let popup = <div class="popup">
                    <a href="existingPlaylist.js"> 
                        <button class="submit" type="submit">Submit Quiz</button>
                    </a>
                  </div>;
      // automatically call handleSubmit and produce pop up window with button to existing playlist page
    }
}


//renders html for question, including buttons
/*HTML NEEDED:
  - question container
  - 4 buttons in grid
*/
export const renderQuestion = function(){
  if(questionCount < 7){
    questionCount++;

    var randomNumber = Math.random(9 - tempCounter); // change back to 24 when all the questions are in
    let question =  `<div class="container" quizData="question">
                        <div>
                          <button id=${tempData[randomNumber].m[1]} class="answer">${tempData[randomNumber].a[1]}
                          <button id=${tempData[randomNumber].m[2]} class="answer">${tempData[randomNumber].a[2]}
                          <button id=${tempData[randomNumber].m[3]} class="answer">${tempData[randomNumber].a[3]}
                          <button id=${tempData[randomNumber].m[4]} class="answer">${tempData[randomNumber].a[4]}
                        </div>
                      </div>`;
    
    //each time question called, remove question from tempData
    // splice removes the one question at the index of the random number in tempData
    let deletedQuestion = tempData.splice(randomNumber,1);
    //console.log(tempData);
    tempCounter++;
    return question;
  } else {                                                                                   
    finalQuestion();
    break;
  }
}

export const handleSubmit = function(){
 //contains playlist object
  let happyList = makeHappy();
  let sadList = makeSad();
  let angryList = makeAngry();
  let anxiousList = makeAnxious();
  let excitedList = makeExcited();

  //checks if there are ___ points, for loop that randomly selects a track from the pre-generated list of songs and adds to final song list
  if(sadPoints > 0){
    sadPoints = sadPoints * 3;
    for(let i = 0; i < sadPoints; i++){
      let randomNumber = Math.random(24);
      finalSongs[i] = sadList.tracks[randomNumber];
      //delete randomly selected song from sadList array of tracks
      sadList.tracks.filter(song => song != finalSongs[i]);
    }
  }

  if(happyPoints > 0){
    happyPoints = happyPoints * 3;
    for(let i = 0; i < happyPoints; i++){
      let randomNumber = Math.random(24);
      finalSongs[i] = happyList.tracks[randomNumber];
      //delete randomly selected song from sadList array of tracks
      happyList.tracks.filter(song => song != finalSongs[i]);
    }
  }

  if(angryPoints > 0){
    angryPoints = angryPoints * 3;
    for(let i = 0; i < angryPoints; i++){
      let randomNumber = Math.random(24);
      finalSongs[i] = angryList.tracks[randomNumber];
      //delete randomly selected song from sadList array of tracks
      angryList.tracks.filter(song => song != finalSongs[i]);
    }
  }

  if(anxiousPoints > 0){
    anxiousPoints = anxiousPoints * 3;
    for(let i = 0; i < sadPoints; i++){
      let randomNumber = Math.random(24);
      finalSongs[i] = anxiousList.tracks[randomNumber];
      //delete randomly selected song from sadList array of tracks
      anxiousList.tracks.filter(song => song != finalSongs[i]);
    }
  }

  if(excitedPoints > 0){
    excitedPoints = excitedPoints * 3;
    for(let i = 0; i < excitedPoints; i++){
      let randomNumber = Math.random(24);
      finalSongs[i] = excitedList.tracks[randomNumber];
      //delete randomly selected song from sadList array of tracks
      excitedList.tracks.filter(song => song != finalSongs[i]);
    }
  }

  //****** either redirect to existing playlists that has the new list OR new html w a button below it to take to existing playlists
  
}

export async function makeHappy(){
  //make axios request to form playlist
  //return playlist object
  const result = await axios({
    method: 'get',
    url: 'https://api.spotify.com/v1/recommendations',
    limit: 24,
    seed_genres: "power-pop", "pop", "country", "indie-pop", "happy"
  });
  return result; 
}
export async function makeSad(){
  //make axios request to form playlist
  const result = await axios({
    method: 'get',
    url: 'https://api.spotify.com/v1/recommendations',
    limit: 24,
    seed_genres: "accoustic", "sad", "songwriter", "rainy-day", "emo"
  });
  return result;
}
export async function makeAngry(){
  //make axios request to form playlist
  const result = await axios({
    method: 'get',
    url: 'https://api.spotify.com/v1/recommendations',
    limit: 24,
    seed_genres: "rock", "rock-n-roll", "dubset", "punk", "metal"
  });
  return result;
}
export async function makeAnxious(){
  //make axios request to form playlist
  const result = await axios({
    method: 'get',
    url: 'https://api.spotify.com/v1/recommendations',
    limit: 24,
    seed_genres: "chill", "study", "piano", "ambient", "soul"
  });
  return result;
}

export async function makeExcited(){
  //make axios request to form playlist
  const result = await axios({
    method: 'get',
    url: 'https://api.spotify.com/v1/recommendations',
    limit: 24,
    seed_genres: "party", "dance", "club", "work-out", "pop"
  });
  return result;
}

export async function createPlaylist(){
  //http request to create new createPlaylist on spotify
  let songURIs;
  for(let i = 0; i < finalSongs.length; i++){
    songURIs[i] = finalSongs[i].uri;
  }
  

  var playlistName; // = user profile + a number

  // creates a new playlist on the user's spotify
  const result = await axios({
    method: 'post',
    url: 'https://api.spotify.com/v1/users/{user_id}/playlists',
    user_id: //insert HERE
    data: {
      "name": playlistName;
      "public": false,
    }
  });
  arrayOfLists.append(result);
  // adds songs to new playlist that was created above - directly to the user's spotify
  const addTracks = await axios({
    method: 'post',
    url: 'https://api.spotify.com/v1/playlists/' + result.id '/tracks',
    uris: {
      songURIs[0], songURIs[1], songURIs[2], songURIs[3], songURIs[4], songURIs[5], songURIs[6], songURIs[7], songURIs[8],songURIs[9], songURIs[10], songURIs[11], songURIs[12], songURIs[13], songURIs[14], songURIs[15], songURIs[16], songURIs[17],songURIs[18],songURIs[19],songURIs[20],songURIs[21],songURIs[22],songURIs[23]
    }
  });
}

// like the renderHero function - has all the calls
export function renderQuiz(){
  let quiz = $('body');
  quiz.empty();
  quiz.append(pageSet());

  //starting function to render questions
  quiz.append(renderQuestion());
 
  // handle answer buttons
  quiz.on('click', '.answer', handleAnswerButton);
  quiz.on('click', '.submit', handleSubmit);

}
$(function() {
    renderQuiz();
});
