// app/[locale]/layout.tsx
import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/sidebar";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
  return (
    <div
      className="h-screen"
      dir={params.locale === "ar" ? "rtl" : "ltr"}
    >
      <div className="flex">
        {/* Sidebar for large screens */}
<div className="hidden lg:block lg:w-1/4 sticky top-0 h-screen">
            <Sidebar collapsed={false} />
        </div>

        {/* Main Content Area */}
        <div className="w-full lg:w-3/4">
          <header className="h-16 bg-white shadow-md sticky top-0 z-30">
            <Navbar />
          </header>

          {/* Page Content */}
          <div className="p-4 lg:p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}