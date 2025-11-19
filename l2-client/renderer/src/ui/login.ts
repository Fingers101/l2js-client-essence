import { AdvancedDynamicTexture, Button, Control, StackPanel, TextBlock } from "@babylonjs/gui";

export function createLoginButton(gui: AdvancedDynamicTexture, onClick: () => void) {
  const panel = new StackPanel();
  panel.width = "220px";
  panel.isVertical = true;
  panel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
  panel.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
  panel.paddingRight = "20px";
  panel.paddingBottom = "20px";

  const status = new TextBlock("status", "Idle");
  status.height = "40px";
  status.color = "#f5f5f5";
  status.fontSize = 18;
  status.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
  status.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;

  const button = Button.CreateSimpleButton("login", "Login Smoke Test");
  button.width = "220px";
  button.height = "60px";
  button.cornerRadius = 8;
  button.color = "white";
  button.background = "#4c6ef5";
  button.fontSize = 20;
  button.onPointerUpObservable.add(onClick);

  panel.addControl(button);
  panel.addControl(status);
  gui.addControl(panel);

  return {
    setStatus(text: string) {
      status.text = text;
    },
  };
}
