const showRecipeDetail = document.getElementById("recipe-details-output");

const getId = () => {
    let url = window.location.href;
    let searchedCharacter = url.search("=");
    return url.slice(searchedCharacter + 1);
}

const getRecipeDetails = () => {
    let extractedId = getId();
    let apiPath = "https://mysite.itvarsity.org/api/recipe-book/";
    let ourFullPath = apiPath + "get-recipes/?id=" + extractedId;

    fetch(ourFullPath)
    .then((response) => response.json())
    .then(responseData => {
        console.log(responseData);
        let output = `
            <article class="px-3 flex flex-col py-5">
                <section class="flex flex-col order-1">
                    <h2 class="text-white order-2 my-4 text-2xl md:text-4xl font-semibold">${responseData[0].title}</h2>
                    <p class="text-white order-3">${responseData[0].description}</p>
                    <img alt="${responseData[0].title}" class="order-1 my-2 rounded-md" src="${apiPath}uploads/${responseData[0].image}"/>
                </section>

                <section class="order-2">
                    <h3 class="text-white my-4 text-2xl md:text-4xl font-semibold">Ingredients</h3>
                    <ul class="text-white">
                        ${responseData[0].ingredients}
                    </ul>
                </section>

                <section class="order-3 list-disc">
                    <h3 class="text-white my-4 text-2xl md:text-4xl font-semibold">Instructions</h3>
                    <ol class="text-white">
                        ${responseData[0].method}
                    </ol>
                </section>
            </article>
        `;
        showRecipeDetail.innerHTML = output;
    });
}

window.addEventListener("load", getRecipeDetails);
