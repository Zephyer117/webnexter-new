# Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Responsive design that works on all devices
- Modern UI with smooth animations
- Blog section with dynamic routing
- Contact form
- Portfolio showcase
- Services section
- About page with skills and experience
- Mobile-friendly navigation

## Pages

- Home
- Services
- Portfolio
- About
- Blog
- Contact

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework for production
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Sanity](https://www.sanity.io/) - Headless CMS (for future content management)

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/portfolio-website.git
   cd portfolio-website
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
portfolio-website/
├── app/                  # Next.js app directory
│   ├── about/            # About page
│   ├── blog/             # Blog pages
│   ├── contact/          # Contact page
│   ├── portfolio/        # Portfolio page
│   ├── services/         # Services page
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/           # Reusable components
│   ├── Footer.tsx        # Footer component
│   └── Navbar.tsx        # Navigation component
├── public/               # Static assets
│   └── images/           # Image assets
└── package.json          # Project dependencies
```

## Customization

- Update personal information in the About page
- Add your own projects to the Portfolio page
- Customize services in the Services page
- Add blog posts to the Blog section
- Update contact information in the Footer

## Deployment

This website can be easily deployed to Vercel:

```bash
npm run build
# or
yarn build
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspired by [Webnexter](https://webnexter.com/)
- Icons from [Lucide Icons](https://lucide.dev/)
