export default function useLocaleStorage(itemKey: string): any | null {
  const storage: any | null = localStorage.getItem(itemKey);
  if (typeof storage === null) {
    return null;
  }

  return storage;
}
