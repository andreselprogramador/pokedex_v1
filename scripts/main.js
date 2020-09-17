(function(){

const API_URL = "https://pokeapi.co/api/v2/pokemon/";

const mainContainer = document.querySelector("main");

const btnLoad = document.getElementById("btn");

const inputSearch = document.querySelector("input");
const mainPokemon = document.querySelector(".pokemon");
const btn = document.querySelector("button");

const detailsPokemon = document.getElementById("divPokemones");
const btnCancel = document.getElementById("btnCancel");

let count = 10;
let countIndex = 1;

//Pokemones
async function getPokemons(countIndex, count){
    for(let i = countIndex; i <= count; i++){
        const response = await fetch(API_URL + i);
        const data = await response.json();
        try{
            let articles = document.createElement("article");
            let pokemon_type;
            articles.className = "pokemon_card";
            articles.innerHTML = `
                <img src="${data.sprites.back_default}" alt="pokemon img">
                <span class="pokemon_number">N. ${data.id}</span>
                <h2 class="pokemon_name">${data.name}</h2>
            `;

            for(let i = 0; i < data.types.length; i++){
               pokemon_type = document.createElement("span");
               pokemon_type.innerHTML = `
                <span class="pokemon_type">${data.types[i].type.name}</span>
               `;
               articles.appendChild(pokemon_type);
            }
            //Info pokemons especificada
            articles.addEventListener("click", e =>{
                detailsPokemon.innerHTML = `
                <div class="info_name">
                <div class="info">
                    <h2>${data.name}</h2>
                    <span>N. ${data.id}</span>
                </div>
            </div>
            <img src="${data.sprites.back_default}" alt="pokemon_img" id="img_pokemon">
            <div class="stadistic_pokemon">
                <span>Altura: ${data.height} m</span>
            </div>
                `;

                detailsPokemon.classList.remove("desaparecer");

                mainContainer.appendChild(detailsPokemon);
                e.preventDefault();
            })

            mainContainer.appendChild(articles);
        }catch(error){
            console.error(error);
        }

    }
}

btnCancel.addEventListener("click", e => {
    detailsPokemon.classList.add("desaparecer");
    e.preventDefault();
})

btnLoad.addEventListener("click", e => {
    countIndex += 10;
    count += 10;
    getPokemons(countIndex, count);
    e.preventDefault();
})


//Pokemon Search
async function getPokemonSearch(nameOrId){
    const response = await fetch(API_URL + nameOrId);
    const data = await response.json();
    
    try{
        let articles = document.createElement("article");
        let pokemon_type;
        articles.className = "pokemon_card";
        articles.innerHTML = `
            <img src="${data.sprites.back_default}" alt="pokemon img">
            <span class="pokemon_number">N. ${data.id}</span>
            <h2 class="pokemon_name">${data.name}</h2>
        `;

        for(let i = 0; i < data.types.length; i++){
            pokemon_type = document.createElement("span");
            pokemon_type.innerHTML = `
             <span class="pokemon_type">${data.types[i].type.name}</span>
            `
            articles.appendChild(pokemon_type);
         }
        mainPokemon.appendChild(articles);

    }catch(error){
        console.error(error);
    }
}


btn.addEventListener("click", e => {

    if(inputSearch.value < 1){
        btn.removeEventListener();
    }else{
        mainContainer.remove();
        btnLoad.remove();
        getPokemonSearch(inputSearch.value.toLowerCase());
    }

    if(mainPokemon.childElementCount >= 0){
        mainPokemon.removeChild(mainPokemon.firstChild)
    }

    e.preventDefault();
})

getPokemons();
getPokemons(countIndex, count);

})();