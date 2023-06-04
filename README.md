# Routourist
Routourist is a route builder web application that aims to promote sustainable tourism. 

## DISCLAIMER!
As we do not wish to expose our API keys to the public, please be informed that they have been sent directly via email to the Google Solutions Challenge Team. If you would like to request for the .en file, please email us at [routourist3dc@gmail.com](mailto:routourist3dc@gmail.com). 

[Try Routourist Now!] 

## Features
- 🌎 Valuable, bite-sized information regarding the country of interest (law, culture, any sustainable events/businesses available)
- 🔎 Browse through our Route Library, a list of routes made by us through tge Preset Library or other users through the Community Library
- 🗺️ Enter a starting location and the destination(s), choose your preferred mode of transportation, and Routourist will generate an optimized (if chosen) route through every location!
- 📊 Statistics on the amount of carbon emissions generated from your route, with comparisons to the carbon emissions generated when other modes of transport are selected
- 📍 An option to optimise your route, which generates the shortest route through all inputted destinations (in an optimised order)
- 💡 Suggestions on nearby attractions and facilities along the created route, such as parks, sustainable hotels, water activities, bicycle rentals, electric vehicle charging spots etc.
- 🧑‍🤝‍🧑 Generate heat maps around attractions to see crowd levels
- ⛅ 2 hour/24 hour weather forecast view of different regions on the map
- 🚴 View public transit system and cyling paths on the map
- ☁️ Visualize 3D aerial interactive perspective of the destination, weather, traffic and crowd levels of the nearby attractions
- 💾 Save routes you have created for future use
- 📃 Share saved routes through a link and publish them into the Route Library

## About this project
Routourist is created for the [Google Solutions Challenge 2023](https://developers.google.com/community/gdsc-solution-challenge), targetting the UN Sustainable Development Goals 8.9: Promote Beneficial and Sustainable Tourism, and 12.B: Develop and Implement Tools to Monitor Sustainable Tourism. [View our demo video here](https://www.youtube.com/watch?v=CohbHAdULBE).

### Project Members
- Asyraf Omar (https://github.com/asycodes)
- Rachel Lim (https://github.com/rappleit)
- Andrew Yu (https://github.com/Gnoot01)

### Contact
Email: [routourist3dc@gmail.com](mailto:routourist3dc@gmail.com)

---
## Setup Guide

### Installation

Step 1: Clone the repo
```
git clone https://github.com/rappleit/routourist.git
```
Step 2: Install dependencies
```
npm install
```
Step 3: Create a new `.env` file from `.env.example`
```
copy .env.example .env
```
Step 3.1: Copy and paste the relevant API keys into the respective env variables. (See disclaimer regarding API Keys above)

Step 4: Run on the root directory
```
npm start
```
---
## Technologies used

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)


**Frontend:** React.js

**Map:** Google Maps Platform

**Backend:** Google Firebase
