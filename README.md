# React Icons Set - Material Symbols

A comprehensive Material Symbols library of SVG icons for React projects, bundling normal and filled icon sets into one easy-to-use package.

## Installation

Install the package using npm or yarn:

```bash
npm install @ailabs-yating/react-material-symbols-wght400-opsz24-rounded
# or
yarn add @ailabs-yating/react-material-symbols-wght400-opsz24-rounded
```

## Usage

Import icons from their respective sets. For example, to use a Font Awesome icon:

```jsx
import React from "react";
import { IconSearchFill } from "@ailabs-yating/react-material-symbols-wght400-opsz24-rounded";

const App = () => {
  return (
    <div>
      <h1>Welcome to my React App</h1>
      <IconSearchFill fontSize={16} className="text-red-500" />
    </div>
  );
};

export default App;
```

Each icon package contain two style, normal and filled. For example:

- `<IconSearch />` for fill `0`
- `<IconSearchFill />` for fill `1`

## Material SVG sources

Currently we provide:

`wght400-opsz24-rounded`: weight 400, optical size 24dp and rounded variant

## Props

The react icon is pre-configured with svgo option as following:

```js
{
    "icon": true, // width and height set to 1em,
    "fill": "currentColor", // will inherent the parents color
    "aria-hidden": true,
}
```

## Build Process

```sh
npm run lucky-ball-go
# or
npm run download # using @material-design-icons/scripts
npm run generate # generate the icons ts template
npm run build # using vite-rollup to bundle the package
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Note

This library is inspired by lucide-react and material-symbols/svg,
we provide the same svg img preview inside the jsdoc so IDE can show them when hover or selected.
