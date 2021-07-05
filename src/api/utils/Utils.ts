export const parseDataToString = <T>(json: string): T => JSON.parse(json);

export const normalizedString = (s: string): string => s.trim().toLowerCase();
