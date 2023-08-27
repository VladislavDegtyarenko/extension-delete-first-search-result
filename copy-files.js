const fs = require("fs-extra");

// Copy manifest.json
fs.copySync("src/manifest.json", "dist/manifest.json");

// Copy CSS files
fs.copySync("src/styles.css", "dist/styles.css");
fs.copySync("src/popup.css", "dist/popup.css");

// Copy HTML popup
fs.copySync("src/popup.html", "dist/popup.html");

// Copy the icons folder
fs.copySync("src/icons", "dist/icons");

// Copy the img folder
fs.copySync("src/img", "dist/img");
