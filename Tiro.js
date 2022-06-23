class Tiro{
    constructor(x){
        this.image = loadImage("images/tiro.png");
        this.x = x;
        this.y = 420;
        this.velocityY;
        this.scale = 0.1;
    }

    show(){
        this.y = this.y - 8;
        image(this.image, this.x, this.y, 15, 30);
    }
}