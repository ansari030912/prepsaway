export async function GET(request) {
  const clientIp = request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for') || request.ip;
  
  return new Response(JSON.stringify({ ip: clientIp }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
