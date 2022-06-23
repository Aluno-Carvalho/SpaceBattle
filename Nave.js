class Nave{
    constructor(){
        this.image = loadImage("images/nave.png");
        this.x = 236;
        this.y = 450;
        this.health = 3;
    }

    show(){
        image(this.image, this.x, this.y, 100, 100);
    }

}