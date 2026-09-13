# Teams Form Application

استمارة اختيار التيم - تطبيق Full-Stack مع لوحة تحكم إدارية

## 🚀 البدء السريع

### المتطلبات
- Node.js 18+ و npm/yarn
- قاعدة بيانات PostgreSQL

### خطوات التثبيت

1. **استنساخ أو تنزيل المشروع**
```bash
cd teams-form-app
```

2. **تثبيت المكتبات**
```bash
npm install
```

3. **إعداد متغيرات البيئة**
- انسخ `.env.example` إلى `.env.local`
- أضف رابط قاعدة البيانات:
```
DATABASE_URL="postgresql://user:password@localhost:5432/teams_form"
```
- غيّر `NEXTAUTH_SECRET` برمز عشوائي آمن
- عدّل بيانات المسؤول إذا أردت

4. **إعداد قاعدة البيانات**
```bash
npm run prisma:migrate
```

5. **تشغيل التطبيق محليًا**
```bash
npm run dev
```
- الموقع الرئيسي: http://localhost:3000
- لوحة التحكم: http://localhost:3000/dashboard

## 📋 النشر على Vercel

### خطوات النشر

1. **ادفع الكود إلى GitHub** (إذا لم تكن قد فعلت)

2. **انتقل إلى [vercel.com](https://vercel.com)**
   - انقر على "New Project"
   - اختر المستودع الخاص بك

3. **أضف متغيرات البيئة**
   - في صفحة الإعدادات، أضف:
     - `DATABASE_URL`: رابط PostgreSQL الإنتاجي (من Neon, Railway, إلخ)
     - `NEXTAUTH_SECRET`: رمز عشوائي آمن
     - `NEXTAUTH_URL`: رابط موقعك على Vercel
     - بيانات المسؤول

4. **نشر**
   - انقر "Deploy"
   - سيتم تشغيل الترحيلات تلقائيًا

## 🔐 إدارة قاعدة البيانات

### استخدام Prisma Studio محليًا
```bash
npm run prisma:studio
```

### ترحيل قاعدة البيانات
```bash
npm run prisma:migrate
```

## 📱 استخدام التطبيق

### الصفحة الرئيسية
- يملأ المستخدم الاستمارة بالبيانات
- يختار واحد أو أكثر من التيمات
- يرسل الاستمارة

### لوحة التحكم
- الوصول: http://yoursite.com/dashboard
- اسم المستخدم وكلمة المرور: من `.env.local`
- عرض الإحصائيات والردود
- تصفية الردود حسب التيم

## 🛠️ المتغيرات المهمة

```env
# قاعدة البيانات
DATABASE_URL="postgresql://..."

# التشفير والجلسات
NEXTAUTH_SECRET="رمز-عشوائي-آمن"
NEXTAUTH_URL="http://localhost:3000" أو "https://yoursite.vercel.app"

# بيانات المسؤول
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="password123"
ADMIN_EMAIL="admin@example.com"
```

## 📊 ملخص الميزات

✅ استمارة تفاعلية بالعربية
✅ حفظ البيانات في PostgreSQL
✅ لوحة تحكم إدارية محمية بكلمة مرور
✅ إحصائيات فورية
✅ تصفية حسب التيم
✅ عرض جميع الردود مع التفاصيل
✅ نشر سهل على Vercel

## 🚨 الملاحظات الأمنية

- غيّر `NEXTAUTH_SECRET` في الإنتاج
- استخدم كلمة مرور قوية للمسؤول
- استخدم متغيرات البيئة للبيانات الحساسة
- لا تحفظ `.env` في الإصدار

## 📞 الدعم

إذا واجهت مشاكل:
1. تأكد من أن رابط قاعدة البيانات صحيح
2. تحقق من أن `NEXTAUTH_SECRET` معرّف
3. تأكد من تشغيل الترحيلات

## 📝 الترخيص

جميع الحقوق محفوظة © 2024
