// physics.js

import RAPIER from "https://cdn.skypack.dev/@dimforge/rapier3d-compat";

let world;

export async function initPhysics() {

    await RAPIER.init();

    world = new RAPIER.World({
        x: 0,
        y: -9.81,
        z: 0
    });

    createFloor();

    return world;
}

function createFloor() {

    const groundBodyDesc =
        RAPIER.RigidBodyDesc.fixed()
            .setTranslation(0, -1, 0);

    const groundBody =
        world.createRigidBody(groundBodyDesc);

    const groundCollider =
        RAPIER.ColliderDesc.cuboid(
            20,
            1,
            20
        )
        .setRestitution(0.5)
        .setFriction(1);

    world.createCollider(
        groundCollider,
        groundBody
    );
}

export function stepPhysics() {

    if (!world) return;

    world.step();
}

export function getWorld() {
    return world;
}

export function createDiceBody(
    x,
    y,
    z,
    radius = 1
) {

    const bodyDesc =
        RAPIER.RigidBodyDesc
            .dynamic()
            .setTranslation(
                x,
                y,
                z
            );

    const body =
        world.createRigidBody(
            bodyDesc
        );

    const collider =
        RAPIER.ColliderDesc
            .ball(radius)
            .setDensity(1)
            .setRestitution(0.6)
            .setFriction(0.8);

    world.createCollider(
        collider,
        body
    );

    return body;
}

export function removeBody(body) {

    if (!body) return;

    world.removeRigidBody(body);
}

export function throwBody(body) {

    if (!body) return;

    body.setLinvel(
        {
            x:(Math.random()-0.5)*8,
            y:8+Math.random()*4,
            z:(Math.random()-0.5)*8
        },
        true
    );

    body.setAngvel(
        {
            x:(Math.random()-0.5)*20,
            y:(Math.random()-0.5)*20,
            z:(Math.random()-0.5)*20
        },
        true
    );
}

export function bodySleeping(body) {

    const lv = body.linvel();
    const av = body.angvel();

    const linear =
        Math.sqrt(
            lv.x*lv.x +
            lv.y*lv.y +
            lv.z*lv.z
        );

    const angular =
        Math.sqrt(
            av.x*av.x +
            av.y*av.y +
            av.z*av.z
        );

    return (
        linear < 0.05 &&
        angular < 0.05
    );
}