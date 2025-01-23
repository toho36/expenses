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

### Steps to Get Kinde Keys:

1. **Sign Up/Log In to Kinde**  
   - Go to [Kinde](https://kinde.com) and create an account or log in if you already have one.

2. **Create a New Application**  
   - Once logged in, navigate to the **Applications** section in your Kinde dashboard.
   - Click on **Create Application** and fill in the required details (e.g., application name, domain).

3. **Configure Application Settings**  
   - After creating the application, go to the **Settings** tab.
   - Here, you’ll find the following details:
     - **KINDE_ISSUER_URL**: This is your Kinde domain (e.g., `https://your-app.kinde.com`).
     - **KINDE_CLIENT_ID**: Your application's client ID.
     - **KINDE_CLIENT_SECRET**: Your application's client secret.
     - **KINDE_DOMAIN**: Your Kinde domain (e.g., `https://your-app.kinde.com`).

4. **Set Up Redirect URIs**  
   - In the **Authentication** tab, configure the following redirect URIs:
     - **KINDE_REDIRECT_URI**: Set this to `http://localhost:5173/api/callback`.
     - **KINDE_LOGOUT_REDIRECT_URI**: Set this to `http://localhost:5173`.
     - **KINDE_SITE_URL**: Set this to `http://localhost:5173`.

5. **Copy the Keys**  
   - Once everything is configured, copy the values for:
     - `KINDE_ISSUER_URL`
     - `KINDE_CLIENT_ID`
     - `KINDE_CLIENT_SECRET`
     - `KINDE_DOMAIN`
     - `KINDE_REDIRECT_URI`
     - `KINDE_LOGOUT_REDIRECT_URI`
     - `KINDE_SITE_URL`

6. **Add Keys to Your Environment**  
   - Create a `.env` file in the project root directory and add the following:
     ```env
     KINDE_ISSUER_URL=https://your-app.kinde.com
     KINDE_CLIENT_ID=your-client-id
     KINDE_CLIENT_SECRET=your-client-secret
     KINDE_SITE_URL=http://localhost:5173
     KINDE_LOGOUT_REDIRECT_URI=http://localhost:5173
     KINDE_DOMAIN=https://your-app.kinde.com
     KINDE_REDIRECT_URI=http://localhost:5173/api/callback
     ```

This project was created using `bun init` in bun v1.1.40. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
