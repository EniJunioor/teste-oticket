import DashboardLayout from '@/app/dashboard/layout';

export default function ClientesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
