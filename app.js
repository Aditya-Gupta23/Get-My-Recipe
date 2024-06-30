let serachBox=document.querySelector(".searchBox");
let searchBtn=document.querySelector(".searchBtn");
let result=document.querySelector("#result");
let closeBtn=document.querySelector(".recipeClosoeBtn");
let recipeDetailsContent=document.querySelector(".recipeDetailsContent");

const fetchRecipe=async (query)=>{

    result.innerHTML="<h2>fetching data...🔍</h2>";

    try{
        let data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        let responce=await data.json();
        console.log(responce.meals);
        result.innerHTML="";

        responce.meals.forEach(meal=>{
            let recipeDiv=document.createElement('div');
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML=`
            <img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea}</span> dish</p>
            <p>Belongs to <span>${meal.strCategory}</span> category</p> 
            `;
            result.appendChild(recipeDiv);
            
            let morebtn=document.createElement("button");
            morebtn.textContent="View Recipe"
            recipeDiv.appendChild(morebtn);

            morebtn.addEventListener("click",()=>{
                openRecipePopUp(meal);
        })
    })
    }
    catch(error)
    {
        result.innerHTML="<h1>Sorry no such recipe found 🥲 </h1>"
    }

}

closeBtn.addEventListener("click",()=>{
    recipeDetailsContent.parentElement.style.display="none";
})

const fetchIncredients=(meal)=>{
    console.log(meal);

    let incredientList="";

    for(let i=1;i<=20;i++)
    {
        let incredient=meal[`strIngredient${i}`];
        if(incredient){
            let measure=meal[`strMeasure${i}`];
            incredientList+=`<li>${measure} ${incredient}</li>`
        }else{
            break;
        }
    }
    return incredientList;
}

const openRecipePopUp=(meal)=>{
    recipeDetailsContent.innerHTML=`
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Incredients</h3>
    <ul class="ingredientList">${fetchIncredients(meal)}</ul>
    <div class="recipeInstructions">
        <h3>Instructions:</h3>
        <p>${meal.strInstructions}</p>
    </div>
    `;


    recipeDetailsContent.parentElement.style.display="block";
}


searchBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    console.log("button clicked");
    let searchInput=serachBox.value.trim();
    if(!searchInput){
        result.innerHTML=`<h1>Type the meal you want to search...</h1>`
        return;
    }
    fetchRecipe(searchInput);

});
