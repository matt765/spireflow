<div id="user-content-toc" align="center">
  <ul align="center" style="list-style: none;">
    <summary>
      <h1>- Spireflow -</h1>
    </summary>
  </ul>
</div>

<div align="center">
  <a href="https://github.com/matt765/spireflow/blob/main/CHANGELOG.md" style="text-decoration: none;">
    <img src="https://img.shields.io/badge/%20-changelog-blue?logo=readme&logoColor=white&labelColor=grey" alt="Changelog" />
  </a>
  <a href="https://github.com/matt765/spireflow/blob/main/license" style="text-decoration: none;">
    <img src="https://img.shields.io/badge/license-MIT-blue" alt="License" />
  </a>
  <a href="https://github.com/matt765/spireflow/releases" style="text-decoration: none;">
    <img src="https://img.shields.io/github/package-json/v/matt765/spireflow?color=green" alt="Version" />
  </a>
</div>

<h4 align="center">Open source and free dashboard template written in NextJS and TypeScript, connected to NodeJS backend with PostgreSQL database containing data for fictional electronic store.</h2>
<br />

<div align="center">
  <img src="https://github.com/user-attachments/assets/8a319429-2b20-466b-af26-3c36fee780c8" alt="Spireflow Dashboard" width="800" />
</div>

## :gear: Tech stack

React 19, NextJS 15, TypeScript, Tailwind, Zustand, Apollo Client, Recharts, Clerk, Jest

## :sparkles: Features

- 14 data charts (Recharts, Tremor.so)
- tables with filtering, sorting, searching, pagination and CSV export (Tanstack-ReactTable v8)
- authentication (Clerk, React Hook Forms and Yup)
- calendar that allows for moving, adding and deleting events (Fullcalendar.io)
- product gallery with Lightbox popup and PDF export (yet-another-react-lightbox, @react-pdf/renderer)
- world map with tooltips (react-simple-maps)
- internationalization: english and polish (next-intl)
- CI pipeline for testing and linting, working on Github Actions
- unit and integration tests (Jest, React Testing Library) [in progress]
- code formatter (Prettier), linter (Eslint) and Git Hooks (Husky)
- 4 themes (next-themes, tw-colors)

## :link: Links

Live (dashboard) [https://spireflow.vercel.app/](https://spireflow.vercel.app/)

## :cloud: Backend

Application is connected to NodeJS backend, which is also open source and available on my Github. You can run it on platforms like Heroku.com or Render.com

[https://github.com/matt765/spireflow-backend](https://github.com/matt765/spireflow-backend)

## :file_folder: Project Structure

```shell
├── src
│   ├── app                       # NextJS pages (App Router)
│   │   └── locale                # Locale folder for i18n
│   ├── assets                    # Static assets
│   │   ├── icons                 # Icon components
│   │   └── images                # Image files
│   ├── components                # Main components folder
│   │   ├── auth                  # Authentication related components
│   │   ├── common                # Reusable components
│   │   ├── forms                 # Form components
│   │   └── views                 # Page-specific components
│   │       ├── analytics         # Analytics page components
│   │       ├── calendar          # Calendar page components
│   │       ├── customers         # Customers page components
│   │       ├── homepage          # Homepage components
│   │       ├── orders            # Orders page components
│   │       └── products          # Products page components
│   ├── hooks                     # Custom reusable hooks
│   │   └── auth                  # Authentication hooks
│   ├── i18n                      # Internationalization config
│   ├── layout                    # Layout components
│   │   ├── navbar                # Upper bar components
│   │   └── sideMenu              # Side menu components
│   ├── queries                   # GraphQL queries
│   ├── services                  # Services utils
│   ├── store                     # Zustand store
│   ├── styles                    # Themes and global styles
│   │   └── themes                # Colors for themes
│   ├── tests                     # Test files
│   │   ├── components            # Component tests
│   │   ├── config                # Jest configuration
│   │   └── hooks                 # Hook tests
│   ├── utils                     # Utility functions
│   └── middleware.ts             # NextJS middleware
└── package.json                  # Project dependencies and scripts
```

## :rocket: Getting started

You can get started with Spireflow by cloning the repository:

```bash
git clone https://github.com/matt765/spireflow.git
cd spireflow
```

All commands are run from the root of the project, from a terminal. Remember to create and configure your .env file using the provided .env.example as a template before starting the development server.

| Command                | Action                                |
| :--------------------- | :------------------------------------ |
| `npm install`          | Installs dependencies                 |
| `npm run prepare`      | Sets up Husky git hooks               |
| `npm run dev`          | Starts dev server at `localhost:3000` |
| `npm run build`        | Builds your production site           |
| `npm start`            | Starts server at `localhost:3000`     |
| `npm run lint`         | Runs ESLint to check code quality     |
| `npm run test`         | Runs Jest tests                       |
| `npm run test:watch`   | Runs Jest tests in watch mode         |
| `npm run format`       | Formats code with Prettier            |
| `npm run format:check` | Checks if code is properly formatted  |

### Configure authentication

To begin using Spireflow with authentication, you'll need to set up a Clerk account:

1. Create an account at [Clerk.com](https://clerk.com)
2. Create a new application within the Clerk Dashboard
3. Obtain your API credentials from the dashboard
4. Create a `.env` file in your project root
5. Add the following environment variables to your `.env` file:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_pub_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

### Backend connection

Spireflow is set up to retrieve data from a [GraphQL backend](https://github.com/matt765/spireflow-backend) endpoint. This endpoint is defined by the `GRAPHQL_URL` environment variable in your `.env` file:

```env
GRAPHQL_URL=your_backend_url
```

### Production notes

Route protection in [middleware.ts](https://github.com/matt765/spireflow/blob/main/src/middleware.ts) and registering new accounts in [useHandleSignUp](https://github.com/matt765/spireflow/blob/main/src/hooks/auth/useHandleSignUp.ts) have logic commented out for demo purposes. Remember to uncomment it if you plan to use this application in production environment.

The "Sign in" button on navbar is mostly for demonstration purposes. There are separate [/login](https://spireflow.vercel.app/login) and [/register](https://spireflow.vercel.app/register) pages available for production use.

### Quickstart without backend and authentication

Dashboard **can work** without environment variables for backend and authentication.

In case of backend, you need to set `switchToBackupData` value to `true` in [getData.ts](https://github.com/matt765/spireflow/blob/main/src/services/getData.ts) file. If you do this, data will be fetched from `public/backendBackup.json` file.

As for authentication, `middleware.ts` is configured in a way that will allow to run the application even if you won't provide Clerk environment variables. Dashboard will load, but authentication will not work.

## 🧾 Pages

| Path         | Description                                        |
| ------------ | -------------------------------------------------- |
| `/`          | Homepage with key metrics and widgets              |
| `/orders`    | View, track, and manage all orders                 |
| `/customers` | Browse customer information                        |
| `/analytics` | Sales and performance charts                       |
| `/calendar`  | Interactive calendar for events and scheduling     |
| `/products`  | Product management with gallery and export options |
| `/login`     | Sign in to your account                            |
| `/register`  | Create a new account                               |

There are also four filler pages with single charts: `/area`, `/bars`, `/scatter` and `/line`

## 🤝 Community and contributions

If you have ideas to enhance the project or found some issues, consider submitting a pull request. Prior to contributing, please review the [contribution guidelines](CONTRIBUTING.md), which include information regarding the licensing of your contributions.

All forms of project support are valued, including code contributions, issue reporting, and sponsorship through GitHub Sponsors.

## 📝 License

This project is licensed under the MIT License - see the [license](https://github.com/matt765/spireflow/blob/main/license) file for more information.

Made with ♥ by [matt765](https://matt765-portfolio.vercel.app/)
