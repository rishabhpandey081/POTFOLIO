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
    console.log('OK', name);
  } catch (e) {
    console.error('FAIL', name, (e as Error).message);
  }
}

async function main() {
  await Promise.all([
    gen(
      'Professional portrait headshot of a confident young Indian male software engineer in his early twenties, short neat black hair, light stubble, wearing a smart dark casual shirt, soft studio lighting, dark teal emerald gradient background, sharp focus, modern, approachable, high quality corporate headshot',
      'avatar.png',
      '1024x1024'
    ),
    gen(
      'Modern AI interview coaching web app interface, dark mode dashboard, chat conversation bubbles, emerald green accents, mock interview UI with timer and feedback panel, clean professional SaaS design, product screenshot, high detail',
      'project-virtus.png',
      '1344x768'
    ),
    gen(
      'Real-time face recognition surveillance system interface, computer vision UI, bounding boxes around detected faces on video feed, emerald green detection overlays, dark technical dashboard, OpenCV style, professional, high detail',
      'project-sentinel.png',
      '1344x768'
    ),
    gen(
      'Sleek modern personal portfolio website homepage on a laptop screen, dark elegant theme with emerald accents, hero section with developer name and avatar, clean typography, professional web design showcase',
      'project-portfolio.png',
      '1344x768'
    ),
    gen(
      'Abstract dark emerald teal gradient background with subtle flowing network nodes and soft glowing particles, elegant minimal, tech aesthetic, deep moody lighting, high quality digital art',
      'hero-bg.png',
      '1440x720'
    ),
  ]);
  console.log('ALL DONE');
}

main();
