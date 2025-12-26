# Next Steps

The initial setup of your NestJS project `bank_hub_backend` is complete. Here's how to get your application running:

### 1. Set Up the PostgreSQL Database

You need to create a PostgreSQL database for the application to connect to.

- **Database Name:** `salon_hub`

You can use a command-line tool like `psql` or a graphical tool like pgAdmin.

Example using `psql`:
```sh
psql -U postgres -c "CREATE DATABASE salon_hub;"
```

### 2. Run the Database Schema Script

Once the database is created, you need to create all the tables and initial data by running the `schema.sql` file.

Example using `psql`:
```sh
psql -U postgres -d salon_hub -f db/schema.sql
```
*Make sure to run this command from within the `bank_hub_backend` directory.*

### 3. Run the Application

You can now start the NestJS application in development mode.

```sh
cd bank_hub_backend
npm run start:dev
```

The application will be running on `http://localhost:3000`.

---

What would you like to do next? For example, we can start creating the TypeORM entities and NestJS modules for your resources (like `users`, `bookings`, etc.).
