import { useEffect, useState } from 'react';

export function AuthIllustration() {
  const [activeStep, setActiveStep] = useState(0);

  // Automatically advance steps for progress checklist on phone mockup
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev < 5 ? prev + 1 : 0));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const steps = [
    { label: 'Initializing repository', done: true },
    { label: 'Creating Kanban columns', done: true },
    { label: 'Inviting team members', done: true },
    { label: 'Configuring workflows', done: false },
    { label: 'Connecting WebSockets', done: false },
    { label: 'Finalising workspace', done: false },
  ];

  return (
    <div className="relative flex h-[580px] w-[350px] items-center justify-center select-none animate-[slide-up_0.8s_cubic-bezier(0.16,1,0.3,1)]">
      {/* Background Glow */}
      <div className="absolute inset-0 scale-95 rounded-full bg-brand-orange/10 dark:bg-brand-orange/25 blur-[100px] transition-colors duration-300" />
      <div className="absolute -inset-10 scale-95 rounded-full bg-brand-blue/15 dark:bg-brand-blue/30 blur-[120px] transition-colors duration-300" />

      {/* Floating Kanban Preview Card 1 */}
      <div className="absolute -left-12 top-20 z-30 flex w-44 animate-[pulse_6s_infinite_ease-in-out] items-start gap-2.5 rounded-2xl border border-slate-200/60 bg-white/70 p-3.5 backdrop-blur-xl shadow-lg dark:border-white/10 dark:bg-slate-950/60 dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] transition-all duration-300 hover:scale-105">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-blue text-xs font-bold text-white shadow-sm">
          TS
        </div>
        <div className="flex-1 space-y-1">
          <div className="text-[10px] font-bold text-brand-orange tracking-wider uppercase">Sprints</div>
          <div className="text-[11px] font-black text-slate-800 dark:text-white leading-tight">Design Auth Flow</div>
          <div className="flex items-center gap-1.5 pt-0.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
            <span className="text-[9px] text-slate-500 dark:text-white/50">In Progress</span>
          </div>
        </div>
      </div>

      {/* Floating Team Avatars Bubble */}
      <div className="absolute -right-8 top-32 z-30 flex items-center gap-2 rounded-full border border-slate-200/60 bg-white/75 px-3 py-1.5 backdrop-blur-xl shadow-lg dark:border-white/10 dark:bg-slate-950/65 dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] transition-all duration-300 hover:scale-105">
        <div className="flex -space-x-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-[9px] font-bold text-white border border-white dark:border-slate-950">
            JD
          </div>
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-[9px] font-bold text-white border border-white dark:border-slate-950">
            AM
          </div>
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-500 text-[9px] font-bold text-white border border-white dark:border-slate-950">
            +4
          </div>
        </div>
        <span className="text-[10px] font-extrabold text-slate-700 dark:text-white/90">Workspace</span>
      </div>

      {/* Floating Metrics Card */}
      <div className="absolute -bottom-4 -left-6 z-30 w-40 rounded-2xl border border-slate-200/60 bg-white/70 p-3.5 backdrop-blur-xl shadow-lg dark:border-white/10 dark:bg-slate-950/60 dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] transition-all duration-300 hover:scale-105">
        <div className="text-[10px] font-bold text-slate-500 dark:text-white/50 tracking-wider uppercase">Burndown</div>
        <div className="flex items-baseline gap-1 pt-0.5">
          <span className="text-xl font-black text-slate-800 dark:text-white">84%</span>
          <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-extrabold">+12%</span>
        </div>
        <div className="mt-2 h-1.5 w-full rounded-full bg-slate-200/70 dark:bg-white/10 overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-brand-blue to-brand-orange" style={{ width: '84%' }} />
        </div>
      </div>

      {/* Phone Mockup Frame */}
      <div className="relative z-20 h-[520px] w-[260px] rounded-[3rem] border-[8px] border-slate-200 bg-slate-200 dark:border-slate-900 dark:bg-slate-900 shadow-2xl transition-all duration-500 hover:rotate-1 hover:scale-[1.02]">
        {/* Notch / Dynamic Island */}
        <div className="absolute top-2.5 left-1/2 z-30 h-4.5 w-20 -translate-x-1/2 rounded-full bg-slate-200 dark:bg-slate-900" />

        {/* Screen Content Wrapper */}
        <div className="relative h-full w-full overflow-hidden rounded-[2.3rem] bg-[#f8fafc] dark:bg-[#070b15] p-4 text-slate-700 dark:text-slate-300 flex flex-col justify-between transition-colors duration-300">
          {/* Status Bar */}
          <div className="flex justify-between items-center text-[9px] font-bold text-slate-400 dark:text-slate-500 px-1 pt-1">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <svg className="h-2.5 w-2.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 15c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
              </svg>
              <svg className="h-2.5 w-2.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
              </svg>
            </div>
          </div>

          {/* Screen Content Body */}
          <div className="flex-1 flex flex-col justify-center pt-4 px-1 text-center">
            {/* Logo placeholder */}
            <div className="mx-auto mb-3 flex h-10 w-20 items-center justify-center rounded-xl bg-white/5 border border-white/5 p-1.5 shadow-md">
              <img src="/pm-logo.svg" alt="PM Logo" className="h-full w-full object-contain brightness-0 invert" />
            </div>

            <div className="text-[10px] font-extrabold tracking-wider text-brand-orange uppercase">Initializing Sprints</div>
            <h3 className="mt-1 text-sm font-black text-slate-800 dark:text-white leading-tight">Setting up Workspace</h3>
            <p className="mt-1 text-[9px] text-slate-500 dark:text-slate-400 max-w-[180px] mx-auto leading-normal">
              Preparing project board channels and WebSockets configurations.
            </p>

            {/* Checklist */}
            <div className="mt-5 space-y-2 text-left bg-white border border-slate-100 dark:bg-slate-950/80 rounded-xl p-3 dark:border-white/5 transition-colors duration-300">
              {steps.map((step, idx) => {
                const isCurrent = idx === activeStep;
                const isDone = idx < activeStep;

                return (
                  <div key={idx} className="flex items-center gap-2 transition-all duration-300">
                    {isDone ? (
                      <div className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 border border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30 transition-colors">
                        <svg className="h-1.5 w-1.5 stroke-current stroke-[3]" fill="none" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    ) : isCurrent ? (
                      <div className="relative flex h-3.5 w-3.5 items-center justify-center">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-orange/30 opacity-75" />
                        <span className="relative h-2 w-2 rounded-full bg-brand-orange" />
                      </div>
                    ) : (
                      <div className="h-3.5 w-3.5 rounded-full border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900 transition-colors" />
                    )}
                    <span
                      className={`text-[9px] font-semibold transition-all duration-300 ${
                        isDone
                          ? 'text-slate-400 line-through decoration-slate-300 dark:text-slate-500 dark:decoration-slate-600'
                          : isCurrent
                          ? 'text-slate-800 dark:text-white font-bold'
                          : 'text-slate-400 dark:text-slate-500'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer inside screen */}
          <div className="pt-2 pb-1 text-center">
            <div className="flex items-center justify-center gap-1 text-[8px] font-medium text-slate-400 dark:text-slate-500">
              <svg className="h-2.5 w-2.5 animate-spin text-brand-orange" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>This may take a few seconds</span>
            </div>
            <button
              type="button"
              className="mt-2.5 w-full rounded-lg bg-slate-100 border border-slate-200/50 py-2 text-[9px] font-bold text-slate-600 hover:bg-slate-200 dark:bg-white/5 dark:border-white/5 dark:text-slate-300 dark:hover:bg-white/10 active:scale-95 transition-all"
            >
              Continue Without Waiting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
