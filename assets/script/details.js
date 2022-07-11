const appearance = document.querySelector('#appearance');
const biography = document.querySelector('#biography');
const connections = document.querySelector('#connections');
const powerstats = document.querySelector('#powerstats');
const work = document.querySelector('#work');


// fetching superhero details from the API.
fetch('https://www.superheroapi.com/api.php/1441487802956153/' + localStorage.getItem('heroID'))
    .then((response) => {
        return response.json();
    })
    .then((hero) => {

        document.title = hero.name;
        let heroName = document.querySelector('#hero-name');
        let heroTag = document.createElement('span');
        heroTag.innerText = hero.name;
        heroName.prepend(heroTag);
        let bodyStyle = document.body.style;
        bodyStyle.backgroundImage = "url(" + hero.image.url + ")";
        bodyStyle.backgroundRepeat = "no-repeat";
        bodyStyle.backgroundSize = "cover";

        // favourite functions
        const favourite = document.querySelector('#addFav');
        let elements = JSON.parse(localStorage.getItem('favourites')) || [];

        for (let i in elements) {
            if (elements[i].id == hero.id) {
                favourite.setAttribute('id', 'fav');
            }
        }

        favourite.addEventListener('click', () => {

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
                favourite.setAttribute('id', 'addFav');
                localStorage.setItem('favourites', JSON.stringify(favourites));
            } else {
                let newFav = {
                    id: hero.id,
                    name: hero.name,
                    url: hero.image.url
                };

                favourites.unshift(newFav);
                localStorage.setItem('favourites', JSON.stringify(favourites));
                favourite.setAttribute('id', 'fav');
            }
        });

        // adding superhero to recently viewed superheros
        let recent = JSON.parse(localStorage.getItem('recent')) || [];

        for (let i = 0; i < recent.length; i++) {
            if (recent[i].id == hero.id) {
                recent.splice(i, 1);
                i--;
            }
        }

        let newRecent = {
            id: hero.id,
            name: hero.name,
            url: hero.image.url
        };

        recent.unshift(newRecent);
        recent.splice(14);
        localStorage.setItem('recent', JSON.stringify(recent));


        // updating all the containers with the superhero details.
        let table1 = document.createElement('table');
        for (let key in hero.appearance) {

            let row = document.createElement('tr');
            let name = document.createElement('th');
            let value = document.createElement('td');

            name.innerText = capitalize(key.replaceAll('-', ' '));
            let val = hero.appearance[key];
            if (typeof (val) == 'object') {
                val = val.toString().replaceAll(',', '<br>');
            }
            value.innerHTML = val;

            row.appendChild(name);
            row.appendChild(value);
            table1.appendChild(row);
        }
        appearance.appendChild(table1);

        let table2 = document.createElement('table');
        for (let key in hero.biography) {

            let row = document.createElement('tr');
            let name = document.createElement('th');
            let value = document.createElement('td');

            name.innerText = capitalize(key.replaceAll('-', ' '));
            let val = hero.biography[key];
            if (typeof (val) == 'object') {
                val = val.toString().replaceAll(',', '<br>');
            } else {
                val = val.replaceAll(',', '<br>')
            }
            value.innerHTML = val;

            row.appendChild(name);
            row.appendChild(value);
            table2.appendChild(row);
        }
        biography.appendChild(table2);

        let table3 = document.createElement('table');
        for (let key in hero.connections) {

            let row = document.createElement('tr');
            let name = document.createElement('th');
            let value = document.createElement('td');

            name.innerText = capitalize(key.replaceAll('-', ' '));
            value.innerHTML = hero.connections[key].replaceAll(',', '<br>');

            row.appendChild(name);
            row.appendChild(value);
            table3.appendChild(row);
        }
        connections.appendChild(table3);

        let table4 = document.createElement('table');
        for (let key in hero.powerstats) {

            let row = document.createElement('tr');
            let name = document.createElement('th');
            let value = document.createElement('td');

            name.innerText = capitalize(key.replaceAll('-', ' '));
            value.innerText = hero.powerstats[key];

            row.appendChild(name);
            row.appendChild(value);
            table4.appendChild(row);
        }
        powerstats.appendChild(table4);

        let table5 = document.createElement('table');
        for (let key in hero.work) {

            let row = document.createElement('tr');
            let name = document.createElement('th');
            let value = document.createElement('td');

            name.innerText = capitalize(key.replaceAll('-', ' '));
            value.innerHTML = hero.work[key].replaceAll(',', '<br>');

            row.appendChild(name);
            row.appendChild(value);
            table5.appendChild(row);
        }
        work.appendChild(table5);



    })


function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
