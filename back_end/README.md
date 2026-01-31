# Backend API – Fullstack E-Commerce

This backend is a **RESTful API** built for the Fullstack E-Commerce application.  
It serves both the **Admin Dashboard** and **User Storefront**, handling authentication, authorization, product management, inventory control, orders, and payment-related operations.

The backend follows a **clean MVC architecture** using controllers, routes, and models to ensure scalability, maintainability, and separation of concerns.  
Authentication is implemented using **JWT-based access and refresh tokens**, providing secure and role-based access for admin and users.

## 🛠 Backend Tech Stack

### Core Technologies

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

### Authentication & Security

- JWT (Access & Refresh Tokens)
- bcryptjs (Password hashing)
- cookie-parser (Secure cookie handling)
- Helmet (HTTP security headers)
- CORS (Cross-origin request handling)
- express-rate-limit (API rate limiting)

### File & Media Handling

- Multer (File upload handling)
- Cloudinary SDK (Image storage)

### Utilities & Development Tools

- Nodemailer (Email services)
- dotenv (Environment variable management)
- Morgan (HTTP request logging)
- Nodemon (Development server)

## 📁 Folder Structure

The backend follows a clean and scalable **MVC architecture**, ensuring separation of concerns and maintainability.

````text
back-end/
├── controllers/     # Business logic for each API
├── routes/          # API route definitions
├── models/          # Mongoose schemas and models
├── middlewares/     # Auth, error handling, rate limiting, etc.
├── utils/           # Helper functions (tokens, email, pagination, uploads)
├── config/          # Database, Cloudinary, and app configurations
├── uploads/         # Temporary file storage (if applicable)
├── index.js         # Application entry point
└── package.json
````

## 🔐 Authentication Flow

The backend uses a **JWT-based authentication system** with access and refresh tokens to ensure security and scalability.

### Token Strategy
- **Access Token**
  - Expiry: **30 minutes**
  - Used to authorize protected API requests

- **Refresh Token**
  - Expiry: **7 days**
  - Stored securely in the **database**
  - Used to issue new access tokens when expired

### Authentication Process
1. User logs in successfully.
2. Backend generates an **access token** and a **refresh token**.
3. Access token is used for protected API calls.
4. When the access token expires, the user must re-authenticate (refresh endpoint not implemented).
5. On logout, the stored refresh token is removed from the database.

### Logout
- Logout is supported by invalidating the refresh token stored in the database.

# ⚙️ API Features Documentation

This document describes all backend APIs based on the actual Express.js routes implemented in the project.

---

## 🔐 Authentication & User APIs
**Base Path:** `/api/user`

### ✅ Authentication
- **POST** `/register` – User registration
- **POST** `/verifyEmail` – Email verification using OTP
- **POST** `/login` – User login
- **POST** `/googleLogin` – Google OAuth login
- **GET** `/logout` – Logout user *(Auth required)*
- **POST** `/refresh-token` – Generate new access token

### 🔑 Password Recovery
- **POST** `/forgot-password` – Send OTP for password reset
- **POST** `/verify-forgot-password-otp` – Verify reset OTP
- **POST** `/reset-password` – Reset password

### 👤 User Profile
- **GET** `/user-details` – Get authenticated user profile
- **POST** `/:id` – Update user details
- **POST** `/user-avatar` – Upload / update user avatar
- **DELETE** `/deleteImage` – Remove avatar image

### 🛡 Admin / User Management
- **GET** `/userCount` – Total users count
- **DELETE** `/userDelete/:id` – Delete single user
- **DELETE** `/multiUserDelete` – Delete multiple users

---

## 🗂 Category APIs
**Base Path:** `/api/category`

- **POST** `/create` – Create category
- **POST** `/:id` – Update category
- **GET** `/categories` – Get all categories
- **GET** `/:id` – Get single category
- **GET** `/get/count` – Category count
- **GET** `/get/count/subCat` – Subcategory count
- **POST** `/uploadImages` – Upload category images
- **DELETE** `/deleteImage` – Delete category image
- **DELETE** `/:id` – Delete category
- **DELETE** `/deleteMultiCat` – Delete multiple categories

✔ Supports **subcategory & third-level category hierarchy**

---

## 📦 Product APIs
**Base Path:** `/api/product`

### 🧾 Product CRUD
- **POST** `/create` – Create product
- **PUT** `/updateProduct/:id` – Update product
- **DELETE** `/:id` – Delete product
- **GET** `/:id` – Get single product

### 📊 Product Fetching
- **GET** `/getAllProducts` – Products with pagination & filters
- **GET** `/filter` – Advanced product filters
- **GET** `/search` – Search products
- **GET** `/getAllProductCount` – Total products count
- **GET** `/getAllFeaturedProduct` – Featured products

### 📂 Category-Based Products
- **GET** `/getAllProductsByCatId/:Id`
- **GET** `/getAllProductsByCatName`
- **GET** `/getAllProductsBySubCatId/:Id`
- **GET** `/getAllProductsBySubCatName`
- **GET** `/getAllProductsByThirdLevelCatId/:Id`
- **GET** `/getAllProductsByThirdLevelCatName`

### 💰 Price & Rating
- **GET** `/getAllProductsByPrice`
- **GET** `/getAllProductByRating`

---

### ⭐ Product Variants
- **POST** `/productRAMs/create`
- **POST** `/productSizes/create`
- **POST** `/productWeights/create`
- **GET** `/getAllProductsRAMs`
- **GET** `/getAllProductsSizes`
- **GET** `/getAllProductsWeights`
- **PUT** `/updateProductRAMs/:id`
- **PUT** `/updateProductSizes/:id`
- **PUT** `/updateProductWeights/:id`
- **DELETE** `/productRAMs/:id`
- **DELETE** `/productSizes/:id`
- **DELETE** `/productWeights/:id`

---

### 📝 Reviews
- **POST** `/addReview/:id`
- **PUT** `/updateReview/:id`
- **GET** `/getAllReviews/:id`
- **DELETE** `/reviewDelete/:id`
- **POST** `/uploadReviewImages`

---

### 🖼 Product Media
- **POST** `/uploadImages` – Upload product images
- **DELETE** `/deleteImage` – Remove product image
- **DELETE** `/deleteMultiple` – Delete multiple products

---

## 🛒 Cart APIs
**Base Path:** `/api/cart`

- **POST** `/add` – Add item to cart
- **GET** `/get` – Get cart items
- **PUT** `/update-item` – Update item quantity
- **DELETE** `/delete-cart-item/:id` – Remove item from cart

---

## ❤️ Wishlist (My List) APIs
**Base Path:** `/api/myList`

- **POST** `/mylist-add` – Add product to wishlist
- **GET** `/get-mylist` – Get wishlist items
- **DELETE** `/delete-mylist/:id` – Remove wishlist item

---

## 📦 Order APIs
**Base Path:** `/api/order`

- **POST** `/create` – Create order
- **GET** `/order-list` – Get user orders
- **GET** `/all-order-list` – Get all orders (Admin)
- **PUT** `/update-order/:id` – Update order status

### 💳 Payments (PayPal)
- **GET** `/create-order-paypal`
- **GET** `/capture-order-paypal`

### 📊 Analytics
- **GET** `/sales` – Total sales
- **GET** `/users` – Total users count

---

## 🏠 Address APIs
**Base Path:** `/api/address`

- **POST** `/add` – Add address
- **PUT** `/update/:id` – Update address
- **POST** `/set-default` – Set default address
- **GET** `/get` – Get user addresses
- **DELETE** `/delete/:id` – Delete address

---

## 🖼 Banner APIs

**Base Paths:**
- `/api/banner`
- `/api/bannerv2`
- `/api/bannerboxv1`
- `/api/bannerboxv2`

### Common Banner Endpoints
- **POST** `/upload` – Upload banner images
- **POST** `/createBanner` – Create banner
- **GET** `/all` – Get all banners
- **GET** `/:id` – Get single banner
- **POST** `/:id` – Update banner
- **PUT** `/:id` – Activate / deactivate banner
- **DELETE** `/remove-image` – Remove banner image
- **DELETE** `/delete-multiple` – Delete multiple banners
- **DELETE** `/:id` – Delete banner

---

## 📝 Blog APIs
**Base Path:** `/api/blog`

- **POST** `/upload` – Upload blog images
- **POST** `/create` – Create blog
- **GET** `/all` – Get all blogs
- **GET** `/:id` – Get single blog
- **POST** `/:id` – Update blog content
- **PUT** `/:id` – Update blog active status
- **DELETE** `/remove-image` – Remove blog image
- **DELETE** `/delete-multiple` – Delete multiple blogs
- **DELETE** `/:id` – Delete blog

---

## 🔐 Security & Middleware
- JWT-based authentication
- Role-based admin protection
- Cloudinary image & media storage
- OTP-based email verification
- Secure refresh token handling

---


## 🔗 API Endpoints (Overview)

All backend APIs are prefixed with `/api` and are consumed by both the **Admin Dashboard** and **User Storefront**.

### 👤 User & Authentication
- `/api/user`
  User registration, login, authentication, profile management, password reset, and OTP verification.

### 🗂 Category Management
- `/api/category`
  Category and subcategory CRUD operations.

### 📦 Product Management
- `/api/product`
  Product CRUD operations, product listing with pagination, filtering, and search.

### 🛒 Cart
- `/api/cart`
  Add, update, remove products from cart.

### 📦 Orders
- `/api/order`
  Order creation, checkout handling, and order history.

### ❤️ Wishlist
- `/api/myList`
  Manage user wishlist items.

### 🏠 Address Management
- `/api/address`
  Add, update, delete, and fetch user delivery addresses.

### 🖼 Banner & UI Content
- `/api/banner`
- `/api/bannerv2`
- `/api/bannerboxv1`
- `/api/bannerboxv2`
  APIs for managing homepage banners and promotional UI content.

### 📝 Blog
- `/api/blog`
  Blog creation, listing, and content management.

## ▶️ Run Backend Locally

### Prerequisites
- Node.js (Latest LTS recommended)
- npm package manager
- MongoDB Atlas connection
- Required environment variables configured

### Steps
```bash
cd back-end
npm install
npm run dev
```
## 🔒 Security Practices

- Passwords are securely hashed using **bcryptjs**
- JWT-based authentication with **access and refresh tokens**
- Refresh tokens are stored securely in the **database**
- Protected routes using **role-based access control**
- **HTTP-only cookies** used where applicable
- API rate limiting using **express-rate-limit**
- Secure HTTP headers via **Helmet**
- CORS configured to allow trusted origins only
- Environment variables used for all sensitive credentials
  

## 🏗 System Architecture

This backend is part of a larger MERN-based system.  
Refer to the main repository README for the complete architecture diagram.
