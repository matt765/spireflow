# Spireflow
Open source e-commerce analytic dashboard application, written in NextJS 14 and TypeScript. It was designed to be full-stack application that resembles real-world e-commerce platforms
 
## Tech stack
React, NextJS, TypeScript, Tailwind, Zustand, Apollo Client, Iron Session, Jest, Storybook

##  Features
- 14 data charts (Tremor.so)
- 2 tables with filtering, sorting, searching, pagination and CSV export (Tanstack-ReactTable v8)
- authentication (Firebase, Iron Session, React Hook Forms and Yup)
- internationalization with 2 languages (next-intl)
- calendar page that allows for moving, adding and deleting events (Fullcalendar.io)
- product gallery with Lightbox popup and PDF export (yet-another-react-lightbox, @react-pdf/renderer)
- world map with tooltips (react-simple-maps)
- CI pipeline for testing and linting, working on Github Actions
- 7 color themes (next-themes, tw-colors)

In progress:
- unit and integration tests (currently 30, written with Jest and React Testing Library)
- expanding Storybook

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



##  How to run
All commands are run from the root of the project, from a terminal. Please remember, that application needs working backend to run. 

| Command                | Action                                             |
| :--------------------- | :------------------------------------------------- |
| `npm install`          | Installs dependencies                              |
| `npm run dev`          | Starts dev server at `localhost:3000`              |
| `npm run build`        | Builds your production site                        |
| `npm start`            | Starts server at `localhost:3000`                  |
