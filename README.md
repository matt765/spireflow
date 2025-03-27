# Spireflow
Open source and free e-commerce dashboard template, written in NextJS 14 and TypeScript. It is connected to NodeJS backend with PostgreSQL database containing AI generated data for fictional electronic store.

## Tech stack
React, NextJS, TypeScript, Tailwind, Zustand, Apollo Client, Iron Session, Jest, Storybook

## Features
- 14 data charts (Recharts, Tremor.so)
- tables with filtering, sorting, searching, pagination and CSV export (Tanstack-ReactTable v8)
- authentication (Firebase, Iron Session, React Hook Forms and Yup)
- calendar that allows for moving, adding and deleting events (Fullcalendar.io)
- product gallery with Lightbox popup and PDF export (yet-another-react-lightbox, @react-pdf/renderer)
- world map with tooltips (react-simple-maps)
- internationalization: english and polish (next-intl)
- CI pipeline for testing and linting, working on Github Actions
- unit and integration tests (Jest, React Testing Library) [in progress]
- 4 themes (next-themes, tw-colors)

## Video preview
https://github.com/matt765/spireflow/assets/63603595/08a28c0f-525e-4250-a664-a34f5f39fa94

## Links
Live (dashboard) [https://spireflow.vercel.app/](https://spireflow.vercel.app/)

Live (Storybook) [https://spireflow-storybook.vercel.app/](https://spireflow-storybook.vercel.app/)

## Backend
Application is connected to NodeJS backend, which is also open source and available on my Github

[https://github.com/matt765/spireflow-backend](https://github.com/matt765/spireflow-backend)

##  Project Structure
```
├── src
│   ├── app
│   │   └── locale
│   ├── assets
│   │   ├── icons
│   │   └── images
│   ├── components
│   │   ├── auth
│   │   ├── common
│   │   │   └── stories
│   │   ├── forms
│   │   │   └── stories
│   │   └── views
│   │       ├── analytics
│   │       ├── calendar
│   │       ├── customers
│   │       ├── homepage
│   │       ├── orders
│   │       └── products
│   ├── hooks
│   │   └── auth
│   ├── i18n
│   ├── layout
│   │   ├── navbar
│   │   └── sideMenu
│   ├── queries
│   ├── services
│   ├── store
│   ├── styles
│   │   └── themes
│   ├── tests
│   │   └── hooks
│   └── utils
│ 
└── package.json
```

## Authentication architecture

Spireflow implements a dual-layer authentication approach combining Firebase Authentication with Iron Session for stateful session management. 

- **Firebase** handles user account creation, credential verification, and password hashing 
- **Iron Session** maintains encrypted, server-verified session cookies for route protection and persistent login state

All authentication operations (login, signup, logout) are handled server-side through API routes.

### Data Flow

1. **Login Process**:
   - User submits credentials through `LoginForm` component
   - `useHandleLogin` hook validates input and calls `/api/auth/signin` API route
   - Server authenticates with Firebase and creates an Iron Session
   - User is redirected to the dashboard

2. **Sign-Up Process**:
   - User submits registration details through `SignUpForm`
   - `useHandleSignUp` hook validates input and calls `/api/auth/signup` API route
   - Server creates account in Firebase and establishes an Iron Session
   - Note: Account creation is disabled in the demo

3. **Logout Process**:
   - User confirms logout in `LogoutModal`
   - `useHandleLogout` hook calls `/api/auth/logout` and destroys the session
   - Page is reloaded, returning to the unauthenticated state

4. **Session Management**:
   - `useSession` hook fetches session state on application load
   - Components conditionally render based on authentication state

### Demo vs Production Notes

- In the demo version, modals are used for authentication to simplify the user experience. In production, dedicated login/signup pages at `/login` and `/register` would be used instead of modals. You can find them in src/app folder
- Route protection in middleware.ts and account creation logic in `useHandleSignUp` hook are commented out for demonstration purposes

### Why API routes and Iron Session?

By moving session creation, validation, and expiration to secure API routes, we keep essential authentication operations on the server. This separation ensures that business logic, Firebase credentials and session control are not exposed to client-side manipulation or inspection. 

It's true that Firebase’s API key is public by design — it merely identifies your project. However, managing sessions solely on the client means that tokens and related state are more exposed. With Iron Session, we store the authenticated state in encrypted cookies, ensuring that only validated sessions grant access to protected routes without relying on client-stored tokens.

Iron Session logic in middleware leverages the secure, server-managed session for route protection. This approach avoids the complexity and potential pitfalls of verifying Firebase tokens on every request, leading to a cleaner and more maintainable security model.

##  How to run
All commands are run from the root of the project, from a terminal. Please remember, that the application needs working backend to run. 

| Command                | Action                                             |
| :--------------------- | :------------------------------------------------- |
| `npm install`          | Installs dependencies                              |
| `npm run dev`          | Starts dev server at `localhost:3000`              |
| `npm run build`        | Builds your production site                        |
| `npm start`            | Starts server at `localhost:3000`                  |
