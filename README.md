# Material Symbols for React

A comprehensive library of Material Symbols for React, offering both normal and filled icon sets in a single, easy-to-use package.

## Installation

Install your desired package variant using npm or yarn:

```bash
npm install @ailabs-yating/react-material-symbols-w400-s24-rounded
```

**Available Variants:**

- `@ailabs-yating/react-material-symbols-w400-s24-rounded`
- `@ailabs-yating/react-material-symbols-w400-s24-outlined`

> **Note:** You can also build the library from source and install it locally. See the [Build Process](#build-process) section for details.

## Usage

Import the desired icon and use it in your React components.

```jsx
import React from "react";
import { IconSearchFill } from "@ailabs-yating/react-material-symbols-w400-s24-rounded";

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

Each icon package contains two styles: normal and filled. The filled version has a `Fill` suffix.

- **Normal:** `<IconSearch />` (fill=`0`)
- **Filled:** `<IconSearchFill />` (fill=`1`)

## SVG Configuration

The icons are processed by [SVGR](https://react-svgr.com/) with the following default settings to ensure they are optimized and accessible:

```js
{
    "icon": true,          // Sets width and height to 1em
    "svgProps": {
      "fill": "currentColor", // Inherits color from the parent's CSS
      "aria-hidden": true   // Hides decorative icons from screen readers
    }
}
```

## Build Process

To build the library from source, follow these steps:

1.  **Install Dependencies**

    ```bash
    npm install
    ```

2.  **Select Icon Variant**
    Run the interactive script to choose your desired icon settings.

    ```bash
    npm run select
    ```

3.  **Build the Library**
    This command will download the SVGs, generate the React components, and bundle the package.

    ```bash
    npm run lucky-ball-go
    ```

    Alternatively, you can run the steps individually:

    ```bash
    npm run download # Download SVGs
    npm run generate # Generate component files
    npm run build    # Bundle the package with Vite/Rollup
    ```

4.  **Package the Library**
    Before packing, you may want to edit `package.json` to set a custom package name.

    ```bash
    npm pack
    ```

5.  **Install Locally in Your Project**
    Move the generated `.tgz` file to your project's root directory and install it.
    ```bash
    # Example command
    npm install ./ailabs-yating-react-material-symbols-w400-s24-outlined-1.0.1.tgz
    ```

> **Important:** Some `.gitignore` configurations exclude `*.tgz` files. If you intend to commit the local package to your repository, you may need to explicitly add it using `git add -f <your-package-file.tgz>`.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

This library is inspired by `lucide-react` and `material-symbols/svg`. It includes JSDoc annotations that allow modern IDEs to display a preview of the SVG icon on hover.
