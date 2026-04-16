import { getStore } from "@netlify/blobs";

export default async (req) => {
  const store = getStore("nutmeter");
  const KEY = "data";

  try {
    if (req.method === "GET") {
      const raw = await store.get(KEY);
      const data = raw ? JSON.parse(raw) : { users: {} };
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }

    if (req.method === "POST") {
      const body = await req.json();
      if (!body || typeof body !== "object" || !body.users) {
        return new Response(JSON.stringify({ error: "Invalid payload" }), { status: 400 });
      }
      await store.set(KEY, JSON.stringify(body));
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }

    return new Response("Method not allowed", { status: 405 });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
};

export const config = {
  path: "/api/nuts"
};
