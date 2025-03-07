
/* ============================= List-recipies.html ====================================== */

const recipeDisplay = document.getElementById("output");

const getCategory = () => {
    let url = window.location.href;
    // console.log(url); -> gives us the url of the browser

    // inside the url we a tryinh to find a "=" character returns an int for the place where charcter is
    let searchedCharacter = url.search("=");
    // console.log(searchedCharacter)

    const category = url.slice(searchedCharacter + 1);
    // console.log(category);

    return category;
}

const getRecipeList = () => {
    // Category which was extraceted from our url
    let extractedCategory = getCategory();

    // itvarsity api path
    let apiPath = "https://mysite.itvarsity.org/api/recipe-book/";
    let ourFullPath = apiPath + "get-recipes/?category=" + extractedCategory;
    // console.log(ourFullPath);

    fetch (ourFullPath)
    .then((response) => response.json())
    .then((data) => {
        console.log(data); // -> printing array formate

        let output = "";
        let headingElement = `<h1 class="text-white text-2xl md:text-4xl font-semibold text-center py-4">Our Recipies</h1>`
        let ulElement = document.createElement("ul");
        ulElement.className = "flex flex-wrap gap-4 p-2"

        data.forEach((element) => {
            // console.log(element.title)
            // console.log(element.description)
            /* looping over the array thats stored in the key element method incase of expansion
            element.method.forEach((method, index) => {
                console.log(`index ${index}: ${method}`);
            })
            */
            
            /* rendering elements 
            const ulElement = document.createElement("ul")
            // we use map to return data, forEach can only loop not return new data
            const instructions = element.method.map((instruction) => instruction)
            ulElement.innerHTML = instructions;

            ulElement.className = "text-white p-2"
            recipeDisplay.append(ulElement)
            */

           output += `
                <li class="block w-full md:w-auto">
                    <a href="./show-recipe.html?id=${element.id}" class="text-white border-2 border-white block md:px-2 md:py-3 md:w-52 md:h-60 rounded-md hover:bg-white hover:text-black transition-all">
                        <article class="h-full flex flex-col md:items-center md:justify-center px-3 py-2 md:p-0">
                            <section>
                                <h1 class="text-xl md:py-2 font-semibold">${element.title}</h1>
                                <p class="text-sm">${element.description}</p>
                            </section>
                        </article>
                    </a>
                </li>
           `;

           ulElement.innerHTML = output;
            
        });
        recipeDisplay.innerHTML = headingElement;
        recipeDisplay.append(ulElement)



         /* looping over all elements and indexing it 

         data.forEach((element) => {
            console.log(element.title)
            console.log(element.description)
            // accessing the first element of the key "method" that has a "array" value and indexing the first element
            console.log(element.method[0])
         });

         */

         /* Getting a single element array of objects

         let elementChoice = data[0];
         console.log(elementChoice);
         console.log(elementChoice.title);
         console.log(elementChoice.description);
         console.log(elementChoice.method);
         console.log(elementChoice.method[0]);
         */

    })
}

// when the "window" loads we call getRecipeList
window.addEventListener("load", getRecipeList)

