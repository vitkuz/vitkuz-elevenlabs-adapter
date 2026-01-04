import * as dotenv from 'dotenv';
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { createAdapter } from '../src/index';

dotenv.config({ path: join(__dirname, '../.env') });

const apiKey = process.env.ELEVENLABS_API_KEY;

if (!apiKey) {
    console.error('ELEVENLABS_API_KEY environment variable is required');
    process.exit(1);
}

const adapter = createAdapter(
    { apiKey },
    {
        debug: (msg, ctx) => console.log(`[DEBUG] ${msg}`, ctx),
        error: (msg, ctx) => console.error(`[ERROR] ${msg}`, ctx),
        info: (msg, ctx) => console.log(`[INFO] ${msg}`, ctx),
        warn: (msg, ctx) => console.warn(`[WARN] ${msg}`, ctx),
    },
);

async function main() {
    try {
        console.log('Testing generateSpeech with ElevenLabs...');
        const result = await adapter.generateSpeech({
            voiceId: 'JBFqnCBsd6RMkjVDRZzb', // George
            text: 'Hello from the new vitkuz elevenlabs adapter!',
            model_id: 'eleven_multilingual_v2',
        });

        console.log(`Received audio buffer of size: ${result.audio.length} bytes`);

        const resultPath = join(__dirname, 'generate-speech.result.mp3');
        await writeFile(resultPath, result.audio);
        console.log(`Saved audio result to ${resultPath}`);

        // Also save result metadata (if we had any other than audio)
        const metadataPath = join(__dirname, 'generate-speech.result.json');
        await writeFile(metadataPath, JSON.stringify({ size: result.audio.length }, null, 2));

        console.log('SUCCESS');
    } catch (error) {
        console.error('FAILED:', error);
        process.exit(1);
    }
}

main();
