# TrailGo Outdoor Center Management Platform

## Description
Angular web application to manage reservations, check the current weather and monitor the capacity of TrailGo outdoor centers.

## Features
- Home view with the outdoor centers, their reservations, total participants and available capacity.
- New Reservation form with validations and current temperature from Open-Meteo.
- Capacity is checked again before saving a reservation.
- English and Spanish languages (English by default).
- Page not found view for unsupported routes.

## Stack
- Angular 22, TypeScript, Angular Material
- Angular Router, HttpClient, Angular Signals
- @ngx-translate/core and @ngx-translate/http-loader
- json-server 0.17.4
- Open-Meteo Weather API

## Configuration
```bash
npm install
cd server
json-server --watch db.json
```
In another terminal:
```bash
ng serve
```
Open http://localhost:4200

## Authorship
- Author: Oskar Sosa
- Student code: u202212214
- Repository: https://github.com/<your-user>/ea7747u202212214
# ea7747u202212214
# ea7747u202212214
