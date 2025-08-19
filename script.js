
document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
  const output = document.getElementById('cli-output');
  const input = document.getElementById('cli-input');
  if (output && input) {
    const prompt = () => {
      output.innerHTML += `<span style="color: var(--accent)">$ </span>`;
    };
    // State variables for the CLI guessing game
    let gameMode = false;
    let secretNumber = null;
    const commands = {
      whoami: () => 'Swayam Bhargava\nFounder & builder. Former trader on the exotics desk (Morgan Stanley) and BITS Pilani grad.\nCurrently building exciting things in stealth.',
      projects: () => 'Current: MountainCreek Luxury Villa – a serene escape in Udaipur.
Upcoming: More ventures in the works… stay tuned.',
      socials: () => 'Instagram: https://www.instagram.com/swayambhargava
X/Twitter: https://x.com/SwayamBhargava
LinkedIn: https://www.linkedin.com/in/swayambhargava',
      random: () => {
        const facts = [
          'Productivity tip: The best ideas often come when you're not staring at a screen.',
          'Fun fact: I once presented a product design to 200+ people and lived to tell the tale.',
          'Random idea: How about a café where you can book meetings with strangers to share business ideas?'
        ];
        return facts[Math.floor(Math.random() * facts.length)];
      },
      // Provide up-to-date contact information
      contact: () => 'Email: swayam375@gmail.com\nLinkedIn: https://www.linkedin.com/in/swayambhargava',
      // Number guessing game command
      game: () => {
        gameMode = true;
        secretNumber = Math.floor(Math.random() * 100) + 1;
        return 'I\'m thinking of a number between 1 and 100. Enter your guess:';
      },
      help: () => 'Available commands:
whoami – Learn about me.
projects – What I'm working on.
socials – My online presence.
random – A random thought or idea.
contact – Get my contact details.\ngame – Play a guessing game.\nclear – Clear the screen.',
      clear: () => { output.innerHTML = ''; return ''; }
    };
    prompt();
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const txt = input.value.trim();
        output.innerHTML += `${txt}\n`;
        input.value = '';
        const cmd = txt.split(' ')[0];
        if (gameMode && !commands[cmd]) {
          // Handle guesses during game mode
          const guess = parseInt(txt, 10);
          if (isNaN(guess)) {
            output.innerHTML += 'Please enter a number between 1 and 100.\\n';
          } else if (guess === secretNumber) {
            output.innerHTML += 'Correct! You guessed the number. Type "game" to play again.\\n';
            gameMode = false;
          } else if (guess < secretNumber) {
            output.innerHTML += 'Higher!\\n';
          } else {
            output.innerHTML += 'Lower!\\n';
          }
        } else if (commands[cmd]) {
          const result = commands[cmd]();
          if (result) output.innerHTML += result + '\\n';
        } else if (txt) {
          output.innerHTML += `command not found: ${cmd}\\n`;
        }
        prompt();
        output.scrollTop = output.scrollHeight;
      }
    });
  }

  // Reveal animations for elements with the .reveal class
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all if IntersectionObserver isn't supported
    revealElements.forEach(el => el.classList.add('show'));
  }
});
