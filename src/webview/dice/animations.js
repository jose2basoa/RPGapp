// dice.js

import * as THREE from "https://unpkg.com/three@0.168.0/build/three.module.js";

import {
    createDiceBody,
    removeBody
} from "./physics.js";

const dice = [];

function createMaterial() {

    return new THREE.MeshStandardMaterial({
        color: 0x4da6ff,
        metalness: 0.25,
        roughness: 0.35
    });
}

function createGeometry(sides) {

    switch (sides) {

        case 4:
            return new THREE.TetrahedronGeometry(1);

        case 6:
            return new THREE.BoxGeometry(
                2,
                2,
                2
            );

        case 8:
            return new THREE.OctahedronGeometry(
                1.4
            );

        case 12:
            return new THREE.DodecahedronGeometry(
                1.4
            );

        case 20:
            return new THREE.IcosahedronGeometry(
                1.4
            );

        default:
            return new THREE.BoxGeometry(
                2,
                2,
                2
            );
    }
}

function getRadius(sides) {

    switch (sides) {

        case 4:
            return 1;

        case 6:
            return 1.1;

        case 8:
            return 1.2;

        case 12:
            return 1.3;

        case 20:
            return 1.3;

        default:
            return 1;
    }
}

function generatePosition(index) {

    const cols = 5;

    const row =
        Math.floor(index / cols);

    const col =
        index % cols;

    return {
        x: (col - 2) * 3,
        y: 4,
        z: row * 3
    };
}

export function addDice(
    scene,
    sides
) {

    const pos =
        generatePosition(
            dice.length
        );

    const geometry =
        createGeometry(sides);

    const material =
        createMaterial();

    const mesh =
        new THREE.Mesh(
            geometry,
            material
        );

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    mesh.position.set(
        pos.x,
        pos.y,
        pos.z
    );

    scene.add(mesh);

    const body =
        createDiceBody(
            pos.x,
            pos.y,
            pos.z,
            getRadius(sides)
        );

    const die = {

        sides,

        mesh,

        body,

        result: 0
    };

    dice.push(die);

    return die;
}

export function removeDice(
    scene,
    mesh
) {

    const index =
        dice.findIndex(
            d => d.mesh === mesh
        );

    if (index === -1)
        return;

    const die =
        dice[index];

    scene.remove(
        die.mesh
    );

    removeBody(
        die.body
    );

    dice.splice(
        index,
        1
    );

    rearrangeDice();
}

export function rearrangeDice() {

    dice.forEach(
        (die, index) => {

            const pos =
                generatePosition(
                    index
                );

            die.body.setTranslation(
                {
                    x: pos.x,
                    y: 3,
                    z: pos.z
                },
                true
            );

            die.body.setLinvel(
                {
                    x: 0,
                    y: 0,
                    z: 0
                },
                true
            );

            die.body.setAngvel(
                {
                    x: 0,
                    y: 0,
                    z: 0
                },
                true
            );
        }
    );
}

export function syncDice() {

    dice.forEach(die => {

        const pos =
            die.body.translation();

        die.mesh.position.set(
            pos.x,
            pos.y,
            pos.z
        );

        const rot =
            die.body.rotation();

        die.mesh.quaternion.set(
            rot.x,
            rot.y,
            rot.z,
            rot.w
        );
    });
}

export function getDice() {
    return dice;
}

export function clearDice(scene) {

    while (dice.length) {

        const die =
            dice.pop();

        scene.remove(
            die.mesh
        );

        removeBody(
            die.body
        );
    }
}

export function generateResults() {

    let total = 0;

    const list = [];

    dice.forEach(die => {

        const value =
            Math.floor(
                Math.random() *
                die.sides
            ) + 1;

        die.result = value;

        total += value;

        list.push(
            `D${die.sides}: ${value}`
        );
    });

    return {
        total,
        text: list.join(" | ")
    };
}