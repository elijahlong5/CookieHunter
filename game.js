let canvas = document.getElementById("canvas");
canvas = canvas.getContext("2d");

max_height = 400;
max_width = 400;

class Game {

    constructor(canvas) {
        this.canvas = canvas;
        this.establish_background();

        let player = new Player({x: 175, y: 175}, 50);
        let cookie = new Cookie({x: 40, y: 40})
        let keyboard = new Controller(player)
        this.bodies = [];
        this.bodies.push(player);
        this.bodies.push(cookie)

        this.update(keyboard.response);

        const tick = now => {
            this.update();
            requestAnimationFrame(tick);
        };
        tick()
    }

    update(keyboard_event) {
        this.establish_background()
        this.bodies.forEach(function(body){
            body.update(canvas, keyboard_event);
        });
    }
    establish_background(){
        this.canvas.fillStyle = "lightblue";
        this.canvas.fillRect(0,0,400,400);
    }
}

class Entity {
    constructor(position, size, color) {
        this.position = position;
        this.size = size;
        this.color = color;
    }
    place(canvas){
        canvas.fillStyle = this.color;
        canvas.fillRect(this.position.x,
            this.position.y,
            this.size, this.size);
    }
    update(canvas) {
        this.place(canvas)
    }
}
class Cookie extends Entity {
    constructor(position){
        super(position, 20, "Gold")
    }
    place(canvas) {
        super.place(canvas)
    }
    update(canvas) {
        super.update(canvas)
    }
}

class Player extends Entity {
    constructor(position, size) {
        super(position, size, "Blue")
        this.speed = 20;
    }
    place(canvas) {
        super.place(canvas)
    }
    update(canvas) {
        super.update(canvas)
    }
    move(direction){
        if (direction === "Left"){
            if (this.position.x <= 0){
                this.position.x = 0
            } else {
                this.position.x -= this.speed;
            }
        }
        else if (direction === "Right"){
            if (this.position.x + this.size >= window.max_width){
                this.position.x = window.max_width - this.size
            } else {
                this.position.x += this.speed;
            }
        }
        else if (direction === "Up"){
            if (this.position.y <= 0){
                this.position.y = 0
            } else {
                this.position.y -= this.speed;

            }
        }
        else if (direction === "Down"){
            if (this.position.y + this.size >= window.max_height){
                this.position.y = window.max_height - this.size;
            } else {
                this.position.y += this.speed;
            }
        }
    }
}
Player.MOVES = {LEFT: "Left", RIGHT: "Right", UP: "Up", DOWN: "Down", STAY: "Stay"}

class Controller {
    constructor(player){
        document.addEventListener('keydown', function(event) {
            if(event.keyCode == Controller.KEYS.LEFT) {
                player.move(Player.MOVES.LEFT)
            }
            else if(event.keyCode == Controller.KEYS.RIGHT) {
                player.move(Player.MOVES.RIGHT)
            }
            else if(event.keyCode == Controller.KEYS.UP) {
                player.move(Player.MOVES.UP)
            }
            else if(event.keyCode == Controller.KEYS.DOWN) {
                player.move(Player.MOVES.DOWN)
            }
        });
    }



}
Controller.KEYS = { LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40}

let game = new Game(canvas);
