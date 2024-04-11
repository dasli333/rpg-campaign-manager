
# RPG Campaign Manager

<img src="app/src/assets/images/logo.webp" width="200" alt="Logo">

Welcome to the RPG Campaign Manager, an application designed to enhance your role-playing game sessions by allowing you to store campaigns, create characters, manage story logs, and much more. Built with Angular, NestJS, and MongoDB, this application offers a robust and user-friendly platform for managing all aspects of your RPG campaigns.

## Features

- **Campaign Management:** Create and manage multiple RPG campaigns, each with its unique settings and characters.
- **Character Creation:** Build detailed profiles for your characters, including stats, backstory, and equipment.
- **Story Log:** Keep track of your campaign's story progress, important NPCs, and memorable events.
- **User Authentication:** Secure user authentication system allowing players and game masters to access their campaigns.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed on your system:
- Node.js
- MongoDB
- Angular CLI

### Installing

1. **Clone the repository**

```bash
git clone https://github.com/dasli333/rpg-campaign-manager.git
cd rpg-campaign-manager
```

2. **Set up the backend**

Navigate to the backend directory and install dependencies.

```bash
cd backend
npm install
```

Start the NestJS server.

```bash
npm run start
```

3. **Set up the frontend**

Open a new terminal, navigate to the frontend directory, and install dependencies.

```bash
cd ../frontend
npm install
```

Start the Angular development server.

```bash
ng serve
```

Navigate to `http://localhost:4200/` in your web browser to view the application.


## Built With

- [Angular](https://angular.io/) - The web framework used for the frontend.
- [NestJS](https://nestjs.com/) - The framework used for the backend.
- [MongoDB](https://www.mongodb.com/) - Database system.

