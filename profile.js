let risotto = {
    id: 'risotto',
    quantity: '10 oz',
}

let cheese = {
    id: 'parm',
    quantity: '2 oz',
}

let squash = {
    id: 'butternut squash',
    quantity: '1',
}

let dishLabels = ['label1', 'label2', 'label3', 'label4', 'label5']
let dietLabels = ['label1', 'label2', 'label3', 'label4', 'label5']
let healthLabels = ['label1', 'label2', 'label3', 'label4', 'label5']



var recipe = {
    id: 1,
    img: 'images/test.jpg',
    label: 'butternut squash risotto',
    createdAt: 'date',
    url: '#',
    cals: 123,
    ingredients: [
        risotto, cheese, squash
    ],
    dishType: dishLabels,
    dietLabel: dietLabels,
    healthLabel: healthLabels
    //will have to write a code to only get one label
}

function renderRecipeCard(recipe) {
    console.log(recipe)
    let list = `<ul>`;
    for (let i = 0; i < recipe.ingredients.length; i++) {
        list += `<li>${recipe.ingredients[i].id} - ${recipe.ingredients[i].quantity}</li>`
    };
    list += `</ul>`;

    let dishType = getRandomLabel(recipe.dishType);
    let dietLabel = getRandomLabel(recipe.dietLabel);
    let healthLabel = getRandomLabel(recipe.healthLabel);


    console.log(dishType)


    let card = `<div class="box">
    
  <img class="recipe_img" src="${recipe.img}">
    <article class="media">
    
        <div class="content">
            <p>
                <strong> <a href="${recipe.url}">${recipe.label}</a></strong><small> ${recipe.createdAt}</small>
                <br>
                <small>${recipe.cals} cals</small>
                <br>
                ${list}
                </p>
        </div>
    </article>
    <div class="tags mt-3">
        <span class="tag">${dishType}</span>
        <span class="tag">${dietLabel}</span>
        <span class="tag">${healthLabel}</span>
    </div>
    <div class="tags">
    <span class="tag is-danger">
      Delete
      <button id="${recipe.id}close" class="delete is-small"></button>
      </span>
      <span class="tag is-info">
      Delete
      <button id="${recipe.id}close"></button>
      </span>
    </div>
    
    
</div>`


    return card
}




$(function () {
    for (let i = 0; i < 6; i++) {
        let currCard = renderRecipeCard(recipe);

        // this is added so we can add them to be in a grid formation
        if (i % 2 == 0) {
            $('.cardRootOdd').append(currCard);
        } else {
            $('.cardRootEven').append(currCard);
        }

    }
});

$(document).on('click', '.delete', async (e) => {
    let currBtn = e.currentTarget.id;
    console.log('click')
    //gets the specific recipe id
    let curr = getID(currBtn);
    //now curr equals the specific recipe object that you are trying to delete

    /* TODO: 
    delete that recipe from the back end
    remove from front end with .remove() */


    console.log(curr)

});

//gets the specific recipe id
function getID(string) {
    let idNum = string.replace(/\D/g, ''); // replace all leading non-digits with nothing
    return idNum;
}

//gets one individual label out of an array of multipl labels
function getRandomLabel(labelArr){
    var label = labelArr[Math.floor(Math.random() * labelArr.length)];
    return label;

}