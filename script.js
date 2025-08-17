
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
    const commands = {
      whoami: () => 'Swayam Bhargava
Founder & builder. Ex‑Morgan Stanley, BITS Pilani grad.
Currently building exciting things in stealth.',
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
      help: () => 'Available commands:
whoami – Learn about me.
projects – What I'm working on.
socials – My online presence.
random – A random thought or idea.
clear – Clear the screen.',
      clear: () => { output.innerHTML = ''; return ''; }
    };
    prompt();
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const txt = input.value.trim();
        output.innerHTML += `${txt}
`;
        input.value = '';
        const cmd = txt.split(' ')[0];
        if (commands[cmd]) {
          const result = commands[cmd]();
          if (result) output.innerHTML += result + '
';
        } else if (txt) {
          output.innerHTML += `command not found: ${cmd}
`;
        }
        prompt();
        output.scrollTop = output.scrollHeight;
      }
    });
  }
});
