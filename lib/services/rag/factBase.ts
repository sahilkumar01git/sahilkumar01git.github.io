// The RAG service's knowledge base. Edit these chunks — the assistant only knows what is written here.
// TODO: add results/metrics only once you can explain how you measured them.
export type FactChunk = { id: string; keywords: string[]; text: string };

// Always-present grounding: identity + how to reach Sahil, regardless of what the query retrieves.
export const ALWAYS_INCLUDE = new Set(["identity", "contact"]);

// Roles overlap and run gap-free from Aug 2022 to today; computed here so the model
// never has to do date arithmetic itself (LLMs are unreliable at that, and don't know "today").
const EXPERIENCE_START = new Date(2022, 7, 1); // Aug 2022

function totalExperience(): string {
  const now = new Date();
  let months = (now.getFullYear() - EXPERIENCE_START.getFullYear()) * 12 + (now.getMonth() - EXPERIENCE_START.getMonth());
  if (now.getDate() < EXPERIENCE_START.getDate()) months -= 1;
  months = Math.max(months, 0);
  const years = Math.floor(months / 12);
  const remMonths = months % 12;
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} year${years === 1 ? "" : "s"}`);
  if (remMonths > 0) parts.push(`${remMonths} month${remMonths === 1 ? "" : "s"}`);
  return parts.length > 0 ? parts.join(" and ") : "under a month";
}

// Built fresh per call (not a static array) so the computed experience total stays correct as time passes.
export function getFactChunks(): FactChunk[] {
  return [
    {
      id: "identity",
      keywords: ["who", "sahil", "role", "title", "generative", "engineer", "about"],
      text: "Role: Generative AI Engineer focused on RAG, LLMOps, multi-agent systems and FastAPI backends. Career-switcher from L2 technical support and data analysis.",
    },
    {
      id: "experience",
      keywords: ["experience", "work", "career", "job", "company", "mahindra", "history", "background", "years", "freelance", "total", "long"],
      text: `Experience: Generative AI Engineer (freelance) since Mar 2024. Technical Process Associate, L2 outbound, at Tech Mahindra Jun 2023 to Dec 2024. Data Analyst (freelance) Aug 2022 to Oct 2023, using Python, Pandas and SQL. These roles overlap and form one continuous span, not three separate durations added together: total combined professional experience as of today is about ${totalExperience()}, counted from Aug 2022 to the current date.`,
    },
    {
      id: "education",
      keywords: ["education", "degree", "college", "university", "school", "com", "study", "studied", "cbse"],
      text: "Education: B.Com, Maharaja Agrasen Himalayan Garhwal University, Pauri, Uttarakhand. Senior Secondary (CBSE), Delhi Public School, Roorkee.",
    },
    {
      id: "skills",
      keywords: ["skill", "tech", "stack", "language", "tool", "framework", "python", "langchain", "langgraph", "crewai", "chromadb", "embeddings", "ragas", "deepeval", "fastapi", "docker", "streamlit", "groq", "pandas", "numpy", "sql"],
      text: "Skills: Python, LangChain, LangGraph, CrewAI, RAG, ChromaDB, embeddings (OpenAI, Sentence-Transformers), prompt engineering, RAGAS and DeepEval for evaluation, FastAPI, Docker, Streamlit, Groq, Pandas, NumPy, SQL.",
    },
    {
      id: "project-multiagent",
      keywords: ["project", "multi-agent", "multiagent", "agent", "crewai", "designer", "architecture", "planner"],
      text: "Project - AI Multi-Agent System Designer: role-based agents (product manager, architect, backend developer, planner) turn a product idea into architecture, backend design and a timeline. Python, CrewAI, LangGraph, Streamlit, OpenRouter. Has a live demo.",
    },
    {
      id: "project-voice",
      keywords: ["project", "voice", "interview", "coach", "speech", "mock"],
      text: "Project - Voice AI Interview Coach: voice and text mock interviews with conversation memory and a feedback report. Python, Streamlit, Groq, speech recognition. Has a live demo.",
    },
    {
      id: "project-multidoc",
      keywords: ["project", "document", "pdf", "rag", "chromadb", "ingestion", "chunking"],
      text: "Project - Multi-Document AI Assistant: RAG over multiple PDFs with ingestion, chunking, embeddings and ChromaDB search. Python, Streamlit, LangChain, ChromaDB, Groq. Has a live demo.",
    },
    {
      id: "project-support",
      keywords: ["project", "chatbot", "support", "fastapi", "api", "rest"],
      text: "Project - AI Support Chatbot: RAG support chatbot behind a FastAPI REST API. Python, FastAPI, ChromaDB, Sentence-Transformers, Groq.",
    },
    {
      id: "contact",
      keywords: ["contact", "email", "reach", "linkedin", "github", "hire", "connect", "website"],
      text: "Contact: sahil.kumar.tech01@gmail.com, LinkedIn https://www.linkedin.com/in/sahil-kumar-321a2839b/, GitHub https://github.com/sahilkumar01git",
    },
  ];
}
