import { ArcRotateCamera, Color3, Engine, HemisphericLight, MeshBuilder, Scene, Vector3 } from "@babylonjs/core";
import { AdvancedDynamicTexture } from "@babylonjs/gui";

export function initScene(canvas: HTMLCanvasElement) {
  const engine = new Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
  const scene = new Scene(engine);
  scene.clearColor = new Color3(0.02, 0.03, 0.06);

  const camera = new ArcRotateCamera("camera", Math.PI / 2.5, Math.PI / 3, 20, Vector3.Zero(), scene);
  camera.attachControl(canvas, true);

  const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
  light.intensity = 0.9;

  const ground = MeshBuilder.CreateGround("ground", { width: 20, height: 20 }, scene);
  ground.position.y = -1;

  const hero = MeshBuilder.CreateBox("hero", { size: 1.5 }, scene);
  hero.position.y = 0.75;

  const guiTexture = AdvancedDynamicTexture.CreateFullscreenUI("ui", true, scene);

  engine.runRenderLoop(() => {
    scene.render();
  });

  window.addEventListener("resize", () => engine.resize());

  return { engine, scene, guiTexture };
}
