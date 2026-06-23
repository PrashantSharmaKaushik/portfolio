# Prashant Portfolio

This is a static Single Page Application (SPA) built using React, Vite, and Tailwind CSS. The project showcases personal information, skills, experience, and projects in a visually appealing and responsive layout.

## Project Structure

The project is organized as follows:

```
prashant-portfolio
├── src
│   ├── components          # Contains all React components
│   │   ├── Navbar.jsx      # Navigation bar component
│   │   ├── Hero.jsx        # Introductory section component
│   │   ├── About.jsx       # About section component
│   │   ├── Experience.jsx   # Experience section component
│   │   ├── Skills.jsx      # Skills section component
│   │   ├── Projects.jsx    # Projects section component
│   │   ├── Contact.jsx     # Contact section component
│   │   └── Footer.jsx      # Footer component
│   ├── data                # Contains static data files
│   │   ├── experience.js    # Work experience data
│   │   ├── projects.js      # Projects data
│   │   ├── skills.js        # Skills data
│   │   └── profile.js       # User profile data
│   ├── App.jsx             # Main application component
│   ├── main.jsx            # Entry point for the React application
│   └── index.css           # Global styles and Tailwind CSS imports
├── public
│   └── favicon.svg         # Favicon for the website
├── index.html              # Main HTML file for the application
├── package.json            # npm configuration file
├── vite.config.js          # Vite configuration file
├── tailwind.config.js      # Tailwind CSS configuration file
└── postcss.config.js       # PostCSS configuration file
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd prashant-portfolio
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Run the development server:**
   ```
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000` to view the application.

## Features

- Fully responsive design
- Smooth scrolling navigation
- Static content management using JavaScript/JSON objects
- High performance with a Lighthouse score target of 95+

## Deployment

This project can be deployed on platforms such as GitHub Pages, Netlify, Vercel, or Cloudflare Pages without any server configuration.

## Performance Goals

- Lighthouse Score: 95+
- Fully Static Assets
- SEO Friendly
- Mobile Responsive
- Fast First Load
- Zero Backend Dependencies

## License

This project is open-source and available under the MIT License.