import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { Hero } from '@/features/home/Hero';
import { PopularServices } from '@/features/home/PopularServices';
import { TeamSection } from '@/features/home/TeamSection';
import { Advantages } from '@/features/home/Advantages';
import { FirstVisit } from '@/features/home/FirstVisit';
import { Gallery } from '@/features/home/Gallery';
import { HomeFaq } from '@/features/home/HomeFaq';
import { ContactsBlock } from '@/features/home/ContactsBlock';
import { FinalCta } from '@/features/home/FinalCta';

export default function HomePage() {
  useDocumentTitle();
  return (
    <>
      <Hero />
      <PopularServices />
      <TeamSection />
      <Advantages />
      <FirstVisit />
      <Gallery />
      <HomeFaq />
      <ContactsBlock />
      <FinalCta />
    </>
  );
}
