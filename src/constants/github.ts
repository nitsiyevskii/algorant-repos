export const ORGANIZATIONS = {
  perawallet: 'perawallet',
  algorandfoundation: 'algorandfoundation',
  algorand: 'algorand',
} as const;

export const ORGANIZATION_OPTIONS: Array<{ label: string; value: string }> = [
  { label: 'Pera Wallet', value: ORGANIZATIONS.perawallet },
  { label: 'Algorand Foundation', value: ORGANIZATIONS.algorandfoundation },
  { label: 'Algorand', value: ORGANIZATIONS.algorand },
];

