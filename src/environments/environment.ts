/**
 * Environment configuration for the TrailGo platform.
 * @author Oskar Sosa
 */
export const environment = {
  production: true,
  platformProviderApiBaseUrl: 'http://localhost:3000',
  platformProviderOutdoorCentersEndpointPath: '/outdoor-centers',
  platformProviderReservationsEndpointPath: '/reservations',
  weatherProviderApiBaseUrl: 'https://api.open-meteo.com/v1',
  weatherProviderForecastEndpointPath: '/forecast',
  defaultLanguage: 'en'
};
