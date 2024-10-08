# Full-Stack Securities Application

## Description

This project is a full-stack application developed using Node.js, TypeScript, PostgreSQL, and React. The application provides endpoints for listing and detailing securities, with data sourced from a PostgreSQL database. The project includes backend and frontend components, with the backend serving data through a REST API and the frontend displaying the data in a React single-page application (SPA).

## Features

- **Backend:**
  - Node.js/TypeScript with Express and TypeORM
  - PostgreSQL database
  - REST API endpoints for listing and detailing securities
  - Data seeding from a JSON file
  - Pagination support for endpoints
  - Jest for unit testing

- **Frontend:**
  - React.js with Material UI for UI components
  - Highcharts for data visualization
  - Two main screens: Security List and Security Detail
  - Internationalization with i18next

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (>=14.x)
- npm (>=6.x) or yarn (>=1.x)
- PostgreSQL

### Clone the repository

   git clone https://github.com/MauroSerrano-dev/Full-Stack-Securities-Application.git

## Backend Setup

### Installation

1. Navigate to the frontend directory

   cd ../backend

2. Install dependencies:

   npm install or yarn install

3. Create a .env file in the backend directory and add your database configuration:

  - POSTGRES_HOST=your_db_host
  - POSTGRES_PORT=your_db_port
  - POSTGRES_USERNAME=your_db_user
  - POSTGRES_PASSWORD=your_db_password
  - POSTGRES_DB=your_db_name

4. Start the backend server:

   npm start
   or
   yarn start

## Frontend Setup

### Installation

1. Navigate to the frontend directory:

   cd ../frontend

2. Install dependencies:

   npm install
   or
   yarn install

3. Create a .env file in the frontend directory and add your backend URL:

  - VITE_BACKEND_URL=http://localhost:3001

4. Start the frontend development server:

   npm run dev
   or
   yarn dev