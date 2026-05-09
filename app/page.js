import Hero from '@/components/Hero';
import Introduction from '@/components/Introduction';
import Contents from '@/components/Contents';
import Education from '@/components/Education';
import Gallery from '@/components/Gallery';
import AnimatedSection from '@/components/AnimatedSection';
import path from 'path';
import { promises as fs } from 'fs';

// Helper function to get data (acting as our backend fetch)
async function getPortfolioData() {
  const jsonDirectory = path.join(process.cwd(), 'data');
  const fileContents = await fs.readFile(jsonDirectory + '/portfolioData.json', 'utf8');
  return JSON.parse(fileContents);
}

export default async function Home() {
  const data = await getPortfolioData();

  return (
    <main>
      <AnimatedSection>
        <Hero data={data.hero} />
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <Contents data={data.contents} />
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <Introduction data={data.introduction} />
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <Education data={data.education} />
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <Gallery data={data.contents} />
      </AnimatedSection>
    </main>
  );
}
