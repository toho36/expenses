# App Instructions

## Prerequisites
Ensure you have [Bun](https://bun.sh) (v1.1.40 or later) installed.  
You can install it with:  

```bash
curl -fsSL https://bun.sh/install | bash
```

Installing Dependencies
Run the following command in the project root directory:

```bash
bun install
```

# Running the App
The app consists of a server and a frontend, which need to run simultaneously.

1. Start the Server
In the project root directory:
```bash
bun dev
```

2. Start the Frontend
Navigate to the frontend directory and start the frontend:

```bash
cd frontend
bun dev
```
## Setting Up Kinde Authentication

To use authentication in this app, you’ll need to set up an account with [Kinde](https://kinde.com) and configure the required environment variables.

### Note:
- The `.env` file is required to run the app. Make sure to create it from `.env.sample` and fill in the necessary parameters.
- Ensure that the redirect URIs match exactly with what you’ve configured in Kinde.
- If you’re deploying to a production environment, replace `http://localhost:5173` with your production domain.


This project was created using `bun init` in bun v1.1.40. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
