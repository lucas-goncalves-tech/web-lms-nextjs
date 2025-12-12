import { CreateCourseForm } from "@/features/admin/create-course-form";

export default function CourseCreatePage() {
  return (
    <div className="space-y-8 max-w-2xl w-full">
      {/* Page Heading */}
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-4xl font-black tracking-tight text-foreground">
          Criar Curso
        </h1>
        <p className="text-base text-muted-foreground">
          Preencha os dados para criar um novo curso
        </p>
      </div>

      {/* Create Course Form */}
      <CreateCourseForm />
    </div>
  );
}
