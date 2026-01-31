# User Storefront – Fullstack E-Commerce

This is the **customer-facing frontend** of the Fullstack E-Commerce application.  
It allows **buyers/customers** to browse products, search and filter items, add products to the cart, complete checkout, and place orders.

The storefront is built with **React** and designed to be **fully responsive**, providing a smooth shopping experience across **desktop, tablet, and mobile devices**.

## 🛠 Frontend Tech Stack

### Core

- React (v18)
- Vite (Development & Build Tool)
- React Router DOM (Routing)

### Styling & UI

- Tailwind CSS
- Material UI (MUI)
- Emotion (CSS-in-JS)
- Styled Components
- React Icons

### State Management

- React Context API

### API & Authentication

- Axios (API communication)
- Firebase Authentication

### UI & UX Enhancements

- Swiper Slider
- React Hot Toast (Notifications)
- Lazy Loading Images
- Inner Image Zoom
- Range Slider Input
- International Phone Input
- Collapse Animations
- WYSIWYG Editor

## 🚀 Features

### 🛍 Product Browsing

- Product listing page
- Product search functionality
- Filters by category, price, and other attributes
- Pagination for large product lists

### 🔍 Product Details

- Detailed product view
- Product image gallery with zoom
- Stock availability display

### 🛒 Cart & Checkout

- Add and remove items from cart
- Update product quantities
- Checkout page with order summary
- Razorpay payment integration (Test Mode)

### 👤 User Account

- User signup and login
- Order history
- Address management

### 🎨 UI & UX

- Toast notifications for actions and errors
- Lazy loading images for performance
- Smooth animations and interactive UI components

## 🧭 Pages & User Flow

The user storefront is structured around a clear and intuitive shopping flow:

### 🏠 Core Pages

- **Home Page** – Featured products, banners, and promotions
- **Product Listing Page** – Browse products with search, filters, and pagination
- **Product Details Page** – Detailed product information with images and pricing

### 🛒 Shopping Flow

- **Cart Page** – Review selected items and update quantities
- **Checkout Page** – Order summary and payment process
- **Payment Page** – Razorpay checkout (Test Mode)

### 👤 User Account

- **Login / Signup** – User authentication via Firebase
- **Forgot Password & Verification** – Account recovery flow
- **My Account / Profile Page** – User profile details
- **Order History** – View past orders
- **Address Management** – Manage delivery addresses
- **My List (Wishlist)** – Save products for later

### 🔍 Utilities

- **Search Page** – Dedicated search experience for products

## 🧠 State Management

The user storefront uses **React Context API** to manage global application state and avoid prop drilling across components.

### Global State Managed

- **Authentication State**
  - User login status
  - User profile data
  - Load user details on app refresh

- **Cart State**
  - Add to cart functionality
  - Fetch and store cart data
  - Loading state during cart operations
  - Open / close cart panel

- **Wishlist (My List) State**
  - Add products to wishlist
  - Fetch wishlist data
  - Loading state for wishlist actions

- **Category & Search State**
  - Category data for product navigation
  - Search data for product search results

- **UI & Layout State**
  - Product details modal handling
  - Address panel open/close state
  - Alert/notification handling
  - Window width for responsive behavior

### Context Structure

- A **single global context provider** is used
- Context exposes both **state values and handler functions**
- Context is consumed across pages and reusable components for consistent behavior

## 🌍 Environment Variables

Create a `.env` file in the `front-end` directory with the following variables:

````env
VITE_API_URL=http://localhost:8000

VITE_FIREBASE_APP_API_KEY=your_key
VITE_FIREBASE_APP_AUTH_DOMAIN=your_domain
VITE_FIREBASE_APP_PROJECT_ID=your_project_id
VITE_FIREBASE_APP_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_APP_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_APP_ID=your_app_id
VITE_FIREBASE_APP_MEASUREMENT_ID=your_measurement_id

VITE_APP_RAZORPAY_KEY_ID=your_razorpay_key
VITE_APP_RAZORPAY_KEY_SECRET=your_razorpay_secret

## ▶️ Run Frontend Locally

### Prerequisites
- Node.js (Latest LTS recommended)
- npm package manager
- Backend server running on `http://localhost:8000`

### Steps
```bash
cd front-end
npm install
npm run dev

## 📸 Screenshots

### 🏠 Home Page
![Home](../screenshots/HomePageClint.png)

### 🛍 Product Listing
![Products](../screenshots/ProductListingClint.png)

### 🔍 Product Details
![Product Details](../screenshots/ProductDetailClint.png)
````

## 🔁 API Flow Diagrams

examplys how work api in img

### 🔐 User Authentication Flow

![Login API Flow](../screenshots/loginflow.png)

### 🛍 Product Browsing Flow

![Product API Flow](../screenshots/productflow.pngg)

### 💳 Order & Payment Flow

![Payment API Flow](../screenshots/paymenflow.png)
