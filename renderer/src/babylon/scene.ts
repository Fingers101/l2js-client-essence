import {
  ArcRotateCamera,
  Color3,
  Engine,
  HemisphericLight,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Vector3,
} from "@babylonjs/core";

export interface SceneBootstrap {
  engine: Engine;
  scene: Scene;
}

export const createScene = (canvas: HTMLCanvasElement): SceneBootstrap => {
  const engine = new Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
  const scene = new Scene(engine);
  scene.clearColor = new Color3(0.03, 0.05, 0.09);

  const camera = new ArcRotateCamera("camera", Math.PI / 2, Math.PI / 3, 20, Vector3.Zero(), scene);
  camera.attachControl(canvas, true);

  const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
  light.intensity = 0.8;

  const ground = MeshBuilder.CreateGround("ground", { width: 40, height: 40 }, scene);
  const groundMaterial = new StandardMaterial("groundMat", scene);
  groundMaterial.diffuseColor = new Color3(0.08, 0.12, 0.18);
  groundMaterial.specularColor = new Color3(0.1, 0.1, 0.1);
  ground.material = groundMaterial;

  const hero = MeshBuilder.CreateBox("hero", { size: 1.5 }, scene);
  hero.position.y = 0.75;
  const heroMaterial = new StandardMaterial("heroMat", scene);
  heroMaterial.diffuseColor = new Color3(0.9, 0.4, 0.2);
  hero.material = heroMaterial;

  engine.runRenderLoop(() => {
    scene.render();
  });

  window.addEventListener("resize", () => {
    engine.resize();
  });

  return { engine, scene };
};
