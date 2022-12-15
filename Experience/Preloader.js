import { EventEmitter } from "events";
import GSAP from "gsap";

import Experience from "./Experience.js";
import convert from "./Utils/convertDivsToSpans";

export default class Preloader extends EventEmitter {
    constructor() {
        super();
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.world = this.experience.world;
        this.device = this.sizes.device;

        this.sizes.on("switchdevice", (device) => {
            this.device = device;
        })

        this.world.on("worldready", () => {
            this.setAssets();
            this.playIntro();
        })
    }

    setAssets() {
        convert(document.querySelector(".intro-text"))
        convert(document.querySelector(".hero-main-title"))
        convert(document.querySelector(".hero-main-description"))
        convert(document.querySelector(".hero-second-subheading"))
        convert(document.querySelector(".second-sub"))
        this.room = this.experience.world.room.actualRoom;
        this.roomChildren = this.experience.world.room.roomChildren;

        console.log(this.roomChildren);
    }

    firstIntro() {
        return new Promise((resolve) => {
            this.timeline = new GSAP.timeline();
            this.timeline.set(".animatedis", { y: 0, yPercent: 100 });

            this.timeline
            .to(".preloader", {
                opacity: 0,
                delay: 0.5,
                onComplete: () => {
                    document.querySelector(".preloader").classList.add("hidden")
                }
            })

            if (this.device === "desktop") {
                this.timeline.to(this.roomChildren.cube.scale, {
                    x: 0.8,
                    y: 0.8,
                    z: 0.8,
                    ease: "back.out(2.5)",
                    duration: 0.7,
                }).to(this.room.position, {
                    x: -1,
                    ease: "power1.out",
                    duration: 0.7,
                    
                })
            } else {
                this.timeline.to(this.roomChildren.cube.scale, {
                    x: 0.8,
                    y: 0.8,
                    z: 0.8,
                    ease: "back.out(2.5)",
                    duration: 0.7,
                }).to(this.room.position, {
                    z: -1,
                    ease: "power1.out",
                    duration: 0.7,
                    
                })
            }
            this.timeline
            .to(".intro-text .animatedis", {
                yPercent: -100,
                stagger: 0.05,
                ease: "back.out(1.7)",
                onComplete: resolve,
            })
            .to(
                ".arrow-svg-wrapper",
                {
                    opacity: 1,
                },
                "same"
            )
            .to(
                ".toggle-bar",
                {
                    opacity: 1,
                    onComplete: resolve,
                },
                "same"
            );
        })
    }
    secondIntro() {
        return new Promise((resolve) => {

            this.secondTimeline = new GSAP.timeline();

            this.secondTimeline
            .to(".intro-text .animatedis", {
                yPercent: 100,
                stagger: 0.05,
                ease: "back.in(1.7)", 
            }, "fadeout")
            .to(
                ".arrow-svg-wrapper",
                {
                    opacity: 0,
                },
                "fadeout"
            )

            // if (this.device === "desktop") {
                this.secondTimeline.to(this.room.position, {
                    x: 0,
                    y: 0,
                    z: 0,
                    ease: "power1.out",
                }, "same").to(this.roomChildren.cube.rotation, {
                    y: 2 * Math.PI + Math.PI / 4
                }, "same").to(this.roomChildren.cube.scale, {
                    x: 3.5,
                    y: 3.5,
                    z: 3.5
                }, "same").to(this.camera.orthographicCamera.position, {
                    y: 5.65,
                }, "same").to(this.roomChildren.cube.position, {
                    x: -0.013723,
                    y: 0.3426,
                    z: 1.8332,
                }, "same")
                .to(this.roomChildren.cube.scale, {
                    x: 8,
                    y: 8,
                    z: 8,
                    ease: "back.out(3.2)"
                }, "staggerThese")
                .to(this.roomChildren.cube.rotation, {
                    y: -3* Math.PI / 4,
                    ease: "back.out(3.2)"
                }, "staggerThese")
                .to(this.roomChildren.base_table.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(3.2)"
                }, "staggerThese")
                .to(this.roomChildren.cube.position, {
                    z: -99,
                    ease: 'easeOutExpo(3.2)'
                }, "staggerThese")
                .to(".hero-main-title .animatedis", {
                    yPercent: 0,
                    stagger: 0.07,
                    ease: "back.out(1.7)",
                }, "staggerThese")
                .to(".hero-main-description .animatedis", {
                    yPercent: 0,
                    stagger: 0.05,
                    ease: "back.out(1.7)",
                }, "staggerThese")
                .to(".first-sub .animatedis", {
                    yPercent: 0,
                    stagger: 0.05,
                    ease: "back.out(1.7)",
                }, "staggerThese")
                .to(".second-sub .animatedis", {
                    yPercent: 0,
                    stagger: 0.05,
                    ease: "back.out(1.7)",
                }, "staggerThese")
                .to(this.roomChildren.accessory_tables.scale, { 
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(3.2)",
                    duration: 0.5,
                })  
                .to(this.roomChildren.owl_body.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(3.2)",
                    duration: 0.5,
                })  
                .to(this.roomChildren.cesca_chair_rattan.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(3.2)",
                    duration: 0.5,
                })  
                .to(this.roomChildren.old_polaroid.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(3.2)",
                    duration: 0.5,
                })  
                .to(this.roomChildren.vintage_phone.scale, {
                    x: 2,
                    y: 2,
                    z: 2,
                    ease: "back.out(3.2)",
                    duration: 0.5,
                })  
                .to(this.roomChildren.old_computer_02.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(3.2)",
                    duration: 0.5,
                })
                .to(".arrow-svg-wrapper", {
                    opacity: 1,
                    onComplete: resolve,
                });
            // } else {
            //     this.secondTimeline.to(this.room.position, {
            //         x: 0,
            //         y: 0,
            //         z: 0,
            //         ease: "power1.out",
            //         duration: 0.7,
            //     })
            //     this.secondTimeline.to(this.room.position, {
            //         x: 0,
            //         y: 0,
            //         z: 0,
            //         ease: "power1.out",
            //     }, "same").to(this.roomChildren.cube.rotation, {
            //         y: 2 * Math.PI + Math.PI / 4
            //     }, "same").to(this.roomChildren.cube.scale, {
            //         x: 2,
            //         y: 2,
            //         z: 2
            //     }, "same").to(this.camera.orthographicCamera.position, {
            //         y: 5.65,
            //     }, "same").to(this.roomChildren.cube.position, {
            //         x: -0.013723,
            //         y: 0.3426,
            //         z: 0.4332,
            //     }, "same")
            //     .to(this.roomChildren.cube.scale, {
            //         x: 7,
            //         y: 7,
            //         z: 7,
            //         ease: "back.out(3.2)"
            //     })
            //     .to(this.roomChildren.cube.rotation, {
            //         y: -3* Math.PI / 4,
            //         ease: "back.out(3.2)"
            //     })
            //     .to(this.roomChildren.base_table.scale, {
            //         x: 1,
            //         y: 1,
            //         z: 1,
            //         ease: "back.out(3.2)"
            //     })
            //     .to(this.roomChildren.cube.position, {
            //         z: -99,
            //         ease: 'easeOutExpo(3.2)'
            //     })
            //     .to(this.roomChildren.accessory_tables.scale, {
            //         x: 1,
            //         y: 1,
            //         z: 1,
            //         ease: "back.out(3.2)",
            //         duration: 0.5,
            //     })  
            //     .to(this.roomChildren.owl_body.scale, {
            //         x: 1,
            //         y: 1,
            //         z: 1,
            //         ease: "back.out(3.2)",
            //         duration: 0.5,
            //     })  
            //     .to(this.roomChildren.cesca_chair_rattan.scale, {
            //         x: 1,
            //         y: 1,
            //         z: 1,
            //         ease: "back.out(3.2)",
            //         duration: 0.5,
            //     })  
            //     .to(this.roomChildren.old_polaroid.scale, {
            //         x: 1,
            //         y: 1,
            //         z: 1,
            //         ease: "back.out(3.2)",
            //         duration: 0.5,
            //     })  
            //     .to(this.roomChildren.vintage_phone.scale, {
            //         x: 2,
            //         y: 2,
            //         z: 2,
            //         ease: "back.out(3.2)",
            //         duration: 0.5,
            //     })  
            //     .to(this.roomChildren.old_computer_02.scale, {
            //         x: 1,
            //         y: 1,
            //         z: 1,
            //         ease: "back.out(3.2)",
            //         duration: 0.5,
            //         onComplete: resolve,
            //     })
            // }
        })
    }   

    onScroll(e) {
        if (e.deltaY > 0) {
            this.removeEventListeners();
            this.playSecondIntro();
        }
    }

    onTouch(e) {
        this.initialY = e.touches[0].clientY;
    }

    onTouchMove(e) {
        let currentY = e.touches[0].clientY;
        let difference = this.initialY - currentY;
        if (difference > 0) {
            console.log("swiped up");
            this.removeEventListeners();
            this.playSecondIntro();
        }
        this.initialY = null;
    }  
    
    removeEventListeners() {
        window.removeEventListener("wheel", this.scrollOnceEvent)
        window.removeEventListener("touchstart", this.touchStart)
        window.removeEventListener("touchmove", this.touchMove)
    }

    async playIntro() {
        this.scaleFlag = true;
        await this.firstIntro();
        this.moveFlag = true;
        this.scrollOnceEvent = this.onScroll.bind(this);
        this.touchStart = this.onTouch.bind(this);
        this.touchMove = this.onTouchMove.bind(this);
        window.addEventListener("wheel", this.scrollOnceEvent)
        window.addEventListener("touchstart", this.touchStart)
        window.addEventListener("touchmove", this.touchMove)
    }

    async playSecondIntro() {
        this.moveFlag = false;
        await this.secondIntro();
        this.scaleFlag = false;
        this.emit("enablecontrols");
    }

    move() {
        if (this.device === "desktop") {
            this.room.position.set(-1, 0, 0);
        } else {
            this.room.position.set(0, 0, -1);
        }
    }

    scale() {
        this.roomChildren.rectLight.width = 0;
        this.roomChildren.rectLight.height = 0;

        if (this.device === "desktop") {
            this.room.scale.set(0.11, 0.11, 0.11);
        } else {
            this.room.scale.set(0.07, 0.07, 0.07);
        }
    }

    update() {
        if (this.moveFlag) {
            this.move();
        }

        if (this.scaleFlag) {
            this.scale();
        }
    }

    
}