import { readdir, writeFile, readFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { CONFIGS, MATERIAL_SYMBOLS } from "./config";

async function main() {
  console.log(`SRC FOLDER exists at ${CONFIGS.SRC_FOLDER}`);
  const iconFiles = (await readdir(CONFIGS.SRC_FOLDER)).filter((file) =>
    file.endsWith(".svg")
  );
  await mkdir(CONFIGS.OUT_FOLDER, { recursive: true });
  const indexFilePath = path.resolve(CONFIGS.OUT_FOLDER, "index.ts");
  await writeFile(indexFilePath, "", { flag: "w" });

  for (let i = 0; i < iconFiles.length; i++) {
    const svgFilePath = iconFiles[i];
    const svgFileFullPath = path.resolve(CONFIGS.SRC_FOLDER, svgFilePath);
    const componentName = `${toPascalCase(path.basename(svgFilePath, ".svg"))}`;
    const filename = `${componentName}.ts`;

    console.log(
      `[${(i + 1)
        .toString()
        .padStart(String(iconFiles.length).length, "0")}/${iconFiles.length
        .toString()
        .padStart(String(iconFiles.length).length, "0")}] ${filename}`
    );

    const template = await generateTemplate({
      svgPath: svgFileFullPath,
      componentName,
    });

    // Write the generated template to the output folder
    await writeFile(path.resolve(CONFIGS.OUT_FOLDER, filename), template);
    // Append the export statement to the index file
    await writeFile(indexFilePath, `export * from './${componentName}';\n`, {
      flag: "a",
    });
  }

  console.log(
    `\nGenerated ${iconFiles.length} icon components in ${path.join(
      __dirname,
      "output"
    )}`
  );
}

const base64SVG = (svgContents: string) =>
  Buffer.from(
    svgContents
      .replace("\n", "")
      .replace(
        "<svg xmlns",
        '<svg style="background-color: #fff; border-radius: 2px" xmlns'
      )
  ).toString("base64");

const header = `${MATERIAL_SYMBOLS.VARIANT}, ${MATERIAL_SYMBOLS.WEIGHT} weight, ${MATERIAL_SYMBOLS.OPTICAL_SIZE}dp optical size`;

export async function generateTemplate({
  svgPath,
  componentName,
}: {
  svgPath: string;
  componentName: string;
}): Promise<string> {
  const svgString = await readFile(svgPath, "utf-8");
  const svgBase64 = base64SVG(svgString);

  return `
import C from '${svgPath}?react';
/**
 * ${header}
 * @preview ![img](data:image/svg+xml;base64,${svgBase64})
 * @link https://fonts.google.com/icons?icon.query=${toKebabCase(componentName)
   .replace(/-fill$/g, "")
   .replaceAll("-", "+")}
 */
export const ${CONFIGS.ICON_NAME_PREFIX}${componentName} = C;
`;
}

main();

////////////////////////////////////////////////////////////////////////

/**
 * Convert a type string from camelCase to PascalCase
 *
 * @example
 * type Test = CamelToPascal<'fooBar'> // 'FooBar'
 */
type CamelToPascal<T extends string> =
  T extends `${infer FirstChar}${infer Rest}`
    ? `${Capitalize<FirstChar>}${Rest}`
    : never;

/**
 * Converts string to kebab case
 *
 * @param {string} string
 * @returns {string} A kebabized string
 */
const toKebabCase = (string: string) =>
  string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

/**
 * Converts string to camel case
 *
 * @param {string} string
 * @returns {string} A camelized string
 */
const toCamelCase = <T extends string>(string: T) =>
  string.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2) =>
    p2 ? p2.toUpperCase() : p1.toLowerCase()
  );

/**
 * Converts string to pascal case
 *
 * @param {string} string
 * @returns {string} A pascalized string
 */
const toPascalCase = <T extends string>(string: T): CamelToPascal<T> => {
  const camelCase = toCamelCase(string);

  return (camelCase.charAt(0).toUpperCase() +
    camelCase.slice(1)) as CamelToPascal<T>;
};
