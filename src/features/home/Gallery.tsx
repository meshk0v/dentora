import { useState } from 'react';
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import { gallery } from '@/data/gallery';
import { cn } from '@/lib/cn';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { SmartImage } from '@/components/ui/SmartImage';
import { Modal } from '@/components/ui/Modal';

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  const go = (dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + gallery.length) % gallery.length));

  return (
    <section className="py-20 lg:py-28" aria-labelledby="gallery-title">
      <div className="container">
        <SectionHeading eyebrow="Интерьер" title={<span id="gallery-title">Пространство, в котором <span className="accent">спокойно</span></span>} text="Фотографии стоковые и служат примером — клиника заменит их своими." />
        <div className="grid grid-flow-dense auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[220px] sm:gap-4 lg:grid-cols-4">
          {gallery.map((g, i) => (
            <Reveal key={g.src} delay={i * 60} className={cn(g.span === 'wide' && 'col-span-2', g.span === 'tall' && 'row-span-2')}>
              <button type="button" onClick={() => setIndex(i)} className="group relative block h-full w-full overflow-hidden rounded-3xl" aria-label={`Открыть фото: ${g.alt}`}>
                <SmartImage name={g.src} alt={g.alt} wrapperClassName="h-full w-full" className="transition duration-700 group-hover:scale-105" />
                <span className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-cream-50/90 text-ink-900 opacity-0 backdrop-blur transition group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden>
                  <Expand className="h-4 w-4" />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <Modal open={index !== null} onClose={() => setIndex(null)} title={index !== null ? gallery[index].alt : 'Фото'} hideTitle size="xl" bodyClassName="p-0">
        {index !== null && (
          <div
            className="relative bg-ink-950"
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight') go(1);
              if (e.key === 'ArrowLeft') go(-1);
            }}
          >
            <SmartImage key={gallery[index].src} name={gallery[index].src} alt={gallery[index].alt} loading="eager" wrapperClassName="aspect-[7/5] bg-ink-900" />
            <div className="flex items-center justify-between gap-4 bg-cream-50 px-6 py-4">
              <p className="text-sm text-ink-600">{gallery[index].alt}</p>
              <div className="flex shrink-0 items-center gap-2">
                <span className="mr-2 text-xs tabular-nums text-ink-400">{index + 1} / {gallery.length}</span>
                <button type="button" onClick={() => go(-1)} className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-300 hover:bg-cream-200" aria-label="Предыдущее фото" data-autofocus>
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => go(1)} className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-300 hover:bg-cream-200" aria-label="Следующее фото">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
