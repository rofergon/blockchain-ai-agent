import { StructuredTool } from "@langchain/core/tools";

/**
 * Creates tools for interacting with weather APIs
 * @returns {Array<StructuredTool>} Array of weather tools
 */
export function createWeatherTools() {
  const getWeatherTool = new StructuredTool({
    name: "get_weather",
    description: "Get the current weather for a location",
    schema: {
      type: "object",
      properties: {
        location: {
          type: "string",
          description: "The location to get weather for (city name)",
        },
      },
      required: ["location"],
    },
    func: async ({ location }) => {
      try {
        // Using the OpenWeatherMap API as an example
        const apiKey = process.env.OPENWEATHERMAP_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&units=metric&appid=${apiKey}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Weather API returned ${response.status}`);
        }
        
        const data = await response.json();
        
        return JSON.stringify({
          location: data.name,
          country: data.sys.country,
          temperature: data.main.temp,
          description: data.weather[0].description,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
        }, null, 2);
      } catch (error) {
        return `Error fetching weather: ${error.message}`;
      }
    },
  });

  return [getWeatherTool];
} 