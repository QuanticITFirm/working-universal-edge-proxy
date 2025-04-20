export const config = {
  runtime: 'edge'
};

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const target = searchParams.get('url');

  if (!target) {
    return new Response("❌ Missing URL", { status: 400 });
  }

  try {
    const res = await fetch(target, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
      }
    });
    const html = await res.text();
    return new Response(html, {
      headers: {
        "Content-Type": "text/html"
      }
    });
  } catch (err) {
    return new Response("❌ Proxy error: " + err.message, { status: 500 });
  }
}
