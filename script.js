const styles = {
  aesthetic: {
    prefixes: ['soft', 'glow', 'dream', 'cloud', 'velvet', 'moon', 'honey', 'angel'],
    suffixes: ['vibes', 'diary', 'dreams', 'bloom', 'angel', 'clouds', 'mood', 'core']
  },
  gamer: {
    prefixes: ['x', 'elite', 'shadow', 'pixel', 'ghost', 'rage', 'nova', 'vortex'],
    suffixes: ['plays', 'fps', 'zone', 'strike', 'snipes', 'boss', 'quest', 'mode']
  },
  funny: {
    prefixes: ['not', 'oops', 'tiny', 'chaos', 'silly', 'mega', 'lazy', 'spicy'],
    suffixes: ['gremlin', 'potato', 'noodle', 'waffle', 'goblin', 'pickle', 'bean', 'panic']
  },
  cute: {
    prefixes: ['baby', 'sweet', 'peachy', 'bunny', 'dolly', 'mini', 'cherry', 'sparkle'],
    suffixes: ['bear', 'boo', 'cakes', 'pop', 'kins', 'pie', 'bee', 'baby']
  },
  dark: {
    prefixes: ['void', 'dark', 'midnight', 'venom', 'raven', 'hex', 'grim', 'noir'],
    suffixes: ['shade', 'curse', 'bite', 'ghost', 'ritual', 'storm', 'blood', 'angel']
  },
  luxury: {
    prefixes: ['rich', 'gold', 'velvet', 'royal', 'gloss', 'diamond', 'luxe', 'caviar'],
    suffixes: ['club', 'era', 'society', 'diary', 'studio', 'mode', 'label', 'vault']
  },
  fantasy: {
    prefixes: ['elf', 'fairy', 'dragon', 'mystic', 'crystal', 'forest', 'starlit', 'spell'],
    suffixes: ['realm', 'witch', 'mage', 'sprite', 'kingdom', 'rune', 'quest', 'fable']
  }
};

function cleanWord(word) {
  return word.toLowerCase().replace(/[^a-z0-9]/g, '').trim() || 'star';
}

function randomFrom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function numberEnding() {
  const endings = ['', '', '', 'x', 'xo', '_', '.', Math.floor(Math.random() * 999).toString()];
  return randomFrom(endings);
}

function generateUsernames() {
  const keyword = cleanWord(document.getElementById('keyword').value);
  const style = document.getElementById('style').value;
  const platform = document.getElementById('platform').value;
  const chosen = styles[style];
  const results = new Set();

  while (results.size < 18) {
    const prefix = randomFrom(chosen.prefixes);
    const suffix = randomFrom(chosen.suffixes);
    const patterns = [
      `${prefix}${keyword}`,
      `${keyword}${suffix}`,
      `${prefix}.${keyword}`,
      `${keyword}_${suffix}`,
      `${prefix}_${keyword}_${suffix}`,
      `${keyword}${suffix}${numberEnding()}`,
      `${prefix}${keyword}${Math.floor(Math.random() * 99)}`,
      `the${keyword}${suffix}`,
      `${keyword}.${prefix}`
    ];
    results.add(randomFrom(patterns));
  }

  const resultsBox = document.getElementById('results');
  resultsBox.innerHTML = '';

  [...results].forEach(name => {
    const item = document.createElement('div');
    item.className = 'username';
    item.innerHTML = `<span>@${name}</span><button class="copy-btn">Copy</button>`;

    item.querySelector('button').addEventListener('click', async () => {
      await navigator.clipboard.writeText(name);
      item.querySelector('button').textContent = 'Copied!';
      setTimeout(() => item.querySelector('button').textContent = 'Copy', 1200);
    });

    resultsBox.appendChild(item);
  });

  document.title = `${platform} Username Generator | NameSpark AI`;
}

document.getElementById('generateBtn').addEventListener('click', generateUsernames);
document.getElementById('year').textContent = new Date().getFullYear();
generateUsernames();
