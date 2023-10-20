trailColor = "#FF0000"; // Default to red
isEnabled = false;
trailSize = 10; // Default size
rippleSize = 50; // Default size
trailScale = 1; // Default scale
trailDisappearTime = 500; // Default to 500ms

function updateSettings(state, color, tSize, rSize, tScale, tTime) {
  console.log(
    "updateSettings called with",
    state,
    color,
    tSize,
    rSize,
    tScale,
    tTime
  ); // Debug log
  isEnabled = state;
  trailColor = color;
  trailSize = tSize;
  rippleSize = rSize;
  trailScale = tScale;
  trailDisappearTime = tTime;
}

document.addEventListener("mousemove", (e) => {
  if (!isEnabled) return;

  for (let i = 0; i < trailScale; i++) {
    const trail = document.createElement("div");
    trail.className = "trail";
    trail.style.width = trailSize + "px";
    trail.style.height = trailSize + "px";
    trail.style.top = e.pageY - trailSize / 2 + "px";
    trail.style.left = e.pageX - trailSize / 2 + "px";
    trail.style.backgroundColor = trailColor;
    document.body.appendChild(trail);
    setTimeout(() => {
      document.body.removeChild(trail);
    }, trailDisappearTime);
  }
});

document.addEventListener("click", (e) => {
  if (!isEnabled) return;

  const ripple = document.createElement("div");
  ripple.className = "ripple";
  ripple.style.width = rippleSize + "px";
  ripple.style.height = rippleSize + "px";
  ripple.style.top = e.pageY - rippleSize / 2 + "px";
  ripple.style.left = e.pageX - rippleSize / 2 + "px";
  ripple.style.backgroundColor = trailColor;
  document.body.appendChild(ripple);
  setTimeout(() => {
    document.body.removeChild(ripple);
  }, 1000);
});

// Call update settings with the temporary window variables
updateSettings(
  window.tempIsEnabled,
  window.tempTrailColor,
  window.tempTrailSize,
  window.tempRippleSize,
  window.tempTrailScale,
  window.tempTrailTime
);

// Cleanup temporary variables after using them
delete window.tempIsEnabled;
delete window.tempTrailColor;
delete window.tempTrailSize;
delete window.tempRippleSize;
delete window.tempTrailScale;
delete window.tempTrailTime;
