export async function fetchData() {
  try {
    const dataLink = '';

    const response = await fetch(dataLink);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const weatherData = await response.json();
  } catch {
    console.error(`Failed to fetch data`, error);
    return [];
  }
}