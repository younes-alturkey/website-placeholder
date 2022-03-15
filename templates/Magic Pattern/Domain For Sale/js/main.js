/*
Theme Name: HUGE
Description: Creative Coming Soon Template
Author: SquirrelLabs
Author URI: https://themeforest.net/user/squirrellabs/portfolio?ref=SquirrelLab
Version: 1.0
License: https://themeforest.net/licenses/standard
*/

(async function () {
  // Uh oh! No Paint API support...
  if (CSS["paintWorklet"] === undefined) {
    // Let the user know they can't experiment with the pattern
    document.querySelector(
      ".prompt p"
    ).innerHTML = `Ah... the CSS Paint API is not supported in this browser — try Chrome or Edge!`;
  } else {
    CSS.paintWorklet.addModule(
      "https://unpkg.com/@georgedoescode/fluid-pattern-worklet"
    );

    setInterval(function(){
      document
        .querySelector(".worklet-canvas")
        .style.setProperty("--fluid-pattern-seed", Math.random() * 10000);
    }, 1500);
  }
})();
