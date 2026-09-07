import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const OUT = path.join(process.cwd(), 'public', 'audio');
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const intro = `Hi, I'm Rishabh Pandey — a full-stack developer and AI engineer based in Delhi, India. I'm currently pursuing my Bachelor of Technology in Information Technology, and I specialize in building AI-integrated web applications and real-time computer vision systems. My recent work includes Virtus, an AI-powered interview coaching platform built on the Google Gemini API, and AI Sentinel, a real-time face recognition system using OpenCV. I'm certified in AWS Cloud Foundations and Oracle Java, and I've solved over sixty algorithm problems on LeetCode. I'm currently open to software engineering intern roles. Take a look around — and let's build something great together.`;

async function main() {
  const zai = await ZAI.create();
  const response = await zai.audio.tts.create({
    input: intro,
    voice: 'jam',
    speed: 0.95,
    response_format: 'wav',
    stream: false,
  });
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(new Uint8Array(arrayBuffer));
  const outPath = path.join(OUT, 'intro.wav');
  fs.writeFileSync(outPath, buffer);
  console.log('OK saved', outPath, buffer.length, 'bytes');
}

main().catch((e) => {
  console.error('FAIL', e);
  process.exit(1);
});
