import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const OUT_DIR = path.join(process.cwd(), 'public', 'images');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const zaiPromise = ZAI.create();

async function gen(prompt: string, name: string, size: string) {
  const exists = fs.existsSync(path.join(OUT_DIR, name));
  if (exists) {
    console.log('SKIP', name);
    return;
  }
  // simple retry with backoff
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const zai = await zaiPromise;
      const res = await zai.images.generations.create({ prompt, size });
      const b64 = res.data[0].base64;
      fs.writeFileSync(path.join(OUT_DIR, name), Buffer.from(b64, 'base64'));
      console.log('OK', name);
      return;
    } catch (e) {
      const msg = (e as Error).message;
      console.error(`FAIL (try ${attempt})`, name, msg);
      if (attempt < 4) {
        await new Promise((r) => setTimeout(r, 4000 * attempt));
      }
    }
  }
}

async function main() {
  // sequential to avoid 429
  await gen(
    'Modern AI interview coaching web app interface, dark mode dashboard, chat conversation bubbles, emerald green accents, mock interview UI with timer and feedback panel, clean professional SaaS design, product screenshot, high detail',
    'project-virtus.png',
    '1344x768'
  );
  await gen(
    'Real-time face recognition surveillance system interface, computer vision UI, bounding boxes around detected faces on video feed, emerald green detection overlays, dark technical dashboard, OpenCV style, professional, high detail',
    'project-sentinel.png',
    '1344x768'
  );
  await gen(
    'Sleek modern personal portfolio website homepage on a laptop screen, dark elegant theme with emerald accents, hero section with developer name, clean typography, professional web design showcase',
    'project-portfolio.png',
    '1344x768'
  );
  console.log('ALL DONE');
}

main();
