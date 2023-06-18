export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');
  const response = await fetch(decodeURI(url!), {
    headers: {
      'Referer': 'mangadex.org'
    }
  });
  const data = await response.blob();

  return new Response(data, {
    status: 200,
    headers: {
      'Content-Type': data.type
    }
  })
}