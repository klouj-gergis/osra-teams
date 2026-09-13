import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import DashboardClient from './DashboardClient';

export const metadata = {
  title: 'لوحة التحكم',
  description: 'لوحة التحكم - عرض الإحصائيات',
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/dashboard/login');
  }

  return <DashboardClient username={session.user?.username} />;
}
