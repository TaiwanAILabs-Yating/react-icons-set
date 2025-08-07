import { resolve } from "path";
import packageJson from "../package.json";

export const weights = [100, 200, 300, 400, 500, 600, 700, 800, 900];
export const sizes = [20, 24, 40, 48];
export const variants = ["rounded", "outlined", "sharp"];

export type MaterialSymbolsSetting = {
  WEIGHT: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  OPTICAL_SIZE: 20 | 24 | 40 | 48;
  VARIANT: "rounded" | "outlined" | "sharp";
};

export function fromPackageName(name: string): MaterialSymbolsSetting {
  const nameParts = name.match(/w(\d+)-s(\d+)-(\w+)$/);
  if (!nameParts) {
    throw new Error(
      `Could not parse weight, size, and variant from package name: ${name}`
    );
  }
  const [, weight, opticalSize, variant] = nameParts;

  const s = {
    WEIGHT: parseInt(weight, 10),
    OPTICAL_SIZE: parseInt(opticalSize, 10),
    VARIANT: variant,
  };
  validateSetting(s);
  return s;
}

export function validateSetting(
  setting: Record<keyof MaterialSymbolsSetting, any>
): asserts setting is MaterialSymbolsSetting {
  if (!variants.includes(setting.VARIANT)) {
    throw new Error(
      `Invalid variant "${setting.VARIANT}". Must be one of: ${variants.join(
        ", "
      )}.`
    );
  }

  if (!sizes.includes(setting.OPTICAL_SIZE)) {
    throw new Error(
      `Invalid optical size "${
        setting.OPTICAL_SIZE
      }". Must be one of: ${sizes.join(", ")}.`
    );
  }

  if (!weights.includes(setting.WEIGHT)) {
    throw new Error(
      `Invalid weight "${setting.WEIGHT}". Must be one of: ${weights.join(
        ", "
      )}.`
    );
  }
}

export function toPackageName(setting: MaterialSymbolsSetting): string {
  return `w${setting.WEIGHT}-s${setting.OPTICAL_SIZE}-${setting.VARIANT}`;
}

export const MATERIAL_SYMBOLS: MaterialSymbolsSetting = fromPackageName(
  packageJson.name
);

export const CONFIGS = {
  SRC_BASE_FOLDER: resolve(
    __dirname,
    "icon-sources",
    String(MATERIAL_SYMBOLS.WEIGHT),
    String(MATERIAL_SYMBOLS.OPTICAL_SIZE)
  ),
  SRC_FOLDER: resolve(
    __dirname,
    "icon-sources",
    String(MATERIAL_SYMBOLS.WEIGHT),
    String(MATERIAL_SYMBOLS.OPTICAL_SIZE),
    MATERIAL_SYMBOLS.VARIANT
  ),
  OUT_FOLDER: resolve(__dirname, "output"),
  ICON_NAME_PREFIX: "Icon",
  SVGR_OPTIONS: {
    icon: true,
    fill: "currentColor",
    "aria-hidden": true,
  },
} as const;
