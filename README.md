# Attendance Management App

## Overview

This project is a React Native Expo application designed to manage student attendance, track class status, and provide summaries of classes for teachers. The application integrates with Firebase for data management.

## Features

- **Add/Edit Attendance:** Manage student attendance records.
- **Class Status Tracking:** View the status of classes.
- **Teacher Class Summary:** Display summaries of total classes for each teacher.

## Getting Started

### Prerequisites

- **Node.js:** Ensure Node.js is installed. You can download it from [Node.js official website](https://nodejs.org/).

  ```bash
  npm install -g expo-cli


## Installation
### Clone the Repository
 ```bash
git clone https://github.com/MohIdrees-Mohammadi/SmartAttendance.git
cd SmartAttendance

  ```bash
  npm install -g expo-cli

###Install Dependencies
```bash
npm install

##Configuration
###Firebase Configuration
Open the firebaseconfig.js file in the firebase directory and add your Firebase settings:
```bash
export default {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
  databaseURL: 'https://YOUR_PROJECT_ID.firebaseio.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT_ID.appspot.com',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId: 'YOUR_APP_ID',
  measurementId: 'YOUR_MEASUREMENT_ID'
};

##Running the Application
```bash
npm start
