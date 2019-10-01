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
        this.bodies.push(cookie);

        this.cookie_collision = new Collision(cookie, player);

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
        if (this.cookie_collision.isCollision()) {
            // TODO: reposition method
            if (this.bodies[1].position.x === 200){
                this.bodies[1].position = {x: 20, y: 20}
            } else{
                this.bodies[1].position = {x: 200, y: 300}
            }
        }
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

class Collision {
    constructor(e1, e2) {
        // e1 and e2 are both Entities.
        this.e1 = e1;
        this.e2 = e2;
    }

    coordIsInBox(coord, box){
        let right_x = box.left_x + box.size;
        let bottom_y = box.upper_y + box.size;
        // console.log("box x" + box.left_x)
        // console.log("box y" + box.upper_y)
        // console.log("coord x" + coord.x)
        // console.log("coord y" + coord.y)

        if (box.left_x <= coord.x && coord.x <= right_x &&
            box.upper_y <= coord.y && coord.y <= bottom_y){
            return true
        }
    }

    isCollision() {
        // Only works if e1 is a bigger square
        // ie. doesn't account if e1 is completely engulfing e2
        let upper_left = {x: this.e1.position.x, y: this.e1.position.y};
        let upper_right = {x: this.e1.position.x + this.e1.size, y: this.e1.position.y};
        let bottom_left = {x: this.e1.position.x, y: this.e1.position.y + this.e1.size};
        let bottom_right = {x: this.e1.position.x + this.e1.size, y: this.e1.position.y + this.e1.size};
        let e2_box = {left_x: this.e2.position.x, upper_y: this.e2.position.y, size: this.e2.size};

        return (this.coordIsInBox(upper_left, e2_box) ||
                this.coordIsInBox(upper_right, e2_box) ||
                this.coordIsInBox(bottom_left, e2_box) ||
                this.coordIsInBox(bottom_right, e2_box)
            )
    }

}

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
