import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

interface FilmStill {
  title: string;
  year: string;
  movieUrl: string;
  imageUrl: string;
}

// Load the 4,145 Film-Grab stills database
let filmStills: FilmStill[] = [];
try {
  const dataPath = path.join(process.cwd(), "src", "data", "filmgrab_stills.json");
  if (fs.existsSync(dataPath)) {
    filmStills = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
    console.log(`[FilmGrab] Successfully loaded ${filmStills.length} unique movie stills.`);
  }
} catch (err) {
  console.error("[FilmGrab] Error loading filmgrab_stills.json:", err);
}

// Fallback if file failed to load
if (filmStills.length === 0) {
  filmStills = [
    {
      title: "The Lighthouse",
      year: "2019",
      movieUrl: "https://film-grab.com/2020/04/10/the-lighthouse/",
      imageUrl: "https://film-grab.com/wp-content/uploads/photo-gallery/The_Lighthouse_001.jpg"
    },
    {
      title: "1917",
      year: "2019",
      movieUrl: "https://film-grab.com/2020/09/01/1917/",
      imageUrl: "https://film-grab.com/wp-content/uploads/photo-gallery/1917_001.jpg"
    },
    {
      title: "Midsommar",
      year: "2019",
      movieUrl: "https://film-grab.com/2020/04/07/midsommar/",
      imageUrl: "https://film-grab.com/wp-content/uploads/photo-gallery/Midsommar_001.jpg"
    },
    {
      title: "Tenet",
      year: "2020",
      movieUrl: "https://film-grab.com/2021/02/26/tenet/",
      imageUrl: "https://film-grab.com/wp-content/uploads/photo-gallery/Tenet_010.jpg"
    }
  ];
}

// Keep history of last 100 served IDs to avoid repetition
const recentlyServed = new Set<string>();

// In-memory image buffer cache
const imageCache = new Map<string, { buffer: Buffer; contentType: string; timestamp: number }>();

// API 1: Get Random Still from 4,145+ Films
app.get("/api/filmgrab/random", (_req, res) => {
  res.setHeader("Cache-Control", "no-store, max-age=0");

  let candidate: FilmStill | null = null;
  // Try up to 20 times to pick a candidate that wasn't recently served
  for (let attempt = 0; attempt < 20; attempt++) {
    const pick = filmStills[Math.floor(Math.random() * filmStills.length)];
    if (!recentlyServed.has(pick.imageUrl)) {
      candidate = pick;
      break;
    }
  }

  if (!candidate) {
    candidate = filmStills[Math.floor(Math.random() * filmStills.length)];
  }

  // Update recent history ring buffer
  recentlyServed.add(candidate.imageUrl);
  if (recentlyServed.size > 200) {
    const firstItem = recentlyServed.values().next().value;
    if (firstItem) recentlyServed.delete(firstItem);
  }

  return res.json({
    success: true,
    title: candidate.title,
    year: candidate.year,
    movieUrl: candidate.movieUrl,
    imageUrl: `/api/filmgrab/image?url=${encodeURIComponent(candidate.imageUrl)}`,
    originalUrl: candidate.imageUrl,
    totalCatalogSize: filmStills.length
  });
});

// API 2: Image Proxy from Film-Grab CDN with Memory Caching
app.get("/api/filmgrab/image", async (req, res) => {
  const targetUrl = req.query.url as string;
  if (!targetUrl || !targetUrl.startsWith("https://film-grab.com/wp-content/uploads/")) {
    return res.status(400).send("Invalid target URL");
  }

  // Check cache first
  const cached = imageCache.get(targetUrl);
  if (cached && Date.now() - cached.timestamp < 3600 * 1000 * 24) {
    res.setHeader("Content-Type", cached.contentType);
    res.setHeader("Cache-Control", "public, max-age=86400");
    return res.send(cached.buffer);
  }

  try {
    const resp = await fetch(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      }
    });

    if (!resp.ok) {
      return res.redirect("/assets/filmgrab/the_lighthouse_1.jpg");
    }

    const arrayBuffer = await resp.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const contentType = resp.headers.get("content-type") || "image/jpeg";

    // Keep cache bounded
    if (imageCache.size > 100) {
      const firstKey = imageCache.keys().next().value;
      if (firstKey) imageCache.delete(firstKey);
    }
    imageCache.set(targetUrl, { buffer, contentType, timestamp: Date.now() });

    res.setHeader("Content-Type", contentType);
    res.setHeader("Cache-Control", "public, max-age=86400");
    return res.send(buffer);
  } catch (_err: any) {
    return res.redirect("/assets/filmgrab/the_lighthouse_1.jpg");
  }
});

async function start() {
  // Serve static public assets explicitly (including /admin and /admin/config.yml)
  const publicPath = path.join(process.cwd(), "public");
  app.use(express.static(publicPath));

  // Explicit route for Decap CMS admin
  app.get("/admin", (_req, res) => {
    res.sendFile(path.join(publicPath, "admin", "index.html"));
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

start();
