# 📈 دليل نشر على Vercel

## الخطوة 1: إنشاء قاعدة بيانات PostgreSQL

اختر واحدة من هذه الخيارات:

### 🟠 الخيار الأول: Neon (موصى به)
1. انتقل إلى [neon.tech](https://neon.tech)
2. أنشئ حساب مجاني
3. أنشئ مشروع جديد
4. انسخ رابط الاتصال: `postgresql://...`

### 🔵 الخيار الثاني: Railway
1. انتقل إلى [railway.app](https://railway.app)
2. أنشئ حساب وتسجيل الدخول
3. أنشئ مشروع جديد
4. أضف قاعدة بيانات PostgreSQL
5. انسخ رابط الاتصال

### ⚫ الخيار الثالث: Supabase
1. انتقل إلى [supabase.com](https://supabase.com)
2. أنشئ مشروع جديد
3. انسخ رابط الاتصال من الإعدادات

## الخطوة 2: إعداد Vercel

### أ. دفع الكود إلى GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/teams-form-app.git
git push -u origin main
```

### ب. ربط Vercel مع GitHub
1. انتقل إلى [vercel.com](https://vercel.com)
2. سجل الدخول أو أنشئ حساب
3. انقر "New Project"
4. اختر المستودع `teams-form-app`
5. انقر "Import"

### ج. إضافة متغيرات البيئة
في صفحة "Environment Variables"، أضف:

```
DATABASE_URL=postgresql://user:password@host/database
NEXTAUTH_SECRET=your-random-secret-key-here
NEXTAUTH_URL=https://your-site.vercel.app
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password
ADMIN_EMAIL=admin@example.com
```

**ملاحظة:** استخدم رمز عشوائي آمن لـ `NEXTAUTH_SECRET`. يمكنك توليد واحد بـ:
```bash
openssl rand -hex 32
```

## الخطوة 3: النشر

1. انقر "Deploy"
2. انتظر حتى ينتهي البناء
3. سيتم تشغيل الترحيلات تلقائيًا

## الخطوة 4: إنشاء حساب المسؤول

بعد النشر الناجح:

```bash
# إذا كنت تستخدم Vercel CLI محليًا
vercel env pull

# ثم شغّل السكريبت
npm run init:admin
```

أو يمكنك استخدام Prisma Studio في بيئة Vercel:

```bash
vercel env pull
npx prisma studio
```

## ✅ اختبار التطبيق

1. **الصفحة الرئيسية**
   ```
   https://your-site.vercel.app
   ```

2. **لوحة التحكم**
   ```
   https://your-site.vercel.app/dashboard
   ```
   - استخدم بيانات المسؤول التي أضفتها

## 🔧 استكشاف الأخطاء

### "Database connection failed"
- تحقق من `DATABASE_URL` في متغيرات البيئة
- تأكد من أن IP address قاعدة البيانات مسموح

### "NEXTAUTH_SECRET is missing"
- أضف `NEXTAUTH_SECRET` في متغيرات البيئة
- استخدم رمز قوي عشوائي

### "Cannot find module '@prisma/client'"
- الترحيلات قد لم تعمل بشكل صحيح
- جرّب إعادة النشر

## 📊 المراقبة

في Vercel Dashboard:
- انقر على المشروع
- اذهب إلى "Analytics" لمراقبة الأداء
- تحقق من الأخطاء في "Functions"

## 🔐 نصائح الأمان

✓ غيّر كلمة مرور المسؤول بشكل دوري
✓ استخدم متغيرات بيئة آمنة لجميع البيانات الحساسة
✓ فعّل HTTPS (Vercel يفعله افتراضيًا)
✓ راقب السجلات بحثًا عن محاولات دخول غير صحيحة
✓ استخدم VPN أو IP whitelist إذا كان ذلك متاحًا

## 🆘 الدعم الإضافي

- [وثائق Vercel](https://vercel.com/docs)
- [وثائق Next.js](https://nextjs.org/docs)
- [وثائق Prisma](https://www.prisma.io/docs)
