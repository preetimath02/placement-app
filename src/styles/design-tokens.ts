export const colors = {
  background: '#F7F6F3',
  foreground: '#111111',
  accent: '#8B0000',
  success: '#4A7C59',
  warning: '#B8860B',
  muted: {
    DEFAULT: '#E8E6E1',
    foreground: '#6B6B6B',
  },
  border: '#D4D0C8',
} as const;

export const spacing = {
  '2': '8px',
  '4': '16px',
  '6': '24px',
  '10': '40px',
  '16': '64px',
} as const;

export const typography = {
  heading: {
    fontFamily: "Georgia, Cambria, 'Times New Roman', serif",
    lineHeight: 1.2,
  },
  body: {
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSize: '16px',
    lineHeight: 1.6,
  },
  maxTextWidth: '720px',
} as const;

export const transitions = {
  default: '150ms ease-in-out',
  slow: '200ms ease-in-out',
} as const;
