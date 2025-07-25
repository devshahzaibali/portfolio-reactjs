# ShahZaib Ali - Portfolio

A modern, responsive portfolio website built with React, Vite, Tailwind CSS, and Framer Motion.

## 🚀 Features

- **Modern Design**: Clean, professional design with dark/light theme support
- **Responsive**: Fully responsive across all devices
- **Smooth Animations**: Beautiful micro-interactions powered by Framer Motion
- **Performance Optimized**: Fast loading with optimized assets
- **SEO Ready**: Proper meta tags and structured data
- **Accessible**: WCAG compliant design
- **Contact Form**: Functional contact form with Resend email API integration

## 🛠️ Technologies Used

- **React 19** - Latest React with concurrent features
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router** - Client-side routing
- **React Intersection Observer** - Scroll animations

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/devshahzaibali/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## 📧 Email Setup (Resend API)

### Setting up Resend

1. **Create a Resend account**:
   - Go to [resend.com](https://resend.com)
   - Sign up for a free account
   - Get your API key from the dashboard

2. **Configure Environment Variables**:
   - For Vercel: Add `RESEND_API_KEY` in your Vercel project settings
   - For Netlify: Add `RESEND_API_KEY` in your Netlify environment variables
   - For local development: Create a `.env` file with your API key

3. **Optional: Custom Domain**:
   - Verify your domain in Resend
   - Update the `from` email in the API functions

### Environment Variables

```bash
RESEND_API_KEY=re_your_api_key_here
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically detect the Vite configuration
4. Deploy with zero configuration

### Netlify

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Upload the `dist` folder to your hosting provider

## 📁 Project Structure

```
my-portfolio/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── Home.jsx       # Home section
│   │   ├── About.jsx      # About section
│   │   ├── Skills.jsx     # Skills section
│   │   ├── Projects.jsx   # Projects section
│   │   ├── Contact.jsx    # Contact section
│   │   ├── Navbar.jsx     # Navigation
│   │   └── Footer.jsx     # Footer
│   ├── assets/            # Images and other assets
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind configuration
├── vercel.json          # Vercel deployment config
└── netlify.toml         # Netlify deployment config
```

## 🎨 Customization

### Colors and Themes
- Edit `tailwind.config.js` to customize colors
- Modify theme classes in components for dark/light mode

### Content
- Update personal information in components
- Replace project data in `Projects.jsx`
- Modify contact information in `Contact.jsx`

### Styling
- All styling is done with Tailwind CSS classes
- Custom animations in `index.css`
- Component-specific styles in each component

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Build and prepare for deployment

## 📱 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Bundle Size**: Optimized with Vite
- **Loading Speed**: < 2 seconds on 3G
- **SEO**: Fully optimized with meta tags

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

- **Website**: [devshahzaibali.online](https://devshahzaibali.online)
- **Email**: techzaibx@gmail.com
- **GitHub**: [@devshahzaibali](https://github.com/devshahzaibali)

---

Built with ❤️ by ShahZaib Ali
#   p o r t f o l i o - r e a c t j s  
 