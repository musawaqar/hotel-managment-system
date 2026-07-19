# Hotel Management System

A full-stack hotel management system built with a React client and a Node.js/Express server, designed to help hotel staff manage rooms, bookings, and guests from a single dashboard.

## Features

- 🏨 Room management (add, update, view availability)
- 📅 Booking / reservation management
- 👤 Guest / customer records
- 🔐 Staff or admin login
- 📊 Dashboard overview of hotel operations

## Tech Stack

**Client**
- React
- CSS

**Server**
- Node.js
- Express.js

## Project Structure

hotel-managment-system/
├── client/     # React front-end
└── server/     # Node/Express back-end

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- A running database instance (if applicable)

### Installation

1. Clone the repository
   git clone https://github.com/musawaqar/hotel-managment-system.git
   cd hotel-managment-system

2. Install server dependencies
   cd server
   npm install

3. Install client dependencies
   cd ../client
   npm install

4. Set up environment variables (create a .env file in server/)
   PORT=5000
   DATABASE_URL=your_database_connection_string
   JWT_SECRET=your_secret_key

### Running the App

Start the server:
   cd server
   npm start

Start the client:
   cd client
   npm start

The client will typically run on http://localhost:3000 and the server on http://localhost:5000 (adjust based on your actual config).

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to open a pull request or issue.
