//fonction loader qui prend en paramètre l'URL de notre JSON
export function loadJSON(url) {
    return fetch(url)
    .then(r => r.json())
    .then(json => console.log(json));
}

export function loadPieceShape() {
	return loadJSON(`/js/createShapePieces.json`);
}

