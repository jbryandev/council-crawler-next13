import { crawl as okc } from '@/app/crawlers/okc/route';

export async function GET() {
  return okc();
}
