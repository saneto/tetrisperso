/*
	permet la création du canvas, je suis aps sur que l'utilise à voir.
 */
export default class createCanvas {
	constructor(area) {
		this.area = area;
		this.context = area.getContext('2d');
		this.context.scale(20, 20);
	}
}