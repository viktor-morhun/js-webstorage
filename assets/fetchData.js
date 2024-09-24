export async function fetchData() {
  try {
    const dataLink = 'https://api.openweathermap.org/data/2.5/weather?lat=49.06&lon=33.34&appid=c1abf316beae57a6d1cfc5df2ac0f7a4';
    const response = await fetch(dataLink);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const weatherData = await response.json();
    return weatherData;
  } catch {
    console.error(`Failed to fetch data`, error);
    return {};
  }
}