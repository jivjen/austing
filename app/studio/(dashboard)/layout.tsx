import StudioSidebar from "@/components/studio/StudioSidebar";

export const metadata = {
  title: "Studio | AustinG Jewellery",
  robots: { index: false, follow: false },
};

export default function StudioDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-blush/20">
      <StudioSidebar />
      <main className="flex-1 px-8 py-8 max-w-[1700px]">{children}</main>
    </div>
  );
}
