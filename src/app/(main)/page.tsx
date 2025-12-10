import { WelcomeBanner, ContinueCard, CourseGrid } from "@/features/dashboard";

export default function DashboardPage() {
  return (
    <div className="w-full space-y-8 max-w-7xl">
      <WelcomeBanner />
      <ContinueCard />
      <CourseGrid />
    </div>
  );
}
