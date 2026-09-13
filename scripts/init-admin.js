const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

const prisma = new PrismaClient();

async function main() {
  try {
    const username = process.env.ADMIN_USERNAME || 'admin';
    const password = process.env.ADMIN_PASSWORD || 'password123';
    const email = process.env.ADMIN_EMAIL || 'admin@example.com';

    // Check if admin already exists
    const existing = await prisma.adminUser.findUnique({
      where: { username }
    });

    if (existing) {
      console.log('✓ مسؤول موجود بالفعل');
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin
    const admin = await prisma.adminUser.create({
      data: {
        username,
        email,
        password: hashedPassword
      }
    });

    console.log('✓ تم إنشاء المسؤول بنجاح');
    console.log(`  اسم المستخدم: ${username}`);
    console.log(`  البريد الإلكتروني: ${email}`);
  } catch (error) {
    console.error('✗ خطأ:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
