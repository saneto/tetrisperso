//fonction loader qui prend en paramètre notre JSON
export function loadJSON(url) {
    return fetch(url)
    .then(r => r.json());
}

export function loadPieceShape() {
	return loadJSON(`/js/createShapePieces.json`);
}

