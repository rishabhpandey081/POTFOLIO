import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const OUT_DIR = path.join(process.cwd(), 'public', 'images');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

async function gen(prompt: string, name: string, size: string) {
  try {
    const zai = await ZAI.create();
    const res = await zai.images.generations.create({ prompt, size });
    const b64 = res.data[0].base64;
    fs.writeFileSync(path.join(OUT_DIR, name), Buffer.from(b64, 'base64'));
    console.log('✓', name);
  } catch (e) {
    console.error('✗', name, (e as Error).message);
  }
}

async function main() {
  await Promise.all([
    gen(
      'Professional portrait headshot of a confident young software engineer, soft studio lighting, neutral dark teal background, sharp focus, modern, approachable, high quality',
      'avatar.png',
      '1024x1024'
    ),
    gen(
      'Sleek analytics dashboard UI on a laptop screen, dark mode, emerald green charts and data visualizations, modern interface design, clean, professional product shot',
      'project-1.png',
      '1344x768'
    ),
    gen(
      'Modern e-commerce mobile app interface mockup, clean product grid, emerald accent colors, minimalist design, floating on soft gradient background, professional UI showcase',
      'project-2.png',
      '1344x768'
    ),
    gen(
      'AI chatbot conversation interface, dark themed UI with chat bubbles, glowing emerald accents, futuristic but clean, modern web app design, product screenshot',
      'project-3.png',
      '1344x768'
    ),
    gen(
      'Collaborative task management kanban board interface, cards with emerald labels, clean modern SaaS design, organized columns, professional UI screenshot',
      'project-4.png',
      '1344x768'
    ),
    gen(
      'Abstract code editor view with colorful syntax highlighting on dark background, emerald and teal tones, developer aesthetic, modern, high detail',
      'project-5.png',
      '1344x768'
    ),
    gen(
      'Real-time music streaming web player interface, album art, waveform progress bar, emerald accents, dark elegant UI, modern product design',
      'project-6.png',
      '1344x768'
    ),
  ]);
  console.log('done');
}

main();
