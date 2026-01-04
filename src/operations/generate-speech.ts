import { ElevenLabsContext, GenerateSpeechInput, GenerateSpeechOutput } from '../types';

export const generateSpeech =
    (context: ElevenLabsContext) =>
    async (input: GenerateSpeechInput): Promise<GenerateSpeechOutput> => {
        const { client, logger } = context;

        logger?.debug('elevenlabs:generateSpeech:start', { data: input });

        try {
            const audioStream = await client.textToSpeech.convert(input.voiceId, {
                text: input.text,
                modelId: input.model_id,
                voiceSettings: input.voice_settings,
            });

            // Convert ReadableStream to Buffer
            const reader = (audioStream as any).getReader();
            const chunks: Uint8Array[] = [];
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                chunks.push(value);
            }
            const audioBuffer = Buffer.concat(chunks);

            logger?.debug('elevenlabs:generateSpeech:success');

            return { audio: audioBuffer };
        } catch (error) {
            logger?.error('elevenlabs:generateSpeech:error', { error });
            throw error;
        }
    };
