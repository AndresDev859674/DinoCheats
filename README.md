# Dino ***Cheats*** 
`1.0 Stable` `Alpha 0.1`

---

This is DinoCheats, is a easy-friendly GUI for cheats for the Chrome Dino Game

> [!NOTE]
> This game is for people who just want to have fun playing the famous Google Dinosaur game... Or Changing the Game
> 
### Features

* **God Mode (Invincibility):** Never hit an obstacle again!
* **Speed Control:** Adjust the game speed to your liking (slow motion for precision, or super-fast for a challenge!).
* **Jump Height Modifier:** Control how high your Dino jumps.
*  **Gravity Control:** Change gravity and float!

---

### Installation

Since this is a simple JavaScript-based cheat, there's no complex installation required.

1.  **Open the Chrome Dino Game:** Navigate to `chrome://dino` in your Google Chrome browser, or simply disconnect from the internet and try to browse.
2.  **Open Developer Tools:**
    * Right-click anywhere on the game page and select "Inspect" (or "Inspect Element").
    * Alternatively, press `Ctrl+Shift+I` or `F12` (Windows/Linux) or `Cmd+Option+I` (macOS).
3.  **Go to the Console Tab:** In the Developer Tools panel, click on the "Console" tab.

4.  Now put the Code
     - This is the Code
  
```js
const scriptUrl = 'https://raw.githubusercontent.com/AndresDev859674/DinoCheats/refs/heads/main/alpha.js';

fetch(scriptUrl)
    .then(response => response.text())
    .then(scriptContent => {
        eval(scriptContent);
        console.log("Script executed!");
    })
    .catch(error => {
        console.error("Error loading or executing script:", error);
    });
```

---

### Documentation

![DinoCheats Docs](https://andres-studios.gitbook.io/dinocheats-docs)
