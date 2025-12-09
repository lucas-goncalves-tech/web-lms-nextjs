export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page Heading */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black tracking-tight text-foreground">
          Meu Dashboard
        </h1>
        <p className="text-base text-muted-foreground">
          Bem-vinda de volta, Helena!
        </p>
      </div>

      {/* Continue where you left off Card */}
      <div className="rounded-xl border border-border/50 bg-card/50 p-4 shadow-lg backdrop-blur-md">
        <div className="flex flex-col items-stretch justify-start gap-4 lg:flex-row lg:items-start">
          <div
            className="w-full lg:w-1/3 aspect-video rounded-lg bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600')",
            }}
          />
          <div className="flex w-full grow flex-col items-stretch justify-center gap-3 py-4 lg:px-6 lg:py-0">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Continuar de Onde Parou: Design de UI Avançado
            </h2>
            <p className="text-muted-foreground">Módulo 3: Microinterações</p>
            <div className="w-full rounded-full bg-muted h-2.5">
              <div
                className="bg-primary h-2.5 rounded-full"
                style={{ width: "45%" }}
              />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-foreground">
                Progresso: 45%
              </p>
              <button className="rounded-lg bg-primary px-6 py-2 text-sm font-bold text-primary-foreground hover:bg-primary/90">
                Continuar Aula
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* My Courses Section */}
      <div>
        <h3 className="mb-4 text-2xl font-bold text-foreground">Meus Cursos</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Course Card 1 */}
          <div className="flex flex-col overflow-hidden rounded-xl border border-border/50 bg-card/50 shadow-lg backdrop-blur-md">
            <div
              className="w-full aspect-video bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600')",
              }}
            />
            <div className="flex grow flex-col p-4">
              <h4 className="mb-1 text-lg font-bold text-foreground">
                Introdução ao JavaScript
              </h4>
              <p className="mb-3 text-sm text-muted-foreground">
                Progresso: 80%
              </p>
              <div className="mb-4 h-2 w-full rounded-full bg-muted">
                <div
                  className="h-2 rounded-full bg-primary"
                  style={{ width: "80%" }}
                />
              </div>
              <button className="mt-auto w-full rounded-lg bg-primary/20 px-4 py-2 text-sm font-medium text-foreground hover:bg-primary/30">
                Acessar Curso
              </button>
            </div>
          </div>

          {/* Course Card 2 */}
          <div className="flex flex-col overflow-hidden rounded-xl border border-border/50 bg-card/50 shadow-lg backdrop-blur-md">
            <div
              className="w-full aspect-video bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600')",
              }}
            />
            <div className="flex grow flex-col p-4">
              <h4 className="mb-1 text-lg font-bold text-foreground">
                React: Do Básico ao Avançado
              </h4>
              <p className="mb-3 text-sm text-muted-foreground">
                Progresso: 25%
              </p>
              <div className="mb-4 h-2 w-full rounded-full bg-muted">
                <div
                  className="h-2 rounded-full bg-primary"
                  style={{ width: "25%" }}
                />
              </div>
              <button className="mt-auto w-full rounded-lg bg-primary/20 px-4 py-2 text-sm font-medium text-foreground hover:bg-primary/30">
                Acessar Curso
              </button>
            </div>
          </div>

          {/* Course Card 3 - Completed */}
          <div className="flex flex-col overflow-hidden rounded-xl border border-border/50 bg-card/50 shadow-lg backdrop-blur-md">
            <div
              className="w-full aspect-video bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600')",
              }}
            />
            <div className="flex grow flex-col p-4">
              <h4 className="mb-1 text-lg font-bold text-foreground">
                Princípios de UX Writing
              </h4>
              <p className="mb-3 text-sm text-muted-foreground">
                Progresso: 100%
              </p>
              <div className="mb-4 h-2 w-full rounded-full bg-muted">
                <div
                  className="h-2 rounded-full bg-green-500"
                  style={{ width: "100%" }}
                />
              </div>
              <button className="mt-auto w-full rounded-lg bg-green-500/20 px-4 py-2 text-sm font-medium text-foreground hover:bg-green-500/30">
                Ver Certificado
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
