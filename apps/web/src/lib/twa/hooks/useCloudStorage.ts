import { useCallback, useMemo } from "react";

/**
 * This function provides `getItem` method from {@link localStorage} as Promise
 * @throws
 */
export type GetItemFunction = (key: string) => Promise<string>;

/**
 * This function provides `setItem` method from {@link localStorage} as Promise
 * @throws
 */
export type SetItemFunction = (key: string, value: string) => Promise<void>;

/**
 * This function provides `getItems` method from {@link localStorage} as Promise
 * @throws
 */
export type GetItemsFunction = (keys: string[]) => Promise<string[]>;

/**
 * This function provides `removeItem` method from {@link localStorage} as Promise
 * @throws
 */
export type RemoveItemFunction = (key: string) => Promise<void>;

/**
 * This function provides `removeItems` method from {@link localStorage} as Promise
 * @throws
 */
export type RemoveItemsFunction = (key: string[]) => Promise<void>;

/**
 * This function provides `getKeys` method from {@link localStorage} as Promise
 * @throws
 */
export type GetKeysFunction = () => Promise<string[]>;

/**
 * This hook provides {@link localStorage} object with promise functions,
 * so you don't have to use callback-style APIs.
 * @group Hooks
 */
const useCloudStorage = (): {
  getItem: GetItemFunction;
  setItem: SetItemFunction;
  getItems: GetItemsFunction;
  removeItem: RemoveItemFunction;
  removeItems: RemoveItemsFunction;
  getKeys: GetKeysFunction;
} => {
  const getItem: GetItemFunction = useCallback(async (key) => {
    const value = localStorage.getItem(key);
    if (value === null) {
      throw new Error(`Key '${key}' not found in localStorage`);
    }
    return value;
  }, []);

  const setItem: SetItemFunction = useCallback(async (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      throw new Error(`Failed to set item in localStorage: ${error}`);
    }
  }, []);

  const getItems: GetItemsFunction = useCallback(async (keys) => {
    const values: string[] = [];
    for (const key of keys) {
      const value = localStorage.getItem(key);
      if (value === null) {
        throw new Error(`Key '${key}' not found in localStorage`);
      }
      values.push(value);
    }
    return values;
  }, []);

  const removeItem: RemoveItemFunction = useCallback(async (key) => {
    localStorage.removeItem(key);
  }, []);

  const removeItems: RemoveItemsFunction = useCallback(async (keys) => {
    for (const key of keys) {
      localStorage.removeItem(key);
    }
  }, []);

  const getKeys: GetKeysFunction = useCallback(async () => {
    return Object.keys(localStorage);
  }, []);

  return useMemo(
    () => ({
      getItem,
      setItem,
      getItems,
      removeItem,
      removeItems,
      getKeys,
    }),
    []
  );
};

export { useCloudStorage };
