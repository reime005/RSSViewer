enum StorageObject {
  FAVORITES,
}

enum StorageStrings {
  EMPTY,
}

export type STORAGE_OBJECT_KEYS = keyof typeof StorageObject;

export type STORAGE_STRING_KEYS = keyof typeof StorageStrings;
