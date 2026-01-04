import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';

export interface Logger {
    debug: (message: string, context?: any) => void;
    error: (message: string, context?: any) => void;
    info: (message: string, context?: any) => void;
    warn: (message: string, context?: any) => void;
}

export interface ElevenLabsConfig {
    apiKey: string;
}

export interface ElevenLabsContext {
    client: ElevenLabsClient;
    logger?: Logger;
}

export interface GenerateSpeechInput {
    voiceId: string;
    text: string;
    model_id?: string;
    voice_settings?: {
        stability: number;
        similarity_boost: number;
        style?: number;
        use_speaker_boost?: boolean;
    };
}

/**
 * ElevenLabs returns a stream or a buffer.
 * For simplicity in the adapter, we will return the response as a Buffer.
 */
export interface GenerateSpeechOutput {
    audio: Buffer;
}
