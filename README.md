# Delete First Result Extension

This extension adds a "Delete First Result" button at the top right corner on a Google search results page. With a button click, the extension grabs a first search result, runs a smooth fade out animation and then deletes it from a DOM. Developed by Vladyslav Dihtiarenko.

<img src="https://github.com/VladislavDegtyarenko/extension-delete-first-search-result/assets/62521930/f9629f4a-f9ef-4e54-9207-cc7c257c1846" style="width: 600px; height: auto;" />
<img src="https://github.com/VladislavDegtyarenko/extension-delete-first-search-result/assets/62521930/ae1ff9fa-8c6f-47e3-a43e-3eb10211b031" style="width: 600px; height: auto;" />


## Core Technologies

- [TypeScript](https://www.typescriptlang.org/)
- [fs-extra](https://www.npmjs.com/package/fs-extra)

## Works in

- Chrome
- Firefox

## Notes and comments about my implementation

### Bundling

Although I could use tools like **Webpack** or **Vite** to _automate_ some tasks and _minify_ the files, but I decided to simplify the things, because for that kind of small projects it wouldn't make a big difference. So I used **Typescript** to compile **typed javascript to native vanilla js** that browser can read. Also, I added a simple copy file processing for manifest, html and css files.

### Manifest

Different icon sizes for all cases:

```json
"icons": {
    "16": "icons/icon16.png",
    "32": "icons/icon32.png",
    "48": "icons/icon48.png",
    "128": "icons/icon128.png"
  },
```

To give a content script an access to the icons using `chrome.runtime.getURL()`, I specified "web_accessible_resources":

```json
"web_accessible_resources": [
    {
      "resources": ["/icons/*.png"],
      "matches": ["https://www.google.com/*"]
    }
  ],
```

### Content Script

The **main implementation**:

1. Select a div element with id `rcnt` that wraps a search results wrapper and optional side search results wrapper.

<img src="https://github.com/VladislavDegtyarenko/extension-delete-first-search-result/assets/62521930/72024d4c-7837-44a7-9939-767f1f5935c0" style="width: 800px; max-width:100%; height: auto;" />

2. Create a button using `DeleteButton` Class
3. Append a button to that `div#rcnt` using the following rules:
   a. if `div#rcnt` contains a side search results wrapper, add a button as a first child (prepend)
   b. otherwise, create a div container on the right side for our button

The DeleteButton has its own **methods**:

- `createButton()` - creates a DOM element for our button
- `updateButtonState()` - toggles 'disabled' state after each click, turns it on if no search results on the page
- `handleDeleteClick()` - selects a div element of the first search result, defines animation start css rules, adds .fade-out class that performs fade-out-animation (see styles.css) and removes element from DOM
- `getSearchResultHeight()` - to get search result wrapper height including margins. we use it for the fade out animation rules
- `render()` - renders our DeleteButton in the DOM following the logic:
  -- if `div#rcnt` (our element that wraps a search results wrapper and optional side search results wrapper) contains a sidebar, prepend the button to it.
  -- otherwise, create a button container on the right side and append a button to it

### Popup window

A simple and descriptive popup about the extension. Contains two screenshots that demonstrates how the button is placed in a couple of scenarious such as light/dark mode, with or without side search results container.

<img src="https://github.com/VladislavDegtyarenko/extension-delete-first-search-result/assets/62521930/72a5eb02-b543-4ffa-97c1-e7940c691fed" style="width:800px;height:auto;display:block"/>



## How to install the extension?

### In Google Chrome:

1. Go to [Extensions](chrome://extensions/)
2. Turn on **Developer mode**
3. Click **Load unpacked** and select a `/dist` folder inside the project folder

### In Mozilla Firefox:

1. Go to [about:debuggin](about:debugging) page
2. On the left side, switch to **This Firefox**
3. Сlick the **Load Temporary Add-on** button, then select any file in the extension's `dist/` directory

## How to build the unpacked extension?

1. Run `npm run build`
   Unpacked extension compiles at `dist/` dir.

## Project structure

### Core files

- package.json (development dependencies and scripts)
- manifest.json (extension metadata)
- tsconfig.json (TypeScript config)
- copy-files.js (copies the files into 'dist' dir)

### Popup files

- src/popup.html
- src/popup.css

### Content Script

- src/script.ts
- src/styles.css

### Extension Icons

- icons/\*.png

### Screenshots

- img/\*.png

## Contact info

[Portfolio Website](https://vddeveloper.online/)
[Telegram: @Vladislav_Degtyarenko](t.me/Vladislav_Degtyarenko)
[Email: vladislavdegtyarenko@gmail.com](mailto:vladislavdegtyarenko@gmail.com)
[Phone: +380977139295](tel:+380977139295)
