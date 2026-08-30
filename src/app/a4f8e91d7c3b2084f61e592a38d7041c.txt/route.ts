import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const host = 'www.socialsecurityguidecalc.com';
    const key = 'a4f8e91d7c3b2084f61e592a38d7041c';
    const keyLocation = `https://${host}/${key}.txt`;

    // قائمة الروابط المراد إرسالها للحدث أو الفهرسة
    const urlsIndexNow = [
      `https://${host}/`,
      `https://${host}/blog`,
      `https://${host}/calculators/benefits-estimator`,
      `https://${host}/calculators/retirement-age`,
      `https://${host}/calculators/break-even`,
      `https://${host}/calculators/medicare-cost`,
    ];

    // تجميع بياتات الطلب حسب مواصفات IndexNow Protocol
    const payload = {
      host: host,
      key: key,
      keyLocation: keyLocation,
      urlList: urlsIndexNow,
    };

    // إرسال الطلب إلى محرك Bing (سيقوم Bing بمشاركته تلقائياً مع Yandex والمحركات المشاركة)
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok || response.status === 202) {
      return NextResponse.json({
        success: true,
        message: 'Successfully submitted URLs to IndexNow',
        submittedUrlsCount: urlsIndexNow.length,
      });
    }

    return NextResponse.json(
      { success: false, error: 'Failed to submit to IndexNow' },
      { status: response.status }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}