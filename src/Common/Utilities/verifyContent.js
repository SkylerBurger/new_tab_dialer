export default async function verifyContent(url, contentPrefix) {
  try {
    new URL(url); // throws if string cannot be parsed as a URL
    const response = await fetch(url);
    if (
      !response.ok ||
      !response.headers.get("Content-Type").startsWith(contentPrefix)
    ) {
      throw new Error();
    }
  } catch (e) {
    return false;
  }
  return true;
}
