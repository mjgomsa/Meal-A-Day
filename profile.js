let risotto = {
    id: 'risotto',
    quantity: '10 oz',
}

let cheese = {
    id: 'parm',
    quantity :'2 oz',
}

let squash = {
    id: 'butternut squash',
    quantity : '1',
}


var recipe = {
    label: 'butternut squash risotto',
    createdAt: 'date',
    url: '#',
    cals: 123,
    ingredients: [
        risotto, cheese, squash 
    ],
    dishType: 'Italian',
    dietLabel: 'Balanced',
    healthLabel: 'Vegetarian'
    //will have to write a code to only get one label
}

function renderRecipeCard(recipe){
    console.log(recipe)
    let list = `<ul>`;
    for(let i=0; i< recipe.ingredients.length; i++){
        list += `<li>${recipe.ingredients[i].id} - ${recipe.ingredients[i].quantity}</li>`
    };
    list +=`</ul>`

    let card = `<div class="box">
    <a class="delete is-pulled-right"></a>
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
        <span class="tag">${recipe.dishType}</span>
        <span class="tag">${recipe.dietLabel}</span>
        <span class="tag">${recipe.healthLabel}</span>
    </div>
</div>`


return card
}


$(function() {
    for(let i=0; i < 6; i++){
        let currCard =     renderRecipeCard(recipe);

        if(i%2 == 0){
            $('.cardRootOdd').append(currCard);
        } else {
            $('.cardRootEven').append(currCard);
        }
   
    }
});