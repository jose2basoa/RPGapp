export const mainJs = `
let dice = [];

const diceElements = {};

function sendState() {
  const total = dice.reduce(
    (sum, d) => sum + (Number(d.value) || 0),
    0
  );

  if (window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        type: "ROLL_RESULT",
        dice,
        total,
      })
    );
  }
}

function createDiceElement(diceObj) {
  const table = document.getElementById("table");

  const container = document.createElement("div");
  container.className = "dice-container";

  const cube = document.createElement("div");
  cube.className = "dice";
  cube.style.transformStyle = "preserve-3d";

  const faces = [
    "front",
    "back",
    "left",
    "right",
    "top",
    "bottom",
  ];

  faces.forEach((faceName) => {
    const face = document.createElement("div");

    face.className = "face " + faceName;

    if (faceName === "front") {
      face.textContent = "?";
    }

    cube.appendChild(face);
  });

  container.appendChild(cube);
  table.appendChild(container);

  diceElements[diceObj.id] = {
    cube,
    container,
  };

  cube.style.opacity = "1";

  cube.style.transform =
    "translateX(700px) translateY(300px) rotateX(-1440deg) rotateY(-1080deg) scale(.2)";

  container.onclick = () => {
    cube.style.opacity = "0";

    cube.style.transform =
      "translateX(700px) translateY(300px) rotateX(-1440deg) rotateY(-1080deg) scale(.2)";

    setTimeout(() => {
      dice = dice.filter((d) => d.id !== diceObj.id);

      container.remove();

      delete diceElements[diceObj.id];

      layoutDice();

      sendState();
    }, 900);
  };

  layoutDice();
}

function animateDice(diceObj) {
  const ref = diceElements[diceObj.id];

  if (!ref) return;

  const cube = ref.cube;

  cube.style.transform =
    "translateY(-30px) rotateX(720deg) rotateY(720deg) scale(1.15)";

  setTimeout(() => {
    cube.style.transform =
      "translateY(0px) rotateX(-20deg) rotateY(25deg) scale(1)";
  }, 900);
}

function setDiceValue(diceObj, value) {
  const ref = diceElements[diceObj.id];

  if (!ref) return;

  const frontFace = ref.cube.querySelector(".front");

  if (frontFace) {
    frontFace.textContent = value;
  }
}

function launchDice(diceObj) {
  const ref = diceElements[diceObj.id];

  if (!ref) return;

  const cube = ref.cube;

  cube.style.opacity = "1";

  cube.style.transform =
    "translateX(700px) translateY(300px) rotateX(-1440deg) rotateY(-1080deg) scale(.2)";
  
  requestAnimationFrame(() => {
    cube.style.transform =
      "translateX(0px) translateY(-40px) rotateX(-180deg) rotateY(220deg) scale(1.1)";
  });

  setTimeout(() => {
    cube.style.transform =
      "translateX(0px) translateY(0px) rotateX(-20deg) rotateY(25deg) scale(1)";
  }, 900);

  setTimeout(() => {
    const result =
      Math.floor(Math.random() * diceObj.sides) + 1;

    setDiceValue(diceObj, result);

    diceObj.value = result;

    sendState();
  }, 1200);
}

function rollDice(diceObj) {
  const ref = diceElements[diceObj.id];

  if (!ref) return;

  const cube = ref.cube;

  setDiceValue(diceObj, "?");

  animateDice(diceObj);

  const result =
    Math.floor(Math.random() * diceObj.sides) + 1;

  setTimeout(() => {
    cube.style.opacity = "0";

    setTimeout(() => {
      setDiceValue(diceObj, result);

      cube.style.opacity = "1";

      diceObj.value = result;
    }, 120);
  }, 780);
}

function receiveMessage(event) {
  let msg;

  try {
    msg = JSON.parse(event.data);
  } catch (error) {
    return;
  }

  switch (msg.type) {
    case "ADD_DICE": {
      const newDice = {
        id:
          typeof crypto !== "undefined" &&
          typeof crypto.randomUUID === "function"
            ? crypto.randomUUID()
            : Date.now().toString() + "-" + Math.random().toString(),
        sides: msg.sides,
        value: null,
      };

      dice.push(newDice);

      createDiceElement(newDice);

      launchDice(newDice);

      setTimeout(() => {
        layoutDice();
      }, 100);

      break;
    }

    case "ROLL_ALL":
      dice.forEach((diceObj) => {
        rollDice(diceObj);
      });

      setTimeout(() => {
        sendState();
      }, 1300);

      break;

    case "CLEAR":
      Object.values(diceElements).forEach((ref) => {
        ref.cube.style.opacity = "0";

        ref.cube.style.transform =
          "translateY(-150px) rotateX(540deg) rotateY(540deg) scale(.2)";
      });

      setTimeout(() => {
        Object.values(diceElements).forEach((ref) => {
          ref.container.remove();
        });

        for (const key in diceElements) {
          delete diceElements[key];
        }

        dice.length = 0;

        sendState();
      }, 900);

      break;
  }
}

document.addEventListener(
  "message",
  receiveMessage
);

window.addEventListener(
  "message",
  receiveMessage
);

sendState();

function layoutDice() {
  const total = dice.length;

  if (!total) return;

  let size = 180;

  if(total > 1)
  size = 150;

  if(total > 3)
  size = 130;

  if(total > 6)
  size = 110;

  if(total > 10)
  size = 95;

  if(total > 15)
  size = 80;

  if(total > 24)
  size = 65;

  let columns = 1;

  if(total <= 1)
  columns = 1;
  else if(total <= 3)
  columns = total;
  else if(total <= 6)
  columns = 3;
  else if(total <= 10)
  columns = 4;
  else if(total <= 15)
  columns = 5;
  else
  columns = 6;

  dice.forEach((diceObj, index) => {
    const ref =
      diceElements[diceObj.id];

    if (!ref) return;

    const row =
      Math.floor(index / columns);

    const col =
      index % columns;

    const rows =
      Math.ceil(total / columns);

    const x =
      (
        col -
        (columns - 1) / 2
      ) *
      (size + 25);

    const y =
      (
        row -
        (rows - 1) / 2
      ) *
      (size + 25);

    ref.container.style.left = "50%";
    ref.container.style.top = "50%";

    ref.container.style.width =
      size + "px";

    ref.container.style.height =
      size + "px";

    ref.container.style.transform =
      "translate(" + x + "px, " + y + "px)";

    ref.cube.style.width =
      size + "px";

    ref.cube.style.height =
      size + "px";

    ref.cube
      .querySelectorAll(".face")
      .forEach((face) => {
        face.style.width =
          size + "px";

        face.style.height =
          size + "px";

        const depth = size / 2;

        face.style.fontSize =
          Math.max(
            18,
            size * 0.28
          ) + "px";

        face.style.borderRadius =
          Math.max(
            10,
            size * 0.15
          ) + "px";

        if (
          face.classList.contains(
            "front"
          )
        ) {
          face.style.transform =
            "rotateY(0deg) translateZ(" + depth + "px)";
        }

        if (
          face.classList.contains(
            "back"
          )
        ) {
          face.style.transform =
            "rotateY(180deg) translateZ(" + depth + "px)";
        }

        if (
          face.classList.contains(
            "left"
          )
        ) {
          face.style.transform =
            "rotateY(-90deg) translateZ(" + depth + "px)";
        }

        if (
          face.classList.contains(
            "right"
          )
        ) {
          face.style.transform =
            "rotateY(90deg) translateZ(" + depth + "px)";
        }

        if (
          face.classList.contains(
            "top"
          )
        ) {
          face.style.transform =
            "rotateX(90deg) translateZ(" + depth + "px)";
        }

        if (
          face.classList.contains(
            "bottom"
          )
        ) {
          face.style.transform =
            "rotateX(-90deg) translateZ(" + depth + "px)";
        }
      });
  });
}
`;
