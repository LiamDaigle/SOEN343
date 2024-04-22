# SOEN 343: Software Architecture and Design Project

## Team Members (Name, Student ID, GitHub Name):
- [Ahmad Elmahallawy](https://github.com/Ahmad-Elmahallawy) - 40193418 - Ahmad-Elmahallawy
- [Liam Daigle](https://github.com/LiamDaigle) - 40207583 - LiamDaigle
- [Clara Gagnon](https://github.com/clarag02) - 40208598 - clarag02
- [Gulnoor Kaur](https://github.com/gul2223) - 40114998 - gul2223
- [Vanessa DiPietrantonio](https://github.com/vanessadp17) - 40189938 - vanessadp17
- [Jessica Beauchemin](https://github.com/JBeauche) - 40188873 - JBeauche

# Smart Home System

## Video Demo For Sprint 3
Please note that there are few things we could not show in the video because of the video size and the limit we had with zoom recording. We are willing to show them to you during the lab this week
LINK:
https://youtu.be/UQIsmzmCTmk

## Introduction
A "Smart Home" system is a combination of hardware and software designed to automate tasks and services within a household. This technology provides homeowners with the ability to control various aspects of their homes remotely, enhancing convenience and efficiency in their daily lives. Examples include automating heating, lighting, ventilation, climate control, and other appliances connected to the Internet. However, orchestrating these connected devices poses challenges such as modularity, feature interaction, debugging, and understanding of the programming involved.

The Smart Home Simulator presented in this document offers a graphical representation of interactions between the household, devices, and IoT systems. It serves as an experimental platform to explore and find solutions to the challenges mentioned above. Researchers, students, and practitioners can use this simulator to experiment with deploying virtual smart home modules, observe their interactions with virtual tenants, and develop strategies to optimize smart home environments.

## Features
- Graphical representation of a house layout for simulation purposes.
- Dashboard interface for interacting with the simulated smart home system.
- Simulation parameters control, including date, time, weather, and user profiles.
- Support for multiple family profiles with varying permissions.
- Smart home modules for automation tasks such as security, heating, and lighting.
- Context modification during simulation, including user movement, room occupancy, and weather changes.
- Logging functionality for debugging and monitoring module activities.
- Core functionality for managing home items such as doors, windows, and lights.
- Security module with intrusion detection and notification capabilities.
- Heating module with zoning, temperature control, and energy-saving features.

## Installation
Follow these instructions to install and run the Smart Home System web application locally.

### Frontend Setup
1. Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2. Navigate to the frontend directory:
    ```bash
    cd phase2/SmartHomeSystem/frontend
    ```
3. Open the frontend code in Visual Studio Code:
    ```bash
    code .
    ```
4. Install the required Node.js modules:
    ```bash
    npm install
    ```
   or
    ```bash
    npm i
    ```
5. Start the frontend server:
    ```bash
    npm run dev
    ```
6. The frontend will be accessible at: [http://localhost:5173/](http://localhost:5173/)

### Database Setup
1. Ensure PostgreSQL is installed on your system.
2. Use a UI application like pgAdmin to create a new database with your preferred credentials.

### Backend Setup
1. Make sure you have IntelliJ IDEA and JDK version 17 or above installed.
2. Open IntelliJ IDEA and navigate to the backend directory `phase2/SmartHomeSystem/backend`
3. Update the database credentials in `application.properties` (you can find it in `src/main/resources/application.properties`).
4. Run the `SmartHomeSystemApplication.java` file.

## Usage
Once the application is running, you can access it through your web browser. Use the provided functionality to manage devices, monitor sensors, and automate tasks in your smart home.

## Technologies Used
- Frontend: React.js and Typescript
- Backend: Java Spring Boot
- Database: PostgreSQL
