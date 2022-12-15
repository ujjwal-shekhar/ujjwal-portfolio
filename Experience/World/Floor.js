import * as THREE from "three";
import GSAP from "gsap";

import Experience from "../Experience.js";

export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.setFloor();
        this.setCircles();
    }

    setFloor() {
        this.geometry = new THREE.PlaneGeometry(100, 100);
        this.material = new THREE.MeshStandardMaterial({
            color: 0xfea95e,

        });
        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.plane);
        this.plane.rotation.x = -Math.PI / 2;
        this.plane.position.y = -0.5;
        this.plane.receiveShadow = true;
    }

    setCircles() {
        const geometry = new THREE.CircleGeometry(5, 32);
        const material1 = new THREE.MeshStandardMaterial({ color: 0xe5a1aa });
        const material2 = new THREE.MeshStandardMaterial({ color: 0x7ad0ac });
        const material3 = new THREE.MeshStandardMaterial({ color: 0x8395cd });
        this.circleFirst = new THREE.Mesh(geometry, material1);
        this.circleSecond = new THREE.Mesh(geometry, material2);
        this.circleThird = new THREE.Mesh(geometry, material3);
        this.circleFirst.position.setY(this.plane.position.y - 0.01);
        this.circleSecond.position.setY(this.plane.position.y - 0.02);
        this.circleThird.position.setY(this.plane.position.y - 0.03);
        this.circleFirst.scale.set(0, 0, 0);
        this.circleSecond.scale.set(0, 0, 0);
        this.circleThird.scale.set(0, 0, 0);
        this.circleFirst.rotation.x = this.circleSecond.rotation.x = this.circleThird.rotation.x = -Math.PI / 2;
        this.circleFirst.receiveShadow = this.circleSecond.receiveShadow = this.circleThird.receiveShadow = true;
        this.scene.add(this.circleFirst);
        this.scene.add(this.circleSecond);
        this.scene.add(this.circleThird);
    }

    resize() { }

    update() {

    }

}