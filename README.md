# 🎬 Random Movie Picker

> **A modern, full-featured movie discovery web application showcasing advanced React development skills**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Available-blue?style=for-the-badge)](https://your-username.github.io/movie-picker)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.2-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-4.4.5-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)

A sophisticated movie discovery platform that demonstrates proficiency in modern web development technologies, API integration, state management, and user experience design. Built with React 18, TypeScript, and cutting-edge tools to showcase advanced frontend development capabilities.

---

## 🎯 Project Overview

This project represents a comprehensive demonstration of modern React development practices, featuring:

- **Advanced State Management**: Custom hooks and context providers for complex application state
- **External API Integration**: Seamless integration with The Movie Database (TMDb) API
- **Responsive Design**: Mobile-first approach with Tailwind CSS and Shadcn/UI
- **Data Persistence**: Browser storage implementation with CSV/JSON export capabilities
- **Accessibility**: WCAG-compliant design with proper ARIA labels and keyboard navigation
- **Dark Mode**: Complete theming system with automatic system preference detection

---

## ✨ Key Features

### 🎲 **Intelligent Movie Discovery**
- Random movie suggestions with advanced filtering capabilities
- Support for multiple data sources (TMDb API + Letterboxd imports)
- Smart caching and performance optimization

### 🎨 **Modern User Interface**
- Beautiful, responsive design built with Shadcn/UI components
- Smooth animations and micro-interactions
- Complete dark/light theme system with automatic OS preference detection
- Mobile-first responsive design

### 📊 **Data Management**
- **CSV Import/Export**: Full Letterboxd compatibility with persistent browser storage
- **Real-time Filtering**: Genre, rating, and category-based filtering
- **Streaming Integration**: Shows where movies are available to watch
- **Storage Management**: Smart data persistence with size tracking and export options

### 🛠 **Technical Excellence**
- **TypeScript**: Full type safety throughout the application
- **Performance**: Optimized API calls with intelligent caching
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Accessibility**: Screen reader compatible with proper semantic HTML

---

## 🚀 Technical Implementation

### **Frontend Architecture**
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/UI base components
│   ├── MovieCard.tsx   # Movie display component
│   └── DarkModeToggle.tsx
├── hooks/              # Custom React hooks
│   ├── useLocalStorage.ts
│   └── useSystemTheme.ts
├── services/           # API and data services
│   ├── tmdb.ts         # TMDb API integration
│   ├── letterboxd.ts   # CSV parsing service
│   └── letterboxdStorage.ts # Browser storage management
├── contexts/           # React context providers
│   └── ThemeContext.tsx
└── types/              # TypeScript type definitions
    ├── movie.ts
    └── letterboxd.ts
```

### **Key Technical Decisions**

**🔧 State Management**
- Context API for global theme state
- Custom hooks for localStorage persistence
- Efficient re-rendering with proper dependency arrays

**🌐 API Integration**
- RESTful API consumption with proper error handling
- Rate limiting awareness and optimization
- Dynamic image loading with fallback handling

**💾 Data Persistence**
- LocalStorage implementation with size monitoring
- CSV parsing and generation using Web APIs
- Export functionality using Blob API and URL.createObjectURL

**🎨 Styling Strategy**
- Tailwind CSS for utility-first styling
- CSS custom properties for theming
- Component composition with Shadcn/UI

---

## 🛠 Technology Stack

### **Core Technologies**
- **React 18.2** - Modern React with concurrent features
- **TypeScript 5.0** - Full type safety and developer experience
- **Vite 4.4** - Next-generation frontend tooling
- **Tailwind CSS 3.3** - Utility-first CSS framework

### **UI & Design System**
- **Shadcn/UI** - Beautiful, accessible component library
- **Lucide React** - Consistent icon system
- **React Toggle** - Accessible dark mode controls

### **Development Tools**
- **ESLint** - Code quality and consistency
- **PostCSS** - CSS processing and optimization
- **TypeScript Compiler** - Type checking and compilation

### **External APIs**
- **TMDb API** - Movie database and metadata
- **Streaming Providers API** - Where-to-watch information

---

## 🎨 UI/UX Highlights

### **Design Philosophy**
- **Accessibility First**: WCAG 2.1 AA compliance
- **Performance Focused**: Optimized loading and interactions
- **User-Centric**: Intuitive navigation and clear visual hierarchy

### **Advanced Features**
- **System Theme Integration**: Automatic dark/light mode detection
- **Progressive Enhancement**: Works without JavaScript for core functionality
- **Responsive Images**: Optimized loading with proper aspect ratios
- **Micro-interactions**: Subtle animations that enhance user experience

---

## 📱 Responsive Design

The application features a comprehensive responsive design strategy:

- **Mobile-First**: Designed for touch interfaces and small screens
- **Tablet Optimization**: Enhanced layouts for medium-sized devices
- **Desktop Excellence**: Full feature utilization on large screens
- **High-DPI Support**: Sharp visuals on retina displays

---

## 🔧 Development Practices

### **Code Quality**
- **TypeScript**: 100% type coverage for better maintainability
- **Component Architecture**: Modular, reusable components
- **Custom Hooks**: Logic separation and reusability
- **Error Boundaries**: Graceful error handling

### **Performance Optimization**
- **Lazy Loading**: Images and components loaded on demand
- **Memoization**: Preventing unnecessary re-renders
- **Bundle Optimization**: Code splitting and tree shaking
- **API Efficiency**: Smart caching and request optimization

---

## 🚀 Getting Started

### **Prerequisites**
- Node.js 20.19.0+ 
- npm or yarn
- TMDb API key (free registration required)

### **Quick Start**
```bash
# Clone the repository
git clone https://github.com/your-username/movie-picker.git
cd movie-picker

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your TMDb API key to .env

# Start development server
npm run dev
```

### **Production Build**
```bash
npm run build
npm run preview
```

---

## 🌐 Live Demo

**[🔗 View Live Application](https://your-username.github.io/movie-picker)**

*Experience the full functionality including dark mode, responsive design, and movie discovery features.*

---

## 📋 Features Showcase

| Feature | Implementation | Complexity |
|---------|---------------|------------|
| **Movie Discovery** | TMDb API integration with filtering | ⭐⭐⭐ |
| **Dark Mode** | System preference + manual toggle | ⭐⭐⭐ |
| **CSV Import/Export** | File handling with browser APIs | ⭐⭐⭐⭐ |
| **Responsive Design** | Mobile-first with Tailwind CSS | ⭐⭐⭐ |
| **State Management** | Context + Custom hooks | ⭐⭐⭐⭐ |
| **TypeScript Integration** | Full type safety | ⭐⭐⭐⭐ |
| **Performance Optimization** | Lazy loading + caching | ⭐⭐⭐⭐ |

---

## 🤝 Professional Skills Demonstrated

- **Modern React Development**: Hooks, Context, and performance optimization
- **TypeScript Proficiency**: Advanced type definitions and error prevention
- **API Integration**: RESTful services with proper error handling
- **UI/UX Design**: Accessible, responsive, and intuitive interfaces
- **State Management**: Complex application state with persistent storage
- **Performance Optimization**: Bundle analysis and loading strategies
- **Testing Mindset**: Error boundaries and defensive programming

---

## 📞 Contact & Portfolio

**[📧 Email](mailto:your.email@example.com)** | **[💼 LinkedIn](https://linkedin.com/in/yourprofile)** | **[🌐 Portfolio](https://yourportfolio.com)** | **[💻 GitHub](https://github.com/yourusername)**

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

*This project demonstrates advanced React development skills and modern web application architecture. It showcases proficiency in TypeScript, API integration, responsive design, and user experience optimization.* 