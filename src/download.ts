import { execSync } from "child_process";
import { mkdirSync } from "fs";
import { CONFIGS, MATERIAL_SYMBOLS } from "./config";

const main = () => {
  console.log(`Ensuring source folder exists at ${CONFIGS.SRC_BASE_FOLDER}`);
  mkdirSync(CONFIGS.SRC_BASE_FOLDER, { recursive: true });

  const command = [
    "npx",
    "@material-design-icons/scripts@0.5.2",
    "download",
    "svg",
    "--symbols",
    `--weight ${MATERIAL_SYMBOLS.WEIGHT}`,
    `--size ${MATERIAL_SYMBOLS.OPTICAL_SIZE}`,
    `--to ${CONFIGS.SRC_BASE_FOLDER}`,
  ].join(" ");

  console.log("Downloading latest material icons...");
  console.log(`> ${command}`);

  try {
    execSync(command, { stdio: "inherit" });
    console.log("Icons downloaded successfully.");
  } catch (error) {
    console.error("Error downloading icons:", error);
    process.exit(1);
  }
};

main();
