const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Функція для рекурсивного копіювання директорії
function copyDirectory(src, dest) {
  // Створюємо директорію призначення, якщо вона не існує
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  // Читаємо вміст директорії
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      // Рекурсивно копіюємо піддиректорії
      copyDirectory(srcPath, destPath);
    } else {
      // Копіюємо файл
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied: ${srcPath} -> ${destPath}`);
    }
  }
}

// Функція для оновлення шляхів до зображень та шрифтів у SCSS файлах
function updateImagePaths(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  let updated = false;

  // Регулярний вираз для пошуку шляхів до зображень
  // Шукаємо patterns: images/filename.ext, ./images/filename.ext, ../images/filename.ext, ../../images/filename.ext
  const imagePathRegex = /(["'])(\.\/|\.\.\/)*(images\/[^"']+)(["'])/g;

  content = content.replace(
    imagePathRegex,
    (match, quote1, dots, imagePath, quote2) => {
      updated = true;
      // Видаляємо "images/" з початку, бо ми додаємо повний шлях
      const fileName = imagePath.replace("images/", "");
      return `${quote1}/wp-content/themes/help/new/images/${fileName}${quote2}`;
    }
  );

  // Регулярний вираз для пошуку шляхів до шрифтів
  // Шукаємо patterns: FixelText/filename.woff2, ./FixelText/filename.woff2, ../FixelText/filename.woff2
  const fontPathRegex = /(["'])(\.\/|\.\.\/)*(FixelText\/[^"']+)(["'])/g;

  content = content.replace(
    fontPathRegex,
    (match, quote1, dots, fontPath, quote2) => {
      updated = true;
      return `${quote1}/wp-content/themes/help/new/fonts/${fontPath}${quote2}`;
    }
  );

  if (updated) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`Updated paths in: ${filePath}`);
  }

  return updated;
}

// Функція для рекурсивної обробки всіх SCSS файлів у директорії
function processScssFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      processScssFiles(fullPath);
    } else if (entry.isFile() && entry.name.endsWith(".scss")) {
      updateImagePaths(fullPath);
    }
  }
}

// Основна функція
function main() {
  const rootDir = __dirname;
  const newDir = path.join(rootDir, "new");

  console.log("=== Step 1: Copying files ===\n");

  // Копіюємо blocks
  const blocksSource = path.join(rootDir, "blocks");
  const blocksDest = path.join(newDir, "scss", "blocks");
  console.log("Copying blocks...");
  copyDirectory(blocksSource, blocksDest);

  // Копіюємо utils
  const utilsSource = path.join(rootDir, "utils");
  const utilsDest = path.join(newDir, "scss", "utils");
  console.log("\nCopying utils...");
  copyDirectory(utilsSource, utilsDest);

  // Копіюємо images
  const imagesSource = path.join(rootDir, "images");
  const imagesDest = path.join(newDir, "images");
  console.log("\nCopying images...");
  copyDirectory(imagesSource, imagesDest);

  // Копіюємо FixelText fonts
  const fontsSource = path.join(rootDir, "FixelText");
  const fontsDest = path.join(newDir, "fonts", "FixelText");
  console.log("\nCopying FixelText fonts...");
  copyDirectory(fontsSource, fontsDest);

  // Копіюємо style.scss
  const styleSource = path.join(rootDir, "style.scss");
  const styleDest = path.join(newDir, "scss", "style.scss");
  console.log("\nCopying style.scss...");
  fs.copyFileSync(styleSource, styleDest);
  console.log(`Copied: ${styleSource} -> ${styleDest}`);

  console.log("\n=== Step 2: Updating image paths ===\n");

  // Оновлюємо шляхи у blocks
  console.log("Updating paths in blocks...");
  processScssFiles(blocksDest);

  // Оновлюємо шляхи у utils
  console.log("\nUpdating paths in utils...");
  processScssFiles(utilsDest);

  // Оновлюємо шляхи у style.scss
  console.log("\nUpdating paths in style.scss...");
  updateImagePaths(styleDest);

  console.log("\n=== Step 3: Running build ===\n");

  // Переходимо до папки new і запускаємо білд
  const newScssDir = path.join(newDir, "scss");
  const newCssDir = path.join(newDir, "css");

  try {
    console.log("Building CSS from SCSS...");

    // Запускаємо sass для компіляції style.scss
    const sassCommand = `npx sass ${path.join(
      newScssDir,
      "style.scss"
    )}:${path.join(newCssDir, "style.css")} --style compressed`;

    console.log(`Running: ${sassCommand}`);
    execSync(sassCommand, {
      stdio: "inherit",
      cwd: rootDir,
    });

    console.log("✓ Build completed successfully!");
  } catch (error) {
    console.error("✗ Build failed:", error.message);
    process.exit(1);
  }

  console.log("\n=== Done! ===");
  console.log(
    "All files have been copied, image paths have been updated, and CSS has been built."
  );
}

// Запускаємо скрипт
main();
