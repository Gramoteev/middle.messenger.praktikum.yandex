export function queryStringify(data = {} ): string {
  return Object.entries(data).reduce((previousValue, [key, value]) =>
      `${previousValue}${previousValue ? '&': '?'}${key}=${value}`,
    ''
  );
}
