# SOEN343
Smart home simulator
Introduction

A “Smart Home” system is a combination of hardware and software that allows homeowners to automate tasks and services through the help of connected software applications
It provides an escape from daily routines and mundane tasks.  Some examples are the automation of heating, lighting, ventilation, climate control as well as various other appliances that can be connected to the Internet.  Orchestrating all connected devices is essentially a programming task with all the problems and difficulties that programming entails, for example, modularity, feature interaction, debugging, and understanding.
The smart home simulator depicted in this document will help to experiment and find solutions to the problems mentioned above, by providing a graphical way to represent the interactions between the household, the devices, and the IoT system


Figure 1. A house layout example for the house

In Figure 1, we show an example of a house layout for the smart home simulator, and in Figure 2, we present a mock diagram of the smart home simulator system.




Figure 2. An example of the Smart home simulator system dashboard

Definitions, Acronyms, and Abbreviations
AC 
It stands for air conditioning
API
The term API is an acronym, and it stands for “Application Programming Interface.”API lists a bunch of operations that developers can use, along with a description of what they do. The developer doesn’t necessarily need to know how, for example, an operating system builds and presents a “Save As” dialog box. They just need to know that it’s available for use in their app.

Simulator’s user
The Simulator’s user is the main user of the simulator.  It is a researcher, student, or practitioner interested in experimenting with the deployment of virtual smart home modules in a home, and their interactions with the virtual tenants.  To test the simulator,  They must set the simulation parameters, which include adding the profiles of the people participating in the simulation, loading the house layout, and setting the temperature date and time of the simulation.  They can log in as any of the family profiles to interact during the simulation.  They can also create specific conditions by modifying the context of the simulation by adding/removing/changing the location of virtual tenants; changing the time/weather; and interfering with the normal behavior of smart devices, like obstructing the path of smart windows.

Family Profiles
Before starting the simulation, the simulator’s user must select a profile to log in to the simulator. This profile grants specific permissions to interact with the smart home modules as the home’s virtual person.  For example, parents, children, visitor,s or any other relevant user that could interact with the home.
Smart home simulator (SHS)
The following features allow us to run a simulation of the whole Smart home system, and interact with the different modules that conform the system.

SHS is responsible for providing an API where smart home modules can be subscribed to track environmental conditions like temperature inside and outside, date and time, as well as information regarding the layout of the house (number of rooms, windows, and lights); motion sensors to detect the presence of people in the rooms;  sensors in the windows and doors.  Smart modules use that information to perform their work.
Simulation parameters
House Layout 
SHS system should accept values to define the following parameters for starting the simulation
Date and  time
Weather inside and outside of the property
Add/remove/edit user profiles.  These will be used for granting/denying accessibility to actions performed by other system modules.  
Family  (Adults, children)
Guests
Strangers
Log in using an existing user profile
House Layout
The house layout encompasses all functionalities required to read and load a house-layout file on the simulator, including exception and error handling.
The layout house file is a text file providing information about the number and name of the rooms existing in a house.  For each room, the file specifies the number of windows, lights, and doors.  The layout is represented in the dashboard as a 2D layout drawing. 

The simulator will show/hide icons to represent actions happening in a room.  For example, an icon to represent that there is someone in the room, that the windows/ doors are open or closed, or lights are on/off.
Smart home dashboard
The smart home dashboard module is the graphic user interface, where users interact with the simulator.  It is always visible, and it consists of tabs that correspond to the different smart home modules, controls, and state of simulation parameters like temperature, date and time, etc.

More specifically, the dashboard contains the following elements:

It contains a horizontal tab bar with the smart modules registered in the house
It contains an area to display information about the simulation including:
a button to edit the context of the simulation
temperature (outside)
the current date and time
the current user logged in
a toggle button to start/stop the simulation
An output console to display the messages generated by the smart home modules
House view.  A 2D graphic representation of the house layout, that will be updated based on the executed commands.  For example, if a user turns on the light in a room, we could visualize an icon in the section that represents the room.  Or if the AC is turned on in a room, we could visualize an icon of a fan on the region that represents the room(s) where the AC was activated.

Context of the simulation

During simulation, the user can execute the following commands to modify the context of the simulation:
Modify the date and time
Move the logged user to another room
Place people in specific rooms, or outside the home
Modify the temperature outside the home
Block window movements by putting an arbitrary object
The simulated time speed can be increased or decreased 

Smart home modules
Smart home modules are independent components, which are represented as tab in the dashboard, that automatize home tasks trivial daily tasks to make life more pleasant for the family

When adding a new module, you need to provide the following information:

Complete list of actions that the module can perform with their corresponding parameters and types  (Module Contract or API)
Permissions.  For each command, specify which profiles have authorization to issue/cancel, or schedule that command.  This permission can also be set for other modules.  For example, SHP has the right to send ”close window” commands to SHC.
Complete list of home system events that the module needs to subscribe to perform its activities.  For example, SHH must be subscribed to weather inside/outside the home to make decisions about the heater.
Log file name and location

Note that all modules log warnings and errors in their log for debugging purposes.  The logs can be accessed in the corresponding tab in the smart home dashboard.
Smart Home Core Functionality (SHC)
This module executes general actions to house items like doors, windows, lights, etc. at the user or by any smart home module request.    

When a user sends a command to SHC, the system should validate that the user has been granted privileges to act. For example, the windows can be opened at the request of parents, children, or guests if they are located in that room, but only parents can open the windows remotely if they are not present at home.  This applies to lights too.  Remember that when you set the parameters, you decide which family members to place inside the house.

On the other hand, smart home modules could request to close/open windows or doors to perform their activities.  For example,  the smart heater module might open the windows and turn off AC  to save energy; or the smart security module might close doors and windows and turn on lights in case an intruder breaks in the house..

Here is a list of the existing commands for SHC

open/close window(s)
open/close the main door/ backyard door, garage, etc.
turn on/off lights
Turn on/off auto mode. Auto mode turns on/off lights automatically when someone enters into a room

Smart home security (SHP) Module

This module ensures that the home is protected from intruders and it relies on sensors to determine the presence of undesired people.

We assume that there are sensors located in all doors and windows and motion detectors in each room

The System shall allow users to set an “away mode”
The System shall send notifications to users if any motion detectors are triggered while the system is in “away mode”
The System shall turn on user-defined lights in and outside the house when motion detectors are triggered, or when doors/windows are open when the “away mode” is on
The System shall allow users to set how much time should pass before alerting the authorities when motion detectors are triggered when the “away mode” is on
Smart heating (SHH) Module
The smart home uses System-Based Zoning.  In this scenario, you have multiple heating zones in your home because you have multiple heaters that you can control individually, creating their own effective “zones”. 
This means you must have more than one thermostat. You’ll likely have at least one thermostat per heater or “zone”. This is by far the most efficient and precise way of achieving energy savings through zoning.

Smart Home shall be divided up into zones for heating and cooling
SHH shall accept desired temperature settings for each zone, for 1 to 3 periods in the day
SHH shall accept input for the desired room temperature when the room is unoccupied
SHH shall detect motion to determine if a room is occupied, and make proper adjustments to the temperature
SHH shall display the current temperature of a room when requested by a user
SHH shall monitor indoor and outdoor temperature
SHH shall shut down air conditioning and open windows if the temperature outside is cooler than the inside temperature
SHH shall not open or close any windows if there is something in the desired path of the window (see Smart home dashboard)
SHH shall reverse the directions of windows if they encounter any resistance
SHH shall send notifications to users if Windows needs to reverse the path or Windows cannot complete the desired action (to be opened or closed)
SHH must detect when you leave the house and lower the temperature during Winter. Leading to major energy savings
SHH sends you an alert if there is something unusual with the temperature of your home.  For example, if temperatures are so low that the pipes could burst.  On the other hand if temperatures are to high, it may indicate a fire in the unit.


References

Home I/O Simulation of a smart house and surrounding environment https://realgames.co/home-io/
OpenSHS: Open Smart Home Simulator   https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5469526/ 
Smart Home simulator (github project)
https://github.com/michalmonday/smart_home_simulator 
SmartHome Simulator (github project)
           https://github.com/zeeshanejaz/SmartHomeSimulator 
