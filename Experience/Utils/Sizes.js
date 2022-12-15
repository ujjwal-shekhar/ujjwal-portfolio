import {EventEmitter} from "events";

export default class Sizes extends EventEmitter {
    constructor() {
        super();
        this.width = window.innerWidth;       // Asssuming width and height take up
        this.height = window.innerHeight;     // .. 100% of the screen size
        this.aspect = this.width/this.height; 
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)
        this.frustrum = 5;

        if (this.width <= 968) {
            this.device = "mobile"
        } else {
            this.device = "desktop"
        }

        window.addEventListener("resize", () => { // Readjust size on resizing
            this.width = window.innerWidth;    
            this.height = window.innerHeight;
            this.aspect = this.width/this.height;
            this.pixelRatio = Math.min(window.devicePixelRatio, 2)
            this.emit("resize");

            if (this.width < 969 && this.device !== "mobile") {
                this.device = "mobile"
                this.emit("switchdevice", this.device)
            } else if (this.width >= 969 && this.device !== "desktop") {
                this.device = "desktop"
                this.emit("switchdevice", this.device)
            }
        })
    }
}