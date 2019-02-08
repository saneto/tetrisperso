export default class entity{
	constructor(x, y)
	{
		this.x = x;
		this.y = y;
	}

	setPos(x, y)
	{
		this.x = x;
		this.y = y;
	}
	increlementY()
	{
		this.y++;
	}
}