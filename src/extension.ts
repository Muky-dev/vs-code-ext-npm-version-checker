import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import * as semver from "semver";

const output = vscode.window.createOutputChannel("NPM Version Checker");

export function activate(context: vscode.ExtensionContext) {
  const command = "npm-version-checker.checkVersions";

  // Executa ao abrir o VSCode no projeto
  checkVersions();

  // Manual command via Ctrl+Shift+P
  const disposable = vscode.commands.registerCommand(command, checkVersions);
  context.subscriptions.push(disposable);

  // Watch for file changes to execute something
  const watcher = vscode.workspace.createFileSystemWatcher("**/package.json");
  watcher.onDidChange(() => checkVersions());
  watcher.onDidCreate(() => checkVersions());
  context.subscriptions.push(watcher);
}

export function deactivate() {}

async function checkVersions() {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (!workspaceFolders) {
    vscode.window.showInformationMessage("No folders are open.");
    return;
  }

  const rootPath = workspaceFolders[0].uri.fsPath;
  const packageJsonPath = path.join(rootPath, "package.json");
  const nodeModulesPath = path.join(rootPath, "node_modules");

  if (!fs.existsSync(packageJsonPath)) {
    vscode.window.showErrorMessage("package.json not found.");
    return;
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  const dependencies = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  const mismatches: string[] = [];

  for (const [pkg, declaredVersion] of Object.entries(dependencies)) {
    const installedPkgPath = path.join(nodeModulesPath, pkg, "package.json");
    if (!fs.existsSync(installedPkgPath)) {
      mismatches.push(`❌ ${pkg} not installed.`);
      continue;
    }

    const installedJson = JSON.parse(fs.readFileSync(installedPkgPath, "utf8"));
    const installedVersion = installedJson.version;

    if (!semver.satisfies(installedVersion, declaredVersion as string)) {
      mismatches.push(
        `⚠️ ${pkg}: installed ${installedVersion} ≠ declared ${declaredVersion}`
      );
    }
  }

  if (mismatches.length > 0) {
    // Mostra no Output Channel
    output.clear();
    output.appendLine("🚨 Packages mismatches:");
    mismatches.forEach((msg) => output.appendLine(msg));
    output.show(true);

    vscode.window.showWarningMessage(
      `⚠️ ${mismatches.length} packages with mismatched versions. See output.`
    );
  } else {
    output.clear();
    vscode.window.showWarningMessage(
      "✅ node_modules is in sync with package.json versions"
    );
  }
}
