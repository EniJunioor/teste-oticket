import DashboardLayout from '@/app/dashboard/layout';

export default function ProdutosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
