import { DashboardLayout } from "@/layouts/DashboardLayout";
import { StudentNavbar } from "./layout/StudentNavbar";
import { StudentSidebar } from "./layout/StudentSidebar";
import { StudentRoutes } from "./routes";

export default function StudentDashboard() {
  return (
    <DashboardLayout
      navbar={<StudentNavbar />}
      sidebar={<StudentSidebar />}
    >
      <StudentRoutes />
    </DashboardLayout>
  );
}