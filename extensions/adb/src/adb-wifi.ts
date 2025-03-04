import { showHUD } from "@raycast/api";
import { execSync } from "child_process";
import checkAdbExists from "./utils";

export default async function wifi() {
  const adbDir = await checkAdbExists();
  const enabled = execSync(`${adbDir} shell settings get global wifi_on`).toString().trim() === "1";
  let toggleValue;
  if (enabled) {
    toggleValue = "disable";
    await showHUD("🛜 Turning off wifi");
  } else {
    toggleValue = "enable";
    await showHUD("🛜 Turning on wifi");
  }
  execSync(`${adbDir} shell svc wifi ${toggleValue}`);
}
