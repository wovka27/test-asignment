export function formDataToObject<T extends Record<PropertyKey, string | string[]>>(
  fd: FormData
): T {
  const obj: T = {} as T;

  for (const [key, value] of fd.entries()) {
    const k = key as keyof T;
    if (obj[k] !== undefined) {
      if (!Array.isArray(obj[k])) {
        obj[k] = [obj[k] as string];
      }
      (obj[k] as string[]).push(value.toString());
    } else {
      obj[k] = value;
    }
  }

  return obj;
}
