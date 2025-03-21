# Node Modules Version Checker

## Description

This Visual Studio Code extension helps ensure that the versions of packages installed in the `node_modules` directory match the versions specified in the `package.json` file of your project.

The main functionality is to compare the declared versions of dependencies in the `package.json` with the versions actually installed in the modules and show warnings if there are discrepancies.

## Features

- **Package version check**: Compares the versions of installed packages with the versions declared in `package.json`.
- **Discrepancy alerts**: Displays an alert in VSCode if any installed package does not match the version specified in `package.json`.
- **Manual command**: You can run the version check manually via the command `NPM Version Checker: Check Versions`.
- **Watcher**: The extension will automatically perform the check when the `package.json` file is modified.

## Installation

1. Open VSCode.
2. Go to the **Extensions** panel (Ctrl+Shift+X).
3. Search for **Node Modules Version Checker** and click **Install**.

Alternatively, if you're developing the extension locally, run the following commands:

```bash
git clone <repository_URL>
cd <project_directory>
npm install
npm run compile
```

## Usage

### Manual Command

1. Open the **Command Palette** (Ctrl+Shift+P).
2. Type `NPM Version Checker: Check Versions` and press Enter.

### Automatic Check

The version check will be performed automatically whenever the `package.json` file is modified.

### Check Results

- If any installed package does not match the version in `package.json`, a warning will appear in the **status bar** of VSCode, and the discrepancies will be listed in the **Output Channel**.

### Example of Alert:

```
🚨 Packages out of declared version:
⚠️ package-a: installed 1.2.3 ≠ declared 1.2.0
⚠️ package-b: installed 3.4.0 ≠ declared 3.4.1
```

### How It Works

1. The extension reads the dependencies from `package.json`.
2. It compares the versions of the dependencies with the versions installed in the `node_modules` directory.
3. If any discrepancies are found, the extension will display an alert.

## Contributing

Feel free to contribute! If you encounter any bugs or have suggestions, please open an **issue** or **pull request**.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
