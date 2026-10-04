import { Bot, Cloud, Database, Search, ShieldCheck, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";
import { FaDocker, FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { SiAnthropic, SiDocker, SiFastapi, SiHuggingface, SiLangchain, SiLanggraph, SiPython, SiReact, SiCrewai } from "react-icons/si";
import NetworkBackground from "../components/NetworkBackground";
import ChatWidget from "../components/ChatWidget";
import MobileNav from "../components/MobileNav";
import ExperienceTimeline from "../components/ExperienceTimeline";
import ContactForm from "../components/ContactForm";
import ProjectsGallery from "../components/ProjectsGallery";

const btn = "inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-6 py-3 font-semibold transition hover:brightness-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";
const btn2 = "inline-flex min-h-11 items-center justify-center rounded-full border border-line px-6 py-3 font-semibold transition hover:bg-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";
const sec = "mx-auto max-w-6xl scroll-mt-16 px-6 py-20";

const strengths = [
  {
    title: "Retrieval",
    description: "Chunking, embeddings and vector search with VectorDB keep every answer grounded in the source documents.",
    Icon: Database,
  },
  {
    title: "Orchestration",
    description: "Multi-agent workflows in LangGraph and CrewAI, with tool calling, memory and human-in-the-loop control.",
    Icon: Workflow,
  },
  {
    title: "Evaluation",
    description: "Evaluating production-grade GenAI applications using DeepEval, Ragas, G-Eval and LangSmith, so quality is measured, not assumed.",
    Icon: ShieldCheck,
  },
];
const pipeline: { step: string; detail: string; Icon: LucideIcon }[] = [
  { step: "Retrieve", detail: "Chunk, embed and search documents so answers start from evidence.", Icon: Search },
  { step: "Orchestrate", detail: "Agents and tools wired together in LangGraph and CrewAI.", Icon: Workflow },
  { step: "Evaluate", detail: "Golden sets and offline tests catch regressions before users do.", Icon: ShieldCheck },
  { step: "Ship", detail: "FastAPI backends, Docker images and live demos.", Icon: Cloud },
];
const stack: { name: string; Icon?: IconType | LucideIcon }[] = [
  { name: "Python", Icon: SiPython },
  { name: "LangChain", Icon: SiLangchain },
  { name: "LangGraph", Icon: SiLanggraph },
  { name: "CrewAI", Icon: SiCrewai },
  { name: "Vector DB", Icon: Database },
  { name: "FastAPI", Icon: SiFastapi },
  { name: "Docker", Icon: SiDocker },
  { name: "React", Icon: SiReact },
  { name: "Hugging Face", Icon: SiHuggingface },
  { name: "RAG", Icon: Search },
];
const stats = [["4+", "Years in data and AI"], ["5", "Open-source GenAI projects"], ["3", "Certifications from OpenAI and Anthropic"]];
const projects = [
  { name: "3GPP RAG Chatbot", desc: "Retrieval-augmented Q&A over 3GPP telecom specs. Every claim is checked against retrieved evidence with an NLI entailment model before it reaches the user, so the bot refuses instead of hallucinating when it isn't sure. Covered by 44 offline tests and a 24-question evaluation set, 6 of them out-of-scope questions it should refuse.", stack: ["Python", "FastAPI", "FAISS", "Sentence-Transformers", "Groq", "Streamlit"], demo: "https://3gpp-rag-chatbot-gybyshuwfqefkeatxsrymz.streamlit.app/", repo: "https://github.com/sahilkumar01git/3gpp-rag-chatbot" },
  { name: "RateCon Extract", desc: "LLM pipeline that turns messy freight rate confirmations into schema-validated JSON, with financial reconciliation and a confidence-scored routing gate tuned to the real cost of a bad auto-booked rate. Scored against a 16-record golden set, with an offline test suite that makes zero API calls.", stack: ["Python", "Pydantic", "OpenAI API", "Typer", "Pytest"], repo: "https://github.com/sahilkumar01git/ratecon-extract" },
  { name: "Multi-Document AI Assistant", desc: "Ask questions across several PDFs at once, answered from a full RAG pipeline. MMR retrieval picks the 6 most relevant passages from 24 candidates, and every answer shows its source pages.", stack: ["Python", "LangChain", "ChromaDB", "Groq", "Streamlit"], demo: "https://multi-document-ai-assistant-kqee4nxdtasrm2vurxtkla.streamlit.app/", repo: "https://github.com/sahilkumar01git/multi-document-ai-assistant" },
  { name: "AI Multi-Agent System Designer", desc: "Four role-based agents turn a product idea into a software architecture, backend design and development timeline.", stack: ["Python", "CrewAI", "LangGraph", "Streamlit", "OpenRouter"], demo: "https://multi-agent-system-designer-de67yfqnrxv9ncm57jt8cm.streamlit.app/", repo: "https://github.com/sahilkumar01git/multi-agent-system-designer" },
  { name: "Voice AI Interview Coach", desc: "Practice interviews by voice or text. It remembers earlier answers and ends with feedback on strengths and areas to improve. Every answer is scored from 1 to 10, with a running average.", stack: ["Python", "Streamlit", "Groq", "Speech Recognition"], demo: "https://voice-ai-interview-coach-fzpscd4gnxrzk26kgowy54.streamlit.app/", repo: "https://github.com/sahilkumar01git/Voice-AI-Interview-Coach" },
];
const galleryProjects = projects.map((p) => ({
  title: p.name,
  description: p.desc,
  tags: p.stack,
  liveUrl: p.demo,
  githubUrl: p.repo,
}));
const jobs = [
  { title: "Generative AI Engineer", company: "Freelance", dates: "Mar 2024 to present", description: "Builds RAG pipelines, multi-agent workflows and FastAPI backends for LLM apps." },
  { title: "Technical Process Associate (L2)", company: "Tech Mahindra", dates: "Jun 2023 to Dec 2024", description: "Handled escalated cases with structured troubleshooting and clear documentation." },
  { title: "Data Analyst", company: "Freelance", dates: "Aug 2022 to Oct 2023", description: "Data cleaning, EDA and dashboards with Python, Pandas and SQL." },
];
const certifications: { name: string; issuer: string; url: string; Icon: IconType | LucideIcon }[] = [
  { name: "Agents and Workflows", issuer: "OpenAI", url: "https://oaiacademy.credential.net/4a750415-1268-46bc-afff-0c7e1f916c71", Icon: Bot },
  { name: "Model Context Protocol: Advanced Topics", issuer: "Anthropic", url: "https://academy.claude.com/verify/082238a067cfea726eebb829d4e36654", Icon: SiAnthropic },
  { name: "Claude Code in Action", issuer: "Anthropic", url: "https://academy.claude.com/verify/0e6eb363222b5737c6d53dc5a70e099d", Icon: SiAnthropic },
];
const navLinks = ["About", "Projects", "Experience", "Certifications", "Contact"];
const links: { name: string; url: string; Icon: IconType }[] = [
  { name: "Email", url: "mailto:sahil.kumar.tech01@gmail.com", Icon: FaEnvelope },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/sahil-kumar-321a2839b/", Icon: FaLinkedin },
  { name: "GitHub", url: "https://github.com/sahilkumar01git", Icon: FaGithub },
  { name: "Docker Hub", url: "https://hub.docker.com/u/sahilkumar01docker", Icon: FaDocker },
];

export default function Home() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2">Skip to content</a>
      <NetworkBackground />
      <header className="fixed top-0 z-40 w-full border-b border-line/50 bg-bg/95 backdrop-blur-sm">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a href="#home" className="text-lg font-bold">Sahil Kumar</a>
          <ul className="hidden gap-8 text-muted md:flex">
            {navLinks.map((l) => (
              <li key={l}><a href={`#${l.toLowerCase()}`} className="hover:text-white">{l}</a></li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <a href="#contact" className={btn + " py-2 text-sm"}>Get in touch</a>
            <MobileNav links={navLinks} />
          </div>
        </nav>
      </header>

      <main id="main" className="overflow-x-clip">
        <section id="home" className="relative mx-auto grid max-w-6xl scroll-mt-16 items-center gap-12 px-6 pt-32 md:min-h-[740px] md:grid-cols-2 md:pb-20">
          <div className="relative z-10 max-w-xl">
            <p className="inline-block rounded-full border border-line bg-card/60 px-4 py-1 text-sm text-muted">Generative AI Engineer</p>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight md:text-6xl">Turning ideas into AI systems that work.</h1>
            <p className="mt-6 max-w-lg text-muted">Hi, I'm Sahil — a Generative AI Engineer focused on building intelligent, scalable AI applications using LLMs, RAG, Agentic AI, and modern backend technologies. I enjoy turning complex ideas into practical, production-ready solutions.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#projects" className={btn}>View projects</a>
              <a href="/Sahil_Resume.pdf" download className={btn2}>Download resume</a>
            </div>
          </div>
          <div className="relative z-10 hidden border border-line bg-card/60 p-8 md:block">
            <p className="text-xs font-medium uppercase tracking-[0.1em] text-muted">How I build</p>
            <ol className="mt-6 space-y-5">
              {pipeline.map(({ step, detail, Icon }, i) => (
                <li key={step} className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-bg text-accent"><Icon aria-hidden="true" size={22} /></span>
                  <span>
                    <span className="block font-semibold"><span className="text-muted">0{i + 1}</span> {step}</span>
                    <span className="mt-1 block text-sm text-muted">{detail}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="about" className={sec + " about-glow"}>
          <div className="max-w-[600px]">
            <p className="text-xs font-medium uppercase tracking-[0.1em] text-muted">About</p>
            <h2 className="mt-4 text-3xl font-semibold leading-[1.25] md:text-4xl">Building Reliable GenAI Systems, From Retrieval to Evaluation</h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3 md:gap-10">
            {strengths.map(({ title, description, Icon }) => (
              <article key={title}>
                <div className="flex h-[50px] w-[50px] items-center justify-center bg-card text-accent">
                  <Icon aria-hidden="true" size={26} strokeWidth={1.8} />
                </div>
                <h3 className="mt-5 text-2xl font-medium">{title}</h3>
                <p className="mt-3 text-sm leading-[1.6] text-muted">{description}</p>
              </article>
            ))}
          </div>
          <p className="mt-14 text-xs font-medium text-muted">Stack I build with</p>
          <ul className="mt-4 grid grid-cols-2 border-l border-t border-line md:grid-cols-3 lg:grid-cols-4">
            {stack.map(({ name, Icon }) => (
              <li key={name} className="flex h-24 items-center justify-center border-b border-r border-line bg-bg/40 px-3">
                <span className="flex items-center justify-center gap-3 font-semibold text-white/75 transition duration-200 ease-out hover:scale-110 hover:text-white motion-reduce:transition-none">
                  {Icon && <Icon aria-hidden="true" size={28} />}
                  <span>{name}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-6 sm:grid-cols-3">
          {stats.map(([n, l]) => (
            <div key={l} className="border border-line bg-card/60 p-6 text-center">
              <p className="text-4xl font-extrabold">{n}</p>
              <p className="mt-1 text-sm text-muted">{l}</p>
            </div>
          ))}
        </section>

        <section id="projects" className={sec}>
          <p className="text-xs font-medium uppercase tracking-[0.1em] text-muted">Projects</p>
          <h2 className="mt-4 text-3xl font-semibold leading-[1.25] md:text-4xl">Selected work</h2>
          <ProjectsGallery projects={galleryProjects} />
          <p className="mt-10 text-sm text-muted">Demos run on free hosting and may take about 30 seconds to wake up.</p>
        </section>

        <section id="experience" className={sec}>
          <p className="text-xs font-medium uppercase tracking-[0.1em] text-muted">Experience</p>
          <h2 className="mt-4 text-3xl font-semibold leading-[1.25] md:text-4xl">The <em>journey</em></h2>
          <ExperienceTimeline jobs={jobs} />
        </section>

        <section id="certifications" className={sec}>
          <p className="text-xs font-medium uppercase tracking-[0.1em] text-muted">Certifications</p>
          <h2 className="mt-4 text-3xl font-semibold leading-[1.25] md:text-4xl">Licenses &amp; <em>credentials</em></h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((c) => (
              <article key={c.name} className="flex flex-col">
                <div className="flex h-[50px] w-[50px] items-center justify-center bg-card text-accent">
                  <c.Icon aria-hidden="true" size={22} />
                </div>
                <h3 className="mt-5 text-lg font-medium leading-snug">{c.name}</h3>
                <p className="mt-2 text-sm text-muted">{c.issuer}</p>
                <a
                  href={c.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex min-h-11 w-fit items-center gap-1 text-xs font-semibold text-accent-text hover:underline"
                >
                  Show credential ↗
                </a>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className={sec + " text-center"}>
          <p className="text-xs font-medium uppercase tracking-[0.1em] text-muted">Contact</p>
          <ContactForm />
          <ul className="mt-8 flex justify-center gap-6 text-muted">
            {links.map(({ name, url, Icon }) => <li key={name}><a href={url} target="_blank" rel="noreferrer" aria-label={name} title={name} className="hover:text-white"><Icon aria-hidden="true" size={24} /></a></li>)}
          </ul>
        </section>
      </main>

      <footer className="border-t border-line/50 py-6 text-center text-sm text-muted">© 2026 Sahil Kumar</footer>
      <ChatWidget />
    </>
  );
}
