import type { LoginSmokeTestResult } from "@shared/types";

export type LoginAction = () => Promise<LoginSmokeTestResult>;

export interface LoginUiControls {
  button: HTMLButtonElement;
  statusLabel: HTMLSpanElement;
}

export const createLoginButton = (container: HTMLElement, onLogin: LoginAction): LoginUiControls => {
  const button = document.createElement("button");
  button.textContent = "Login Smoke Test";

  const statusLabel = document.createElement("span");
  statusLabel.className = "status-label";
  statusLabel.textContent = "Idle";

  const handleClick = async () => {
    button.disabled = true;
    statusLabel.textContent = "Connecting...";
    try {
      const result = await onLogin();
      statusLabel.textContent = result.message ?? (result.success ? "Success" : "Failed");
    } catch (error) {
      statusLabel.textContent = error instanceof Error ? error.message : `${error}`;
    } finally {
      button.disabled = false;
    }
  };

  button.addEventListener("click", () => {
    void handleClick();
  });

  container.appendChild(button);
  container.appendChild(statusLabel);

  return { button, statusLabel };
};
