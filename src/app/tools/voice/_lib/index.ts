export const availableVoices = [
  "alloy",
  "echo",
  "fable",
  "onyx",
  "nova",
  "shimmer",
] as const;
export type AvailableVoice = (typeof availableVoices)[number];

export const availableTTSModels = ["tts-1", "tts-1-hd"] as const;
export type AvailableTTSModel = (typeof availableTTSModels)[number];
