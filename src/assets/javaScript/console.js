let valueConsole = true;

const displayWarning = () => {
  if (!valueConsole) {
    console.log(
      "%cCette page est une propriété privée !",
      "color: red; font-size: 24px; font-weight: bold;"
    );
    console.log(
      "%cTeamFlash est propriétaire du site donc il est strictement interdit de récupérer des ressources sans les accords demandés.",
      "color: white; font-size: 16px;"
    );
  }
};

const checkConsole = () => {
  console.log(
    "%cOk ! J’arrête de spam",
    "color: green; font-size: 30px; font-weight: bold;"
  );
  valueConsole = true;
  console.clear();
};

const isConsoleOpen = (() => {
  let opened = false;
  const threshold = 160;
  let initialCheckDone = false;

  const checkConsole = () => {
    const widthThreshold = window.outerWidth - window.innerWidth > threshold;
    const heightThreshold = window.outerHeight - window.innerHeight > threshold;
    const consoleCurrentlyOpen = widthThreshold || heightThreshold;

    if (consoleCurrentlyOpen && !opened) {
      if (initialCheckDone) {
        displayWarning();
      }
      opened = true;
    } else if (!consoleCurrentlyOpen && opened) {
      opened = false;
    }

    initialCheckDone = true;
  };

  // Initial check
  checkConsole();

  // Periodic check every 500ms
  setInterval(checkConsole, 1000);

  return () => opened;
})();

const checkConsoleInterval = setInterval(() => {
  if (isConsoleOpen()) {
    displayWarning(valueConsole);
  }
}, 500);
