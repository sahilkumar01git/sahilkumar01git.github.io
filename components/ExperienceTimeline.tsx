"use client";
import { useState } from "react";

type Job = { title: string; company: string; dates?: string; description?: string };
type Slot = { company: string; roles: Job[] };

function groupByCompany(jobs: Job[]): Slot[] {
  const slots: Slot[] = [];
  for (const job of jobs) {
    const last = slots[slots.length - 1];
    if (last && last.company === job.company) last.roles.push(job);
    else slots.push({ company: job.company, roles: [job] });
  }
  return slots;
}

export default function ExperienceTimeline({ jobs }: { jobs: Job[] }) {
  const slots = groupByCompany(jobs);
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="mt-14">
      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute left-[7px] top-0 bottom-0 w-px bg-line md:left-0 md:right-0 md:top-[7px] md:h-px md:w-auto md:bottom-auto"
        />
        <ol className="relative flex flex-col gap-10 md:flex-row md:gap-10">
          {slots.map((slot, i) => {
            const isMulti = slot.roles.length > 1;
            const headline = slot.roles[0];
            const isActive = active === i;
            const dimmed = active !== null && !isActive;

            return (
              <li key={slot.company + i} className={`relative md:flex-1 ${isMulti ? "md:flex-[1.4]" : ""}`}>
                <button
                  type="button"
                  className={`flex w-full items-start gap-4 text-left transition-opacity duration-[250ms] ease-out md:flex-col md:items-stretch md:gap-0 ${dimmed ? "opacity-50" : "opacity-100"}`}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive((a) => (a === i ? null : a))}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive((a) => (a === i ? null : a))}
                  onClick={() => setActive((a) => (a === i ? null : i))}
                  aria-expanded={isActive}
                >
                  <span
                    aria-hidden="true"
                    className={`relative z-10 mt-1 shrink-0 rounded-full bg-bg transition-colors duration-[250ms] ease-out md:mt-0 ${
                      isMulti ? "h-4 w-4 border-2" : "h-3 w-3 border"
                    } ${isActive ? "border-white bg-white" : "border-muted/70"}`}
                  />
                  <span className="md:mt-6">
                    <span className="block text-xs text-muted">{headline.dates}</span>
                    <span className="mt-2 block font-semibold">{headline.title}</span>
                    {isMulti && !isActive && (
                      <span className="mt-2 block text-[10px] uppercase tracking-[0.1em] text-muted">
                        {slot.roles.length} roles — hover to expand
                      </span>
                    )}
                    <span
                      className={`grid transition-all duration-300 ease-out ${
                        isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <span className="block overflow-hidden">
                        <span className="block text-muted">{slot.company}</span>
                        {isMulti ? (
                          <span className="mt-3 block space-y-2">
                            {slot.roles.map((role) => (
                              <span key={role.title} className="block">
                                <span className="block text-sm font-medium">{role.title}</span>
                                {role.dates && <span className="block text-xs text-muted">{role.dates}</span>}
                              </span>
                            ))}
                          </span>
                        ) : (
                          headline.description && (
                            <span className="mt-3 block text-sm text-muted">{headline.description}</span>
                          )
                        )}
                      </span>
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
      <p className="mt-8 hidden text-right text-[10px] uppercase tracking-[0.1em] text-muted md:block">
        Hover to reveal details
      </p>
      <p className="mt-6 text-[10px] uppercase tracking-[0.1em] text-muted md:hidden">Tap to reveal details</p>
    </div>
  );
}
