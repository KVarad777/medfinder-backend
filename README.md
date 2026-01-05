# MedFinder – Medicine Verification & Discovery System

MedFinder is a full-stack application designed to help users verify the authenticity of medicines and find nearby medical shops.  
The main goal of this project is to reduce the circulation of fake or illegally sold medicines by enabling QR-based verification and transparent tracking.

---

## Project Overview

Users can:
- Login using mobile number
- Scan QR codes printed on medicine packaging
- Verify whether a medicine is genuine, already sold, expired, or suspicious
- View medicine details such as batch number, expiry date, and brand
- Locate medical shops on a map
- Search medicines and see which shops have them available

Medical shops:
- Are registered and verified by the system
- Have their locations shown on the map
- Can be marked as verified, pending, or rejected

---

## Technology Stack

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- Hosted on Render

### Frontend (separate module)
- Flutter
- Android application
- Google Maps / OpenStreetMap
- QR scanning using mobile scanner

---

## Repository Structure

backend/
├── src/
│ ├── models/
│ ├── routes/
│ ├── utils/
├── apk/
│ └── MedFinder.apk
├── demo/
│ └── demo_video.mp4
├── server.js
├── package.json
└── README.md


---

## APK & Demo

- APK file is available in the `apk/` folder
- Demo video showing app functionality is available in the `demo/` folder

---

## Key Features

- QR-based medicine authentication
- Detection of already sold or illegally circulated medicines
- Medicine expiry and batch tracking
- Map-based display of medical shops
- Search and autocomplete for medicines
- Backend deployed and accessible via public API

---

## Deployment

Backend is deployed on Render and runs as a web service.  
The frontend Flutter app communicates with the backend using REST APIs.

---

## Purpose of the Project

This project is developed as part of an hackathon requirement  to demonstrate:
- Secure medicine tracking
- Backend and mobile app integration
- Real-world use of databases and APIs
- Prevention of counterfeit medicines

---

## Author

Developed by  
**Varad Khedkar**
**Member of team Neural Ninjas**
