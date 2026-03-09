import { mockGrievances } from "@/lib/mockData";

const students = Array.from(
  new Map(
    mockGrievances.map((g) => [g.studentEmail, { email: g.studentEmail, name: g.studentName }])
  ).values()
);

const AdminStudents = () => (
  <div className="container mx-auto max-w-3xl px-4 py-10">
    <h1 className="font-display text-3xl font-bold">Students</h1>
    <div className="mt-8 overflow-x-auto rounded-lg border border-border bg-card shadow-sm">
      <table className="w-full text-sm">
        <thead className="border-b border-border bg-secondary">
          <tr>
            <th className="px-4 py-3 text-left font-semibold">Name</th>
            <th className="px-4 py-3 text-left font-semibold">Email</th>
            <th className="px-4 py-3 text-left font-semibold">Grievances</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.email} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
              <td className="px-4 py-3">{s.name}</td>
              <td className="px-4 py-3">{s.email}</td>
              <td className="px-4 py-3">
                {mockGrievances.filter((g) => g.studentEmail === s.email).length}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default AdminStudents;
