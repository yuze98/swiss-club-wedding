# 💍 Swiss Club Wedding Website

## Setup Instructions

### 1. Copy these files into your project
Copy all files from this zip into your `swiss-club-wedding` project folder, replacing existing ones.

### 2. Add your photos
Place your images in the `public/images/` folder:
- `public/images/couple.jpg` → Hero background (you + partner)
- `public/images/venue.jpg` → Venue photo
- `public/images/story-1.jpg` → Story photo 1
- `public/images/story-2.jpg` → Story photo 2
- `public/images/story-3.jpg` → Story photo 3

### 3. Customize your details
- `src/components/Hero.jsx` → Change partner's name, date, venue
- `src/components/Countdown.jsx` → Change `WEDDING_DATE` to your actual date
- `src/components/Venue.jsx` → Update venue details
- `src/components/OurStory.jsx` → Add your story text
- `src/components/Footer.jsx` → Update names and date

### 4. Run locally
```bash
npm start
```

### 5. Deploy to GitHub Pages
```bash
npm run deploy
```

## Project Structure
```
src/
├── App.jsx                  # Root component
├── index.css                # Tailwind + custom styles
├── components/
│   ├── Navbar.jsx           # Sticky navigation
│   ├── Hero.jsx             # Full-screen hero with couple photo
│   ├── Countdown.jsx        # Live countdown timer
│   ├── OurStory.jsx         # Timeline story section
│   ├── Venue.jsx            # Venue details + photo
│   ├── GuestList.jsx        # Add/manage guests (saved to localStorage)
│   └── Footer.jsx           # Footer
└── hooks/
    ├── useGuestList.js      # Guest list state + localStorage logic
    └── useFadeIn.js         # Scroll fade-in animation hook
```
