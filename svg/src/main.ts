import { readdir, writeFile, readFile, mkdir } from "node:fs/promises";
import path from "node:path";

const SRC_FOLDER = "icon-sources/rounded";
const OUT_FOLDER = "output";
const ICON_NAME_PREFIX = "Icon";

async function main() {
  const sourceDir = path.resolve(__dirname, SRC_FOLDER);
  const iconFiles = (await readdir(sourceDir)).filter((file) =>
    file.endsWith(".svg")
  );
  await mkdir(path.resolve(__dirname, OUT_FOLDER), { recursive: true });
  const indexFilePath = path.resolve(__dirname, OUT_FOLDER, "index.ts");
  await writeFile(indexFilePath, "", { flag: "w" });

  for (let i = 0; i < iconFiles.length; i++) {
    const svgFilePath = iconFiles[i];
    const svgFileFullPath = path.resolve(sourceDir, svgFilePath);
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
    await writeFile(path.resolve(__dirname, OUT_FOLDER, filename), template);
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
 * @preview ![img](data:image/svg+xml;base64,${svgBase64})
 * @link https://fonts.google.com/icons?icon.query=${toKebabCase(
   componentName
 ).replaceAll("-", "+")}
 */
export const ${ICON_NAME_PREFIX}${componentName} = C;
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
