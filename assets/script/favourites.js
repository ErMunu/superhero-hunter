const container = document.querySelector('#container');

let favourites = JSON.parse(localStorage.getItem('favourites')) || [];

for (let hero of favourites) {
    const div = document.createElement('div');
    const image = document.createElement('img');
    image.setAttribute('src', hero.url);
    image.setAttribute('alt', hero.name);
    const span = document.createElement('span');
    span.innerText = hero.name;
    const button = document.createElement('button');
    button.innerHTML = '&#x2620;';

    div.appendChild(image);
    div.appendChild(span);
    span.appendChild(button);
    div.setAttribute('id', hero.id);
    container.appendChild(div);

    image.addEventListener('click', () => {
        localStorage.setItem('heroID', hero.id);
        document.location.href = 'details.html';
    });

    button.addEventListener('click', function () {
        let favourites = JSON.parse(localStorage.getItem('favourites'));

        container.removeChild(this.parentElement.parentElement);

        let currID = this.parentElement.parentElement.getAttribute('id');

        for (let i = 0; i < favourites.length; i++) {
            if (favourites[i].id == currID) {
                favourites.splice(i, 1);
                i--;
            }
        }

        localStorage.setItem('favourites', JSON.stringify(favourites));
    });
}