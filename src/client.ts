import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';
import { ElevenLabsConfig } from './types';

export const createElevenLabsClient = (config: ElevenLabsConfig): ElevenLabsClient => {
    return new ElevenLabsClient({
        apiKey: config.apiKey,
    });
};
