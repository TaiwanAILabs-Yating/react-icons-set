import prompts from "prompts";
import fs from "fs/promises";
import path from "path";
import {
  fromPackageName,
  toPackageName,
  weights,
  sizes,
  variants,
  validateSetting,
} from "./config";
import packageJson from "../package.json";

async function main() {
  const currentSetting = fromPackageName(packageJson.name);

  const response = await prompts([
    {
      type: "select",
      name: "WEIGHT",
      message: "Select icon weight",
      choices: weights.map((w) => ({
        title: String(w),
        value: w,
      })),
      initial: weights.indexOf(currentSetting.WEIGHT),
    },
    {
      type: "select",
      name: "OPTICAL_SIZE",
      message: "Select icon size",
      choices: sizes.map((s) => ({
        title: String(s),
        value: s,
      })),
      initial: sizes.indexOf(currentSetting.OPTICAL_SIZE),
    },
    {
      type: "select",
      name: "VARIANT",
      message: "Select icon variant",
      choices: variants.map((v) => ({
        title: v,
        value: v,
      })),
      initial: variants.indexOf(currentSetting.VARIANT),
    },
  ]);

  const newSetting = {
    WEIGHT: response.WEIGHT,
    OPTICAL_SIZE: response.OPTICAL_SIZE,
    VARIANT: response.VARIANT,
  };
  validateSetting(newSetting);

  const newPackageNameSuffix = toPackageName(newSetting);
  const newPackageName = `@ailabs-yating/react-material-symbols-${newPackageNameSuffix}`;

  if (newPackageName !== packageJson.name) {
    console.log(`Updating package name to: ${newPackageName}`);
    const newPackageJson = { ...packageJson, name: newPackageName };
    await fs.writeFile(
      path.resolve(__dirname, "../package.json"),
      JSON.stringify(newPackageJson, null, 2) + "\n"
    );
    console.log("package.json updated successfully.");
  } else {
    console.log("No changes detected. Package name remains the same.");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
