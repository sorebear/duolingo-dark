window.addEventListener('keypress', (e) => {
  if (e.key = "d" && e.altKey) {
    var body = document.querySelector('body');
    if (body.classList.contains('dark-theme')) {
      body.classList.remove('dark-theme');
      checkScreen();
    } else {
      body.classList.add('dark-theme');
      checkScreen();
    }
  }
});

let currentPage = null;

setInterval(() => {
  if (window.location.href !== currentPage) {
    currentPage = window.location.href;
    checkScreen();
  }
}, 500);

function checkScreen() {
  if (currentPage === 'https://www.duolingo.com/learn') {
    learnScreen();
  } else if (currentPage.includes('www.duolingo.com/skill/')) {
    skillsTipScreen();
  }
}

function skillsTipScreen() {
  let attempts = 0;
  const checkInterval = setInterval(() => {
    attempts += 1;

    // Check if it's a Skills Explanation Page
    const skillExplanationSpans = document.querySelectorAll('.ff9NT span');

    if (skillExplanationSpans.length) {
      clearInterval(checkInterval);
      const darkTheme = document.querySelector('body').classList.contains('dark-theme');
      
      skillExplanationSpans.forEach((span) => {
        if (darkTheme && span.style.color === 'rgb(75, 75, 75)') {
          span.style.color = 'rgb(238, 238, 238)';
        } else if (!darkTheme && span.style.color === 'rgb(238, 238, 238)') {
          span.style.color = 'rgb(75, 75, 75)';
        }
      })
    }

    if (attempts > 20) {
      clearInterval(checkInterval);
    }
  }, 100);
}

function learnScreen() {
  let attempts = 0;
  const learnScreenInterval = setInterval(() => {
    attempts += 1;
    console.log('[learScreen attempt]', attempts);
    const crowns = document.querySelectorAll('img[alt="crown"');

    if (crowns.length && chrome.runtime) {
      clearInterval(learnScreenInterval);
      const darkTheme = document.querySelector('body').classList.contains('dark-theme');

      if (darkTheme) {
        const darkCrownUrl = chrome.runtime.getURL('icons/crown.svg');
        const darkCrackUrl = chrome.runtime.getURL('icons/crack.svg');

        document.querySelectorAll('._1m7gz').forEach((crackDiv) => {
          crackDiv.style.backgroundImage = `url(${darkCrackUrl})`;
        });
      
        crowns.forEach((img) => {
          img.setAttribute('original-url', img.src);
          img.src = darkCrownUrl;
        });
      } else {
        crowns.forEach((img) => {
          if (img.getAttribute('original-url')) {
            img.src = img.getAttribute('original-url');
          }
        });

        document.querySelectorAll('._1m7gz').forEach((crackDiv) => {
          crackDiv.style.backgroundImage = null;
        });
      }
    }

    if (attempts > 20) {
      clearInterval(learnScreenInterval);
    }
  }, 100);
}