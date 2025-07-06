
# 🧠 Social Media Post Sharing Platform

A full-stack social media platform where users can share posts with text and/or images, like, comment, follow other users, and use AI-powered features such as auto-generating post captions and categorizing content.

---

## 🚀 Features

### 📝 Post Functionality
- Create, delete, and view posts
- Add captions and images (Cloudinary integration)
- Like/unlike posts
- Comment on posts
- View like and comment count
- Filter posts by category (e.g., Technology, Food, Fitness)

### 👥 User Features
- Authentication using JWT
- Profile page with user posts
- View user information and avatars

### 🤖 AI-Powered Features (Gemini API)
- Generate catchy AI captions for posts
- Auto-detect category for a given post caption

### 🔍 Search
- Debounced search in navbar
- Type `@username` to search and list users dynamically

---

## 🛠 Tech Stack

### Frontend
- React + Vite
- Tailwind CSS
- React Router DOM

### Backend
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JWT Authentication

### Other Tools
- Cloudinary (image uploads)
- Gemini API (AI caption & category generation)

---

## 📦 Installation

### 🔧 Backend

```bash
git clone https://github.com/nestorbird-nitish/UnIsocial.git
```

```bash
cd UnIsocial
```

### set-up frontend

```bash 
cd frontend
```

```bash
npm install
```


```bash
npm run dev
```




### set-up backend

```bash 
cd backend
```

##### create and set .env file using .env.sample


```bash
npm install
```
```bash
npx prisma migrate dev --name init
```

```bash
npm run dev
```


## Created By

**Nitish Kumar** 
 
[![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?logo=linkedin&style=flat-square)](https://linkedin.com/in/devlpr-nitish)  
[GitHub](https://github.com/devlpr-nitish)
