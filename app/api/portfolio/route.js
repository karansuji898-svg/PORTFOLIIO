import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET() {
  try {
    const jsonDirectory = path.join(process.cwd(), 'data');
    const fileContents = await fs.readFile(jsonDirectory + '/portfolioData.json', 'utf8');
    return NextResponse.json(JSON.parse(fileContents));
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load portfolio data' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const jsonDirectory = path.join(process.cwd(), 'data');
    await fs.writeFile(jsonDirectory + '/portfolioData.json', JSON.stringify(data, null, 2), 'utf8');
    return NextResponse.json({ success: true, message: 'Data updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update portfolio data' }, { status: 500 });
  }
}
