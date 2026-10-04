export type Project = {
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl: string;
};

const btn = "inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-5 py-2 text-sm font-semibold transition hover:brightness-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";
const btn2 = "inline-flex min-h-11 items-center justify-center rounded-full border border-line px-5 py-2 text-sm font-semibold transition hover:bg-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export default function ProjectsGallery({ projects }: { projects: Project[] }) {
  return (
    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((p) => (
        <article key={p.title} className="flex flex-col border border-line bg-card/40 p-6">
          <h3 className="text-xl font-semibold">{p.title}</h3>
          <p className="mt-3 text-sm leading-[1.6] text-muted">{p.description}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <li key={t} className="border border-line px-3 py-1 text-xs text-muted">{t}</li>
            ))}
          </ul>
          <div className="mt-auto flex flex-wrap gap-3 pt-5">
            {p.liveUrl && (
              <a href={p.liveUrl} target="_blank" rel="noreferrer" aria-label={`Live demo of ${p.title}`} className={btn}>
                Live demo
              </a>
            )}
            <a href={p.githubUrl} target="_blank" rel="noreferrer" aria-label={`GitHub repository for ${p.title}`} className={btn2}>
              GitHub
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
