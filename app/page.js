import Hero from '@/components/Hero';
import Introduction from '@/components/Introduction';
import Contents from '@/components/Contents';
import Education from '@/components/Education';
import Gallery from '@/components/Gallery';
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
      <Hero data={data.hero} />
      <Contents data={data.contents} />
      <Introduction data={data.introduction} />
      <Education data={data.education} />
      <Gallery data={data.contents} />
    </main>
  );
}
