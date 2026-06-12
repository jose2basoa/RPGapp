export const styleCss = ` 
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  width: 100vw;
  height: 100vh;

  overflow: hidden;

  background: linear-gradient(180deg, #1f1f1f, #080808);
}

#table {
  width: 100%;
  height: 100%;

  position: relative;

  perspective: 1800px;
}

.dice-container {
  width: 90px;
  height: 90px;

  position: absolute;

  left: 50%;
  top: 50%;

  margin-left: -45px;
  margin-top: -45px;

  perspective: 1800px;

  cursor: pointer;

  transition: transform 0.8s ease;
}

.dice {
  position: relative;

  width: 90px;
  height: 90px;

  transform-style: preserve-3d;

  opacity: 0;

  transform: translateY(250px) rotateX(-180deg) rotateY(-180deg) scale(0.3);

  transition:
    transform 1.4s cubic-bezier(0.12, 0.8, 0.2, 1),
    opacity 0.4s ease;
}

.face {
  position: absolute;

  width: 90px;
  height: 90px;

  display: flex;

  align-items: center;
  justify-content: center;

  font-size: 28px;
  font-weight: bold;

  color: white;

  border-radius: 14px;

  border: 2px solid rgba(255, 255, 255, 0.15);

  background: linear-gradient(135deg, #4da3ff, #2166d8);

  box-shadow:
    inset 0 0 15px rgba(255, 255, 255, 0.15),
    0 10px 25px rgba(0, 0, 0, 0.4);

  backface-visibility: hidden;
}

.front {
  transform: rotateY(0deg) translateZ(45px);
}

.back {
  transform: rotateY(180deg) translateZ(45px);
}

.left {
  transform: rotateY(-90deg) translateZ(45px);
}

.right {
  transform: rotateY(90deg) translateZ(45px);
}

.top {
  transform: rotateX(90deg) translateZ(45px);
}

.bottom {
  transform: rotateX(-90deg) translateZ(45px);
}
`;

