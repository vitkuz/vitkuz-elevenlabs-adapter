import { ElevenLabsConfig, Logger } from './types';
import { createElevenLabsClient } from './client';
import { generateSpeech } from './operations/generate-speech';

export const createAdapter = (config: ElevenLabsConfig, logger?: Logger) => {
    const client = createElevenLabsClient(config);
    const context = { client, logger };

    return {
        generateSpeech: generateSpeech(context),
    };
};
