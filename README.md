# Fresh Fruits & Vegetables - Online Store

A modern, responsive e-commerce website for fresh fruits and vegetables with a clean, organized codebase.

## 🚀 Features

- **Responsive Design**: Optimized for all devices (mobile, tablet, desktop)
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Tab Navigation**: Single-page application with smooth tab transitions
- **User Registration**: Secure user registration with form validation
- **Mobile-First**: Mobile hamburger menu and touch-friendly interface
- **Accessibility**: Keyboard navigation and screen reader support
- **Performance**: Optimized CSS and JavaScript with minimal dependencies

## 📁 Project Structure

```
├── index.html              # Main HTML file
├── css/                    # Stylesheets
│   ├── reset.css          # CSS reset
│   ├── variables.css      # CSS custom properties
│   ├── base.css           # Base styles and typography
│   ├── components.css     # Reusable components
│   ├── layout.css         # Layout and navigation
│   └── responsive.css     # Responsive design
├── js/                     # JavaScript modules
│   ├── navigation.js      # Navigation scroll behavior
│   ├── tabs.js           # Tab switching functionality
│   └── main.js           # Main application logic
├── php/                    # Backend PHP files
│   ├── register.php       # User registration handler
│   └── database.sql       # Database schema
├── assets/                 # Static assets
│   └── images/            # Image files
└── README.md              # Project documentation
```

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: PHP 7.4+
- **Database**: MySQL
- **Fonts**: Google Fonts (Lobster, Ubuntu)
- **Icons**: Bootstrap Icons
- **Images**: Pexels stock photos

## 🎨 Design Features

- **CSS Custom Properties**: Centralized design tokens
- **Modular CSS**: Organized into logical, maintainable files
- **Flexbox & Grid**: Modern layout techniques
- **Smooth Animations**: CSS transitions and keyframe animations
- **Mobile Navigation**: Slide-out hamburger menu
- **Form Validation**: Real-time client-side validation
- **Accessibility**: WCAG compliant with keyboard navigation

## 📱 Responsive Breakpoints

- **Mobile**: < 480px
- **Tablet**: 481px - 768px
- **Desktop**: > 768px
- **Large Desktop**: > 1200px

## 🔧 Setup Instructions

1. **Clone or download** the project files
2. **Set up a web server** (Apache/Nginx) with PHP support
3. **Create MySQL database** using `php/database.sql`
4. **Update database credentials** in `php/register.php`
5. **Place files** in your web server directory
6. **Access** the website through your web server

## 🗄️ Database Setup

```sql
-- Create database
CREATE DATABASE vegetable_store;

-- Import the schema
mysql -u username -p vegetable_store < php/database.sql
```

## 🎯 Key Improvements Made

### Code Organization
- Separated CSS into logical, maintainable modules
- Split JavaScript into focused, single-responsibility files
- Organized PHP with proper error handling and security

### Performance
- Optimized CSS with custom properties for consistency
- Minimized JavaScript with efficient event handling
- Reduced HTTP requests through file consolidation

### Security
- Password hashing with PHP's `password_hash()`
- SQL injection prevention with prepared statements
- Input validation and sanitization
- CSRF protection ready structure

### User Experience
- Smooth animations and micro-interactions
- Improved form validation with real-time feedback
- Better mobile navigation experience
- Accessibility improvements

### Maintainability
- Clear file structure and naming conventions
- Comprehensive documentation
- Modular, reusable components
- Consistent coding standards

## 🚀 Future Enhancements

- Shopping cart functionality
- Product catalog with search and filters
- User authentication and sessions
- Payment integration
- Admin dashboard
- Order management system
- Email notifications
- Product reviews and ratings

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.