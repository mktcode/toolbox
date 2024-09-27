export const availableVoices = [
  "alloy",
  "echo",
  "fable",
  "onyx",
  "nova",
  "shimmer",
] as const;
export type AvailableVoice = (typeof availableVoices)[number];
