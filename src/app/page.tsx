'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Locale, siteCopy } from './content';

const ISOLOGO_SRC = '/brand/isologo.png';

type FormState = 'idle' | 'sending' | 'success' | 'error';

export default function Home() {
  const [locale, setLocale] = useState<Locale>('en');
  const [formState, setFormState] = useState<FormState>('idle');
  const [selectedReviewIndex, setSelectedReviewIndex] = useState<number | null>(null);
  const copy = siteCopy[locale];
  const selectedReview =
    selectedReviewIndex === null ? null : copy.reviews.items[selectedReviewIndex];

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    if (selectedReviewIndex === null) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setSelectedReviewIndex(null);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedReviewIndex]);

  async function handleContactSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormState('sending');

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      locale,
    };

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    setFormState(response.ok ? 'success' : 'error');

    if (response.ok) {
      event.currentTarget.reset();
    }
  }

  return (
    <main>
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="#top" className="flex items-center gap-3" aria-label="Zinns home">
            <Image src={ISOLOGO_SRC} alt="" width={36} height={36} priority className="h-9 w-9" />
            <span className="text-sm font-semibold text-primary">Zinns</span>
          </a>
          <nav className="hidden items-center gap-6 text-sm text-secondary md:flex">
            <a href="#work">{copy.nav.work}</a>
            <a href="#education">{copy.nav.education}</a>
            <a href="#company">{copy.nav.company}</a>
            <a href="#contact">{copy.nav.contact}</a>
          </nav>
          <div className="flex items-center gap-2" aria-label={copy.nav.language}>
            {(['en', 'es'] as const).map(language => (
              <button
                key={language}
                type="button"
                onClick={() => setLocale(language)}
                className={`h-9 border px-3 text-xs font-semibold uppercase transition ${
                  locale === language
                    ? 'border-primary bg-primary text-white'
                    : 'border-border bg-white text-secondary hover:border-primary hover:text-primary'
                }`}
              >
                {language}
              </button>
            ))}
          </div>
        </div>
      </header>

      <section id="top" className="relative overflow-hidden bg-soft">
        <div className="brand-grid absolute inset-0" aria-hidden="true" />
        <div className="mx-auto grid min-h-[calc(100vh-68px)] max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_0.7fr]">
          <div className="relative z-10 max-w-3xl">
            <p className="mb-6 text-xs font-semibold uppercase text-accent">{copy.hero.eyebrow}</p>
            <h1 className="text-balance text-5xl font-semibold leading-[0.98] text-ink sm:text-6xl lg:text-7xl">
              {copy.hero.title}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-secondary">
              {copy.hero.description}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex h-12 items-center justify-center bg-primary px-5 text-sm font-semibold text-white transition hover:bg-ink"
              >
                {copy.hero.primaryCta}
              </a>
              <a
                href="#work"
                className="inline-flex h-12 items-center justify-center border border-strong bg-white px-5 text-sm font-semibold text-primary transition hover:border-primary"
              >
                {copy.hero.secondaryCta}
              </a>
            </div>
            <p className="mt-6 border-l-2 border-accent pl-4 text-sm leading-6 text-muted">
              {copy.hero.note}
            </p>
          </div>
          <aside className="relative z-10 border border-border bg-white p-6 shadow-sm">
            <Image
              src={ISOLOGO_SRC}
              alt="Zinns isologo"
              width={426}
              height={426}
              priority
              className="mx-auto h-48 w-48 object-contain sm:h-64 sm:w-64"
            />
            <div className="mt-8 grid gap-3">
              {copy.hero.metrics.map(metric => (
                <div
                  key={metric.value}
                  className="flex items-center gap-4 border-t border-border pt-3"
                >
                  <span className="font-mono text-lg text-accent">{metric.value}</span>
                  <span className="text-sm text-secondary">{metric.label}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <Section id="work" eyebrow={copy.intro.title} title={copy.intro.description}>
        <div className="grid gap-4 md:grid-cols-3">
          {copy.intro.items.map(item => (
            <article key={item.title} className="border border-border bg-white p-5">
              <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-secondary">{item.description}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow={copy.projects.eyebrow}
        title={copy.projects.title}
        description={copy.projects.description}
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {copy.projects.items.map(project => (
            <article key={project.title} className="border border-border bg-white p-5">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-semibold uppercase text-accent">
                  {project.status}
                </span>
              </div>
              <h3 className="mt-5 text-xl font-semibold text-ink">{project.title}</h3>
              <p className="mt-3 text-sm leading-6 text-secondary">{project.summary}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="border border-border bg-soft px-2.5 py-1 text-xs text-secondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="education"
        eyebrow={copy.education.eyebrow}
        title={copy.education.title}
        description={copy.education.description}
        tone="soft"
      >
        <div className="grid gap-5 lg:grid-cols-2">
          {copy.education.items.map(plan => (
            <article key={plan.title} className="border border-border bg-white p-6">
              <p className="text-sm font-semibold text-accent">{plan.format}</p>
              <h3 className="mt-3 text-2xl font-semibold text-ink">{plan.title}</h3>
              <p className="mt-3 leading-7 text-secondary">{plan.outcome}</p>
              <div className="mt-6 grid gap-2 sm:grid-cols-2">
                {plan.focus.map(item => (
                  <span
                    key={item}
                    className="border-l-2 border-secondary bg-soft px-3 py-2 text-sm text-secondary"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow={copy.reviews.eyebrow}
        title={copy.reviews.title}
        description={copy.reviews.description}
      >
        <div className="grid items-stretch gap-4 lg:grid-cols-3">
          {copy.reviews.items.map((review, index) => (
            <button
              key={`${review.author}-${review.context}`}
              type="button"
              onClick={() => setSelectedReviewIndex(index)}
              className="group flex min-h-80 flex-col border border-border bg-white p-6 text-left transition hover:-translate-y-1 hover:border-primary hover:shadow-sm focus:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-cyan"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft font-mono text-lg text-accent">
                {review.author.slice(0, 1)}
              </span>
              <strong className="mt-5 min-h-24 text-2xl font-semibold leading-tight text-ink">
                {review.summary}
              </strong>
              <span className="mt-5 text-sm leading-6 text-secondary">{review.context}</span>
              <span className="mt-auto pt-6 text-xs font-semibold uppercase text-accent">
                {review.author}
              </span>
              <span className="mt-4 inline-flex w-fit border border-accent/30 bg-white px-3 py-1.5 text-xs font-semibold text-accent transition group-hover:bg-accent group-hover:text-white">
                {review.expandLabel}
              </span>
            </button>
          ))}
        </div>
      </Section>

      {selectedReview && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-ink/70 px-5 py-8 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="review-dialog-title"
          onClick={() => setSelectedReviewIndex(null)}
        >
          <figure
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto border border-border bg-white p-6 shadow-xl sm:p-8"
            onClick={event => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedReviewIndex(null)}
              className="absolute right-4 top-4 border border-border bg-soft px-3 py-1.5 text-xs font-semibold uppercase text-secondary transition hover:border-primary hover:text-primary"
            >
              {copy.reviews.closeLabel}
            </button>
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft font-mono text-lg text-accent">
              {selectedReview.author.slice(0, 1)}
            </span>
            <figcaption className="mt-5 pr-20">
              <h3 id="review-dialog-title" className="text-2xl font-semibold text-ink">
                {selectedReview.author}
              </h3>
              <p className="mt-2 text-sm leading-6 text-secondary">{selectedReview.context}</p>
            </figcaption>
            <blockquote className="mt-8 text-lg leading-8 text-ink">
              <span aria-hidden="true">&ldquo;</span>
              {selectedReview.quote}
              <span aria-hidden="true">&rdquo;</span>
            </blockquote>
            <p className="mt-6 border-t border-border pt-4 text-xs leading-5 text-muted">
              {selectedReview.source}
            </p>
          </figure>
        </div>
      )}

      <Section
        id="company"
        eyebrow={copy.company.eyebrow}
        title={copy.company.title}
        description={copy.company.description}
        tone="dark"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {copy.company.timeline.map(item => (
            <article key={item.year} className="border border-white/15 p-5">
              <p className="font-mono text-sm text-cyan">{item.year}</p>
              <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/70">{item.description}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow={copy.team.eyebrow}
        title={copy.team.title}
        description={copy.team.description}
      >
        <div className="grid gap-4 md:grid-cols-2">
          {copy.team.items.map(person => (
            <article key={person.name} className="border border-border bg-white p-6">
              <CompanyAvatar initials={person.initials} variant={person.avatar} />
              <h3 className="mt-4 text-xl font-semibold text-ink">{person.name}</h3>
              <p className="mt-1 text-sm font-semibold text-accent">{person.role}</p>
              <p className="mt-3 text-sm leading-6 text-secondary">{person.note}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow={copy.stack.eyebrow}
        title={copy.stack.title}
        description={copy.stack.description}
        tone="soft"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {copy.stack.groups.map(group => (
            <article key={group.title} className="border border-border bg-white p-5">
              <h3 className="text-lg font-semibold text-ink">{group.title}</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.items.map(item => (
                  <span key={item} className="bg-primary px-3 py-1.5 text-sm text-white">
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow={copy.next.eyebrow}
        title={copy.next.title}
        description={copy.next.description}
      >
        <div className="grid gap-4 md:grid-cols-2">
          {copy.next.items.map(item => (
            <article key={item.title} className="border-l-4 border-accent bg-soft p-5">
              <h3 className="text-xl font-semibold text-ink">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-secondary">{item.description}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="contact"
        eyebrow={copy.contact.eyebrow}
        title={copy.contact.title}
        description={copy.contact.description}
        tone="soft"
      >
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1fr]">
          <div className="border border-border bg-white p-6">
            <p className="text-sm font-semibold uppercase text-accent">{copy.contact.direct}</p>
            <a
              className="mt-4 block text-3xl font-semibold text-primary"
              href={`mailto:${copy.common.email}`}
            >
              {copy.common.email}
            </a>
          </div>
          <form
            className="grid gap-4 border border-border bg-white p-6"
            onSubmit={handleContactSubmit}
          >
            <label className="grid gap-2 text-sm font-semibold text-ink">
              {copy.contact.name}
              <input
                required
                name="name"
                minLength={2}
                className="h-12 border border-border px-3 text-base font-normal text-ink outline-none focus:border-primary"
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-ink">
              {copy.contact.email}
              <input
                required
                name="email"
                type="email"
                className="h-12 border border-border px-3 text-base font-normal text-ink outline-none focus:border-primary"
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-ink">
              {copy.contact.message}
              <textarea
                required
                name="message"
                minLength={10}
                rows={5}
                className="resize-none border border-border p-3 text-base font-normal text-ink outline-none focus:border-primary"
              />
            </label>
            <button
              type="submit"
              disabled={formState === 'sending'}
              className="h-12 bg-primary px-5 text-sm font-semibold text-white transition hover:bg-ink disabled:cursor-wait disabled:opacity-70"
            >
              {formState === 'sending' ? copy.contact.sending : copy.contact.submit}
            </button>
            {formState === 'success' && (
              <p className="text-sm font-semibold text-success">{copy.contact.success}</p>
            )}
            {formState === 'error' && (
              <p className="text-sm font-semibold text-error">{copy.contact.error}</p>
            )}
          </form>
        </div>
      </Section>

      <footer className="border-t border-border bg-ink px-5 py-8 text-white sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Image src={ISOLOGO_SRC} alt="" width={32} height={32} className="h-8 w-8" />
            <span className="font-semibold">Zinns</span>
          </div>
          <p className="text-sm text-white/70">{copy.footer.tagline}</p>
        </div>
      </footer>
    </main>
  );
}

function Section({
  id,
  eyebrow,
  title,
  description,
  tone = 'default',
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
  tone?: 'default' | 'soft' | 'dark';
  children: React.ReactNode;
}) {
  const isDark = tone === 'dark';

  return (
    <section
      id={id}
      className={`px-5 py-16 sm:px-8 lg:py-24 ${
        tone === 'soft' ? 'bg-soft' : isDark ? 'bg-ink' : 'bg-background'
      }`}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          <p className={`text-xs font-semibold uppercase ${isDark ? 'text-cyan' : 'text-accent'}`}>
            {eyebrow}
          </p>
          <h2
            className={`mt-3 text-3xl font-semibold sm:text-4xl ${isDark ? 'text-white' : 'text-ink'}`}
          >
            {title}
          </h2>
          {description && (
            <p className={`mt-4 leading-7 ${isDark ? 'text-white/70' : 'text-secondary'}`}>
              {description}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

function CompanyAvatar({ initials, variant }: { initials: string; variant: 'signal' | 'orbit' }) {
  const accentClass = variant === 'signal' ? 'bg-cyan' : 'bg-accent';
  const ringClass = variant === 'signal' ? 'border-cyan/70' : 'border-accent/70';

  return (
    <div className="relative h-20 w-20 overflow-hidden border border-border bg-ink text-white">
      <div className="brand-grid absolute inset-0 opacity-25" aria-hidden="true" />
      <div
        className={`absolute -right-4 -top-4 h-14 w-14 rounded-full ${accentClass} opacity-80 blur-sm`}
        aria-hidden="true"
      />
      <div className={`absolute bottom-3 left-3 h-9 w-9 rounded-full border ${ringClass}`} />
      <div className="absolute bottom-5 left-7 h-6 w-6 border border-white/60" aria-hidden="true" />
      <div className="relative flex h-full w-full items-center justify-center font-mono text-lg font-semibold tracking-wider">
        {initials}
      </div>
    </div>
  );
}
