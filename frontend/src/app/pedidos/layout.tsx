import DashboardLayout from '@/app/dashboard/layout';

export default function PedidosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
