import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useArticleSEO } from "@/lib/useSEO";

type ProjectItem = {
  name: string;
  description: string;
  url: string;
  focus: string;
  format: string;
};

const projects: ProjectItem[] = [
  {
    name: "EleccionClara",
    description:
      "Explora planes de gobierno, perfiles y comparativas con un enfoque claro y accesible.",
    url: "https://www.eleccionclara.pe/",
    focus: "planes y perfiles",
    format: "fichas y comparador",
  },
  {
    name: "El Poder en tus Manos (RPP)",
    description:
      "Proyecto periodistico con entrevistas, verificacion de propuestas y seguimiento ciudadano.",
    url: "https://rpp.pe/elpoderentusmanos",
    focus: "verificacion y cobertura",
    format: "reportajes y analisis",
  },
  {
    name: "El Mal Menor",
    description:
      "Encuentra informacion sintetizada y visual para evaluar candidatos rapidamente.",
    url: "https://www.elmalmenor.com/",
    focus: "resumenes rapidos",
    format: "fichas visuales",
  },
  {
    name: "Chapa tu Candidato",
    description:
      "Descubre candidatos con dinamicas participativas y contenido educativo.",
    url: "https://chapatucandidato.com/",
    focus: "educacion civica",
    format: "experiencias interactivas",
  },
];

export function ProjectsPage() {
  useArticleSEO(
    "Proyectos para aprender | Capibarismo",
    "Descubre proyectos peruanos para aprender sobre elecciones, comparar candidatos y fortalecer tu decision informada.",
    "2025-01-01",
    "2026-02-25"
  );

  return (
    <div className="min-h-screen fighting-game-bg text-white">
      <div className="container mx-auto p-4 md:p-10">
        <Button
          asChild
          variant="ghost"
          className="mb-8 w-full sm:w-auto justify-center sm:justify-start gap-2 rounded-full border border-border/60 bg-black/20 px-5 py-2 transition-colors hover:border-accent hover:bg-accent/10"
        >
          <Link to="/">
            <ArrowLeft className="h-4 w-4" />
            Volver a Inicio
          </Link>
        </Button>

        <Card className="fighting-game-card mx-auto max-w-5xl border border-border/40 shadow-2xl bg-background/95">
          <CardHeader className="space-y-4 pb-4 text-center">
            <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-accent/50 bg-accent/10 px-4 py-1 text-xs uppercase tracking-[0.2em] text-accent">
              <Sparkles className="h-3.5 w-3.5" />
              Recursos para aprender
            </div>
            <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-display text-accent">
              Proyectos para Informarte Mejor
            </CardTitle>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Estos proyectos peruanos ayudan a entender candidatos, propuestas y contexto politico. Exploralos y arma tu propio criterio con mas informacion verificada.
            </p>
          </CardHeader>

          <CardContent className="space-y-8">
            <section className="grid gap-5 sm:grid-cols-2">
              {projects.map((project) => (
                <article
                  key={project.name}
                  className="group rounded-2xl border border-border/50 bg-background/70 p-5 transition-all duration-200 hover:border-accent/60 hover:bg-background/80"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold text-foreground">{project.name}</h3>
                    <ExternalLink className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-accent" />
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge variant="secondary" className="rounded-full bg-accent/15 text-accent">
                      {project.focus}
                    </Badge>
                    <Badge variant="outline" className="rounded-full border-border/70 text-muted-foreground">
                      {project.format}
                    </Badge>
                  </div>
                  <a
                    className="mt-4 inline-flex w-full items-center justify-between rounded-xl border border-border/70 bg-black/20 px-4 py-2 text-sm font-semibold text-foreground transition-all hover:border-accent hover:bg-accent/10"
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Visitar proyecto
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </article>
              ))}
            </section>

            <section className="rounded-2xl border border-border/50 bg-gradient-to-br from-accent/10 via-transparent to-primary/10 p-5 text-sm text-muted-foreground">
              <p>
                Consejo rapido: guarda los proyectos que mas te sirven y comparalos con tu experiencia en Capibarismo. Mientras mas fuentes contrastes, mas fuerte sera tu decision.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
