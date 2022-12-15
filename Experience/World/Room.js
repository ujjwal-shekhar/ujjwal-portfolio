import * as THREE from "three";
import GSAP from "gsap";

import Experience from "../Experience.js";

import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
 
export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;

        this.roomChildren = {}

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1, 
        }

        // this.screenMat = NaN;
        this.screenPosition = new THREE.Vector3(0,0,0);

        this.setModel();
        this.onMouseMove();

    }

    setModel() {
        this.actualRoom.children.forEach((child)=>{
            child.castShadow = true;
            child.receiveShadow = true;

            if (child.name === 'Old_computer_02') {
                child.children.forEach((child_lev1)=>{
                    if (child_lev1.name === 'Old_Computer_02-Freepolyorg') {
                        child_lev1.children.forEach((child_lev2)=>{
                            if (child_lev2.name === 'diannao') {
                                child_lev2.children.forEach((child_lev3)=>{
                                    if (child_lev3.name === 'Screen') {
                                        child_lev3.material = new THREE.MeshBasicMaterial({
                                            map: this.resources.items.screen,
                                            lightMapIntensity: 1,
                                        })
                                        child_lev3.getWorldPosition(this.screenPosition);
                                    }
                                })
                            }
                        })
                    }
                    
                })
            }

            // console.log(this.screenPosition);

            if (child instanceof THREE.Group) {
                // console.log("here2")
                child.children.forEach((groupChild) => {
                    groupChild.castShadow = true;
                    groupChild.recieveShadow = true;
                })
            }

            child.scale.set(0,0,0);
            if (child.name === "Cube") {
                console.log("cube is here")
                // child.scale.set(0.1,0.1,0.41; 
                child.position.set(0.079106, -0.185418, 2.25783);
                child.rotation.y = Math.PI / 4;
            }

            this.roomChildren[child.name.toLowerCase()] = child;
        });

        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.3,0.3,0.3);
        
        const width = 0.1;
        const height = 0.1;
        const intensity = 150;
        const rectLight = new THREE.RectAreaLight( 0xffffff, intensity,  width, height );

        rectLight.position.setX(this.screenPosition.x + 0.15);
        rectLight.position.setY(this.screenPosition.y + 0.625);
        rectLight.position.setZ(this.screenPosition.z - 0.1);

        this.roomChildren['rectLight'] = this.rectLight;

        rectLight.lookAt( this.screenPosition.x, this.screenPosition.y, 0 );
        this.actualRoom.add( rectLight )

        // const rectLightHelper = new RectAreaLightHelper( rectLight );
        // rectLight.add( rectLightHelper );
    }

     

    onMouseMove() {
        window.addEventListener('mousemove', (e) => {
            this.rotation = 
                ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
            this.lerp.target = this.rotation * 0.1;
        });
    }

    resize() {}

    update() {
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );
        this.actualRoom.rotation.y = this.lerp.current;
    }

}