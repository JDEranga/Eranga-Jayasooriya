export const dynamic = 'force-static';

export async function GET() {
  const xmlContent = `<?xml version="1.0"?>
<users>
  <user>AB957BE23349A9AD0FC7E11D5144D08F</user>
</users>`;

  return new Response(xmlContent, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
