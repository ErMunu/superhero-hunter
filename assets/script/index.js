// first load of recently viewed superheros
const container = document.querySelector('#content-section');

let recent = JSON.parse(localStorage.getItem('recent')) || [];

for (let hero of recent) {
    const div = document.createElement('div');
    const image = document.createElement('img');
    image.setAttribute('src', hero.url);
    const span = document.createElement('span');
    span.innerText = hero.name;

    div.appendChild(image);
    div.appendChild(span);
    container.appendChild(div);

    div.addEventListener('click', () => {
        localStorage.setItem('heroID', hero.id);
        document.location.href = 'details.html'
    });
}

// search starts  here
const searchbar = document.querySelector('#search-bar');

// search input event listener.
searchbar.addEventListener('input', () => getResults());

// get all results and display as per search input
async function getResults() {

    await fetch('https://www.superheroapi.com/api.php/1441487802956153/search/' + searchbar.value)
        .then(
            (response) => {
                return response.json();
            }
        )
        .then(
            (data) => {
                const results = document.querySelector('#results');

                // Removing all search results from previous search.
                while (results.children.length !== 0) {
                    results.removeChild(results.children[0]);
                }

                results.classList.remove('hidden');

                // adding search result to results container.
                for (let hero of data.results) {
                    // creating elements
                    const div = document.createElement('div');
                    const atag = document.createElement('a');
                    const span = document.createElement('span');

                    span.innerText = hero.name;
                    div.appendChild(atag);
                    atag.appendChild(span);
                    atag.setAttribute('href', 'details.html');

                    results.appendChild(div);
                    div.innerHTML = `${div.innerHTML + ' <span id="addFav"> &#x2764;</span>'}`;

                    const likebutton = div.lastChild;
                    let elements = JSON.parse(localStorage.getItem('favourites')) || [];

                    for (let i = 0; i < elements.length; i++) {
                        if (elements[i].id == hero.id) {
                            likebutton.setAttribute('id', 'fav');
                        }
                    }

                    // adding eventlistener to the favourite button
                    likebutton.addEventListener('click', () => {

                        let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
                        let isFav = false;

                        for (let i = 0; i < favourites.length; i++) {
                            if (favourites[i].id == hero.id) {
                                isFav = true;
                                favourites.splice(i, 1);
                                i--;
                            }
                        }

                        if (isFav) {
                            likebutton.setAttribute('id', '');
                            localStorage.setItem('favourites', JSON.stringify(favourites));
                            return;
                        } else {
                            let newFav = {
                                id: hero.id,
                                name: hero.name,
                                url: hero.image.url
                            };

                            favourites.unshift(newFav);
                            localStorage.setItem('favourites', JSON.stringify(favourites));
                            likebutton.setAttribute('id', 'fav');
                        }
                    });
                    
                    div.addEventListener('click', () => {
                        localStorage.setItem('heroID', hero.id);
                    });
                }
            }
        );

}

// hide search results when clicked outside the search area.
window.addEventListener('click', (e) => {
    const results = document.querySelector('#results');
    let flag = true;

    for (let element of e.path) {
        if (element === results || element === searchbar) {
            flag = false;
        }
    }

    if (flag) {
        results.classList.add('hidden');
    }
});



