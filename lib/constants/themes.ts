export type AppThemeId = 'atlas' | 'ledger' | 'vault' | 'nocturne';

export type AppTheme = {
  id: AppThemeId;
  label: string;
  description: string;
  className: `theme-${AppThemeId}`;
  swatches: {
    background: string;
    surface: string;
    primary: string;
    positive: string;
    warning: string;
    danger: string;
  };
};

export const appThemes: AppTheme[] = [
  {
    id: 'atlas',
    label: 'Atlas',
    description: 'A calm blue palette for everyday financial tracking.',
    className: 'theme-atlas',
    swatches: {
      background: '#f8fafc',
      surface: '#ffffff',
      primary: '#2563eb',
      positive: '#16a34a',
      warning: '#d97706',
      danger: '#dc2626',
    },
  },
  {
    id: 'ledger',
    label: 'Ledger',
    description: 'Green-forward colors for income, growth, and account health.',
    className: 'theme-ledger',
    swatches: {
      background: '#f7fdfa',
      surface: '#ffffff',
      primary: '#059669',
      positive: '#15803d',
      warning: '#ca8a04',
      danger: '#b91c1c',
    },
  },
  {
    id: 'vault',
    label: 'Vault',
    description: 'A warm neutral base with a focused violet accent.',
    className: 'theme-vault',
    swatches: {
      background: '#fafaf9',
      surface: '#ffffff',
      primary: '#7c3aed',
      positive: '#16a34a',
      warning: '#ea580c',
      danger: '#e11d48',
    },
  },
  {
    id: 'nocturne',
    label: 'Nocturne',
    description: 'A dark palette for low-light review sessions.',
    className: 'theme-nocturne',
    swatches: {
      background: '#020617',
      surface: '#0f172a',
      primary: '#38bdf8',
      positive: '#4ade80',
      warning: '#fbbf24',
      danger: '#f87171',
    },
  },
];
