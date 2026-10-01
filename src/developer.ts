/** Developer identity shown on the About screen and menu signature. */

export interface DevLink {
  label: string;
  url: string;
}

export const DEVELOPER = {
  name: 'Abbas Damerchi',
  title: 'Senior Full-Stack Software Engineer',
  bio: 'building distributed systems, automated e-commerce platforms and FinTech products',
  portrait: './developer.png',
  portraitAlt: 'Portrait of Abbas Damerchi',
  portfolio: {
    label: 'damerchi.ir',
    url: 'https://damerchi.ir',
  },
  socials: [
    { label: 'YouTube', url: 'https://YouTube.com/@Unique_Sources' },
    { label: 'X', url: 'https://x.com/abbasdamerchi' },
    { label: 'Facebook', url: 'https://www.facebook.com/abbasDamerchilo/' },
    { label: 'Instagram', url: 'https://www.instagram.com/irAbs174' },
    { label: 'Reddit', url: 'https://www.reddit.com/user/abbas-damerchi/' },
    { label: 'LinkedIn', url: 'https://LinkedIn.com/in/abbas-damerchi' },
    { label: 'Medium', url: 'https://abbas-damerchi.Medium.com' },
    { label: 'Blogsky', url: 'https://nahad1.blogsky.com/' },
    { label: 'Discord', url: 'https://discord.gg/DeHWVZRKS4' },
    { label: 'Telegram', url: 'https://t.me/Unique_Sources' },
  ] as const satisfies readonly DevLink[],
  homage:
    'An original homage to Battle City (Namco, 1985). This project shares no code, art, audio or other assets with the original | the visual identity, audio synthesis, level designs and game systems are all new work created for this repository.',
  origin: {
    title: 'THE ORIGINAL',
    gif: './battle-city-nes.gif',
    gifAlt: 'Title screen of Battle City on the NES / Famicom',
    lede: ['Some games are more than games.', 'They are memories.'],
    story: [
      'For many of us, Battle City was one of those rare classics | a simple screen, a little tank, a few blocks to destroy, and endless hours of imagination. We may have grown older, but somehow, the feeling of playing it for the first time never really left us.',
      'This project is our way of bringing that feeling back.',
      'We are rebuilding a modern, free version inspired by the original Battle City on the NES / Famicom | keeping the spirit, simplicity, and charm that made the classic so special, while giving it a new life for today.',
      'No forgotten childhood memories.\nNo lost moments.\nJust a classic feeling, rebuilt from the ground up.',
      'And this time, it belongs to everyone.',
      'The source code will be publicly available on GitHub soon, because classics are meant to be remembered, shared, and passed on.',
    ],
    dedication: [
      'For the game we grew up with.',
      'For the memories that never faded.',
      'For the next generation to discover.',
    ],
    signoff: 'Battle City | rebuilt with love.',
    wikipedia: {
      label: 'Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Battle_City',
    },
    github: {
      label: 'Source Code on GitHub (soon)',
      url: 'https://Github.com/irAbs174',
    },
  },
} as const;

