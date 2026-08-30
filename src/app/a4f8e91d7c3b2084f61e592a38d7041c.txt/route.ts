import { NextResponse } from 'next/server';

export async function GET() {
  const key = 'a4f8e91d7c3b2084f61e592a38d7041c';
  return new NextResponse(key, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}