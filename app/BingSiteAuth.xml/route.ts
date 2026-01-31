export async function GET() {
  const xmlContent = `<?xml version="1.0"?>
<users>
  <user>AB957BE23349A9AD0FC7E11D5144D08F</user>
</users>`;

  return new Response(xmlContent, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
