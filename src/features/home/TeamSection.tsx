import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { doctors } from '@/data/doctors';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { SmartImage } from '@/components/ui/SmartImage';

export function TeamSection() {
  return (
    <section className="bg-cream-200/50 py-20 lg:py-28" aria-labelledby="team-title">
      <div className="container">
        <SectionHeading
          eyebrow="Команда"
          title={<span id="team-title">Специалисты, которые <span className="accent">объясняют</span>, а не торопят</span>}
          text="Познакомьтесь с врачами до визита и выберите специалиста по своему направлению."
          action={<ButtonLink to="/doctors" variant="outline">Все врачи <ArrowRight className="h-4 w-4" aria-hidden /></ButtonLink>}
        />
        <div className="scrollbar-none -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {doctors.slice(0, 4).map((d, i) => (
            <Reveal key={d.id} delay={i * 80} className="w-[75vw] shrink-0 snap-start sm:w-auto">
              <Link to={`/doctors?profile=${d.id}`} className="group block">
                <div className="relative overflow-hidden rounded-3xl">
                  <SmartImage name={d.photo} alt={`${d.name}, ${d.role}`} wrapperClassName="aspect-[3/4]" className="transition duration-700 group-hover:scale-105" />
                  <span className="absolute right-4 top-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-cream-50 text-ink-900 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100" aria-hidden>
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-ink-900">{d.name}</h3>
                <p className="text-sm text-ink-400">{d.role}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
