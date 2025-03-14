# Edu - Ta'lim Platformasi

## Loyiha haqida

Edu - bu zamonaviy ta'lim platformasi bo'lib, o'qituvchilar va o'quvchilar o'rtasidagi ta'lim jarayonini osonlashtirish uchun yaratilgan. Bu platforma kurslarni boshqarish, foydalanuvchilarni ro'yxatdan o'tkazish va kursga yozilish kabi asosiy funksiyalarni taqdim etadi.

## Texnologiyalar

Loyiha quyidagi texnologiyalar asosida yaratilgan:

- **Backend**: Node.js, Express.js
- **Ma'lumotlar bazasi**: PostgreSQL, Sequelize ORM
- **Autentifikatsiya**: JWT (JSON Web Tokens)
- **API Dokumentatsiya**: Swagger
- **Validatsiya**: Express Validator

## O'rnatish

Loyihani o'rnatish uchun quyidagi qadamlarni bajaring:

```bash
# Loyihani klonlash
git clone https://github.com/Hamidjon03/Edu.git
cd Edu

# Kerakli paketlarni o'rnatish
npm install

# .env faylini yaratish
cp .env.example .env
```

`.env` faylini o'zingizning muhitingizga mos ravishda tahrirlang:

```
PORT=3000
HOST=localhost
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key
DB_HOST=localhost
DB_USER=username
DB_PASSWORD=password
DB_NAME=edu_db
DB_PORT=5432
```

## Ishga tushirish

Loyihani ishga tushirish uchun:

```bash
# Development rejimida ishga tushirish
npm run dev

# Production rejimida ishga tushirish
npm start
```

Server odatda `http://localhost:3000` manzilida ishga tushadi.

## Admin foydalanuvchisi

Tizim birinchi marta ishga tushganda avtomatik ravishda admin foydalanuvchisi yaratiladi:

- **Email**: admin@example.com
- **Parol**: Admin123!
- **Rol**: admin
- **Name**: Administrator

## API Endpointlar

### Autentifikatsiya

- **POST /api/auth/register** - Yangi foydalanuvchini ro'yxatdan o'tkazish
- **POST /api/auth/login** - Tizimga kirish va tokenlarni olish
- **POST /api/auth/refresh** - Access tokenni yangilash
- **POST /api/auth/logout** - Tizimdan chiqish va refresh tokenni bekor qilish

### Foydalanuvchilar

- **GET /api/users** - Barcha foydalanuvchilarni olish (admin uchun)
- **GET /api/users/:id** - ID bo'yicha foydalanuvchini olish
- **POST /api/users** - Yangi foydalanuvchi yaratish (admin uchun)
- **PUT /api/users/:id** - Foydalanuvchi ma'lumotlarini yangilash
- **DELETE /api/users/:id** - Foydalanuvchini o'chirish (admin uchun)

### Kurslar

- **GET /api/courses** - Barcha kurslarni olish (autentifikatsiya talab qilinmaydi)
- **GET /api/courses/:id** - ID bo'yicha kursni olish (autentifikatsiya talab qilinmaydi)
- **POST /api/courses** - Yangi kurs yaratish (admin va instructor uchun)
- **PUT /api/courses/:id** - Kurs ma'lumotlarini yangilash (admin va instructor uchun)
- **DELETE /api/courses/:id** - Kursni o'chirish (admin uchun)

### Kursga yozilish

- **GET /api/enrollments** - Barcha yozilishlarni olish (admin uchun)
- **GET /api/enrollments/:id** - ID bo'yicha yozilishni olish (admin va student uchun)
- **POST /api/enrollments** - Yangi yozilish yaratish (autentifikatsiya talab qilinadi)
- **PUT /api/enrollments/:id** - Yozilish ma'lumotlarini yangilash (admin va student uchun)
- **DELETE /api/enrollments/:id** - Yozilishni o'chirish (admin uchun)

## Swagger dokumentatsiyasi

API dokumentatsiyasini ko'rish uchun server ishga tushgandan so'ng `http://localhost:3000/api-docs` manziliga tashrif buyuring.

## Ruxsatlar va rollar

Tizimda quyidagi rollar mavjud:

- **admin** - Tizimning barcha funksiyalariga to'liq kirish huquqiga ega
- **instructor** - Kurslarni yaratish va tahrirlash huquqiga ega
- **student** - Kurslarga yozilish va o'z ma'lumotlarini ko'rish huquqiga ega

## Autentifikatsiya va Avtorizatsiya

Tizim JWT (JSON Web Tokens) orqali autentifikatsiyani amalga oshiradi:

1. **Access Token** - Qisqa muddatli token (odatda 15 daqiqa)
2. **Refresh Token** - Uzoq muddatli token (odatda 7 kun)

Himoyalangan endpointlarga kirish uchun HTTP so'rovning `Authorization` headerida `Bearer` tokenini yuborish kerak:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Xatoliklarni qaytarish

API barcha xatoliklarni standart formatda qaytaradi:

```json
{
  "status": "error",
  "message": "Xatolik haqida ma'lumot",
  "data": { ... } // Agar qo'shimcha ma'lumot bo'lsa
}
```

API quyidagi xatolik kodlarini qaytarishi mumkin:

- **400** - Noto'g'ri so'rov (Bad Request)
- **401** - Autentifikatsiya xatosi (Unauthorized)
- **403** - Ruxsat etilmagan (Forbidden)
- **404** - Topilmadi (Not Found)
- **422** - Validatsiya xatosi (Unprocessable Entity)
- **500** - Serverda ichki xatolik (Internal Server Error)

## Loyiha strukturasi

```
Edu/
├── src/
│   ├── controllers/      # API endpointlar uchun kontrollerlar
│   ├── middleware/       # Middleware funksiyalari
│   ├── models/           # Ma'lumotlar bazasi modellari
│   ├── routes/           # API routelar
│   ├── services/         # Biznes logika
│   ├── utils/            # Yordamchi funksiyalar
│   │   └── adminSeed.js  # Admin foydalanuvchisini yaratish
│   ├── config/           # Konfiguratsiya fayllari
│   ├── docs/             # Swagger dokumentatsiyasi
│   ├── app.js            # Asosiy app fayli
│   └── server.js         # Server ishga tushirish
├── .env                  # Muhit o'zgaruvchilari
├── .gitignore            # Git ignore fayli
├── package.json          # NPM package konfiguratsiyasi
└── README.md             # Siz o'qiyotgan hujjat
