trailColor = "#FF0000"; // Default to red
isEnabled = false;
trailSize = 6; // Default trail size
rippleSize = 30; // Default ripple size
trailScale = 1; // Default trail scale

function updateSettings(state, color, tSize, rSize, tScale) {
  console.log(
    "updateSettings called with HABLABLABLA",
    state,
    color,
    tSize,
    rSize,
    tScale
  ); // Debug log
  isEnabled = state;
  trailColor = color;
  trailSize = tSize;
  rippleSize = rSize;
  trailScale = tScale;
}

document.addEventListener("mousemove", (e) => {
  console.log("First call of Mouse moved");
  if (!isEnabled) return;
  console.log("Mouse moved");

  for (let i = 0; i < trailScale; i++) {
    const trail = document.createElement("div");
    trail.className = "trail";
    trail.style.backgroundColor = trailColor;
    trail.style.width = `${trailSize * 2}px`;
    trail.style.height = `${trailSize * 2}px`;
    trail.style.top = e.pageY - trailSize + "px";
    trail.style.left = e.pageX - trailSize + "px";
    document.body.appendChild(trail);
    setTimeout(() => {
      document.body.removeChild(trail);
    }, 500);
  }
});

document.addEventListener("click", (e) => {
  if (!isEnabled) return;
  const ripple = document.createElement("div");
  ripple.className = "ripple";
  ripple.style.backgroundColor = trailColor;
  ripple.style.width = `${rippleSize * 2}px`;
  ripple.style.height = `${rippleSize * 2}px`;
  ripple.style.top = e.pageY - rippleSize + "px";
  ripple.style.left = e.pageX - rippleSize + "px";
  document.body.appendChild(ripple);
  setTimeout(() => {
    document.body.removeChild(ripple);
  }, 1000);
});
