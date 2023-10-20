let isEnabled = false;
let chosenColor = "#FF0000"; // Default to red
let chosenTrailSize = 6; // Default trail size
let chosenRippleSize = 30; // Default ripple size
let chosenTrailScale = 1; // Default trail scale
let chosenTrailDisappearTime = 500; // Default to 500ms

chrome.storage.local.get(
  [
    "isEnabled",
    "trailColor",
    "trailSize",
    "rippleSize",
    "trailScale",
    "trailDisappearTime",
  ],
  (data) => {
    if (data.hasOwnProperty("isEnabled")) {
      isEnabled = data.isEnabled;
    }
    if (data.hasOwnProperty("trailColor")) {
      chosenColor = data.trailColor;
    }
    if (data.hasOwnProperty("trailSize")) {
      chosenTrailSize = data.trailSize;
    }
    if (data.hasOwnProperty("rippleSize")) {
      chosenRippleSize = data.rippleSize;
    }
    if (data.hasOwnProperty("trailScale")) {
      chosenTrailScale = data.trailScale;
    }
    if (data.hasOwnProperty("trailDisappearTime")) {
      chosenTrailDisappearTime = data.trailDisappearTime;
    }

    document.getElementById("trailColor").value = chosenColor;
    document.getElementById("trailSize").value = chosenTrailSize;
    document.getElementById("rippleSize").value = chosenRippleSize;
    document.getElementById("trailScale").value = chosenTrailScale;
    document.getElementById("trailDisappearTime").value =
      chosenTrailDisappearTime;
    document.getElementById("toggleEffect").textContent = isEnabled
      ? "Disable"
      : "Enable";
  }
);

document.getElementById("trailColor").addEventListener("input", (event) => {
  chosenColor = event.target.value;
  chrome.storage.local.set({ trailColor: chosenColor });
  informTab();
});

document.getElementById("trailSize").addEventListener("input", (event) => {
  chosenTrailSize = parseFloat(event.target.value);
  chrome.storage.local.set({ trailSize: chosenTrailSize });
  informTab();
});

document.getElementById("rippleSize").addEventListener("input", (event) => {
  chosenRippleSize = parseFloat(event.target.value);
  chrome.storage.local.set({ rippleSize: chosenRippleSize });
  informTab();
});

document.getElementById("trailScale").addEventListener("input", (event) => {
  chosenTrailScale = parseFloat(event.target.value);
  chrome.storage.local.set({ trailScale: chosenTrailScale });
  informTab();
});

document
  .getElementById("trailDisappearTime")
  .addEventListener("input", (event) => {
    chosenTrailDisappearTime = parseInt(event.target.value);
    chrome.storage.local.set({ trailDisappearTime: chosenTrailDisappearTime });
    informTab();
  });

document.getElementById("toggleEffect").addEventListener("click", () => {
  isEnabled = !isEnabled;
  document.getElementById("toggleEffect").textContent = isEnabled
    ? "Disable"
    : "Enable";
  chrome.storage.local.set({ isEnabled: isEnabled });
  informTab();
});

function informTab() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0] && tabs[0].id) {
      // Set up temporary variables on the page for our script to use
      const setupVars = (
        isEnabled,
        chosenColor,
        chosenTrailSize,
        chosenRippleSize,
        chosenTrailScale,
        chosenTrailDisappearTime
      ) => {
        window.tempIsEnabled = isEnabled;
        window.tempTrailColor = chosenColor;
        window.tempTrailSize = chosenTrailSize;
        window.tempRippleSize = chosenRippleSize;
        window.tempTrailScale = chosenTrailScale;
        window.tempTrailDisappearTime = chosenTrailDisappearTime;
      };

      // Execute the setupVars function to set up temporary variables
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          func: setupVars,
          args: [
            isEnabled,
            chosenColor,
            chosenTrailSize,
            chosenRippleSize,
            chosenTrailScale,
            chosenTrailDisappearTime,
          ],
        },
        () => {
          // After setting up variables, inject our external file
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            files: ["inject.js"],
          });
        }
      );
    }
  });
}
