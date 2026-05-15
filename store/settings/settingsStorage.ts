import { createMMKV } from 'react-native-mmkv';
import type { StateStorage } from 'zustand/middleware';

import { SETTINGS_STORAGE_ID } from './keys';

const settingsStorage = createMMKV({
  id: SETTINGS_STORAGE_ID,
});

export const zustandSettingsStorage: StateStorage = {
  getItem: (name) => {
    return settingsStorage.getString(name) ?? null;
  },
  removeItem: (name) => {
    settingsStorage.remove(name);
  },
  setItem: (name, value) => {
    settingsStorage.set(name, value);
  },
};
