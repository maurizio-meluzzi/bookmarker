// Funzione per creare un mattoncino
function createTile(snapshotUrl, url, description, tags) {
    var tile = document.createElement('div');
    tile.className = 'tile';

    var snapshot = document.createElement('img');
    snapshot.className = 'snapshot';
    snapshot.src = snapshotUrl;
    snapshot.alt = 'Snapshot';
    tile.appendChild(snapshot);

    var content = document.createElement('div');
    content.className = 'content';
    tile.appendChild(content);

    var urlElement = document.createElement('a');
    urlElement.className = 'url';
    urlElement.href = url;
    urlElement.textContent = url;
    content.appendChild(urlElement);

    var descriptionElement = document.createElement('p');
    descriptionElement.className = 'description';
    descriptionElement.textContent = description;
    content.appendChild(descriptionElement);

    var tagsElement = document.createElement('p');
    tagsElement.className = 'tags';
    tagsElement.textContent = 'Tags: ' + tags.join(', ');
    content.appendChild(tagsElement);

    return tile;
}

/*
function addTilesToCategory(tilesData) {
    console.log('addTilesToCategory() - test');
    console.log(tilesData);

    var category = document.getElementById('category');

    tilesData.forEach(function(tileData) {
        var tile = createTile(tileData.snapshotUrl, tileData.url, tileData.description, tileData.tags);
        category.appendChild(tile);
    });
}
*/
// Funzione per aggiungere i tile all'elemento 'category'
function addTilesToCategory(tilesData) {
    console.log('addTilesToCategory() - start');
    // console.log(tilesData);

    var category = document.getElementById('category');

    if (Array.isArray(tilesData)) {
        console.log('addTilesToCategory() - is an array');

        tilesData.forEach(function(tileData) {
            var tile = createTile(tileData.snapshot, tileData.url, tileData.description, tileData.tags);
            category.appendChild(tile);
        });
    } else {
        console.log('addTilesToCategory() - is NOT an array');

        try {
            var tilesArray = Array.from(tilesData);

            tilesArray.forEach(function(tileData) {
                var tile = createTile(tileData.snapshot, tileData.url, tileData.description, tileData.tags);
                category.appendChild(tile);
            });
        } catch (error) {
            console.error('Error converting tiles data to array:', error);
        }
    }
}



// Funzione per effettuare la chiamata REST tramite Promise
function makeRequest(url) {
    return new Promise(function(resolve, reject) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                resolve(JSON.parse(request.responseText));
            } else {
                reject(new Error('Error: ' + request.status));
            }
        };
        request.onerror = function() {
            reject(new Error('Request failed.'));
        };
        request.send();
    });
}

// Chiamata REST per ottenere i dati dei tile utilizzando Promise
makeRequest('https://www.viper-lab.it/gn8yzp183iy6/tiles.json')
    .then(function(tilesData) {
        // var tilesData = response.tiles;
        addTilesToCategory(tilesData.tiles);
    })
    .catch(function(error) {
        console.error(error);
    });
