import fs from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "data", "db.json");

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  bodyHtml: string;
  category: string;
  publishedAt: string;
  updatedAt: string;
  image?: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company?: string;
  content: string;
  avatar?: string;
  createdAt: string;
};

export type Message = {
  id: string;
  name: string;
  email: string;
  subject: string;
  body: string;
  createdAt: string;
};

type DbSchema = {
  blogs: BlogPost[];
  testimonials: Testimonial[];
  messages: Message[];
};

function ensureDb() {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify({ blogs: [], testimonials: [], messages: [] }, null, 2));
  }
}

function readDb(): DbSchema {
  try {
    ensureDb();
    const raw = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading database file at", DB_PATH, err);
    return { blogs: [], testimonials: [], messages: [] };
  }
}

function writeDb(data: DbSchema) {
  ensureDb();
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// Blogs
export const blogStore = {
  list: () => readDb().blogs,
  get: (slug: string) => readDb().blogs.find((b) => b.slug === slug),
  create: (blog: Omit<BlogPost, "id" | "createdAt" | "updatedAt">) => {
    const db = readDb();
    const now = new Date().toISOString();
    const newBlog: BlogPost = {
      ...blog,
      id: crypto.randomUUID(),
      publishedAt: now,
      updatedAt: now,
    };
    db.blogs.unshift(newBlog);
    writeDb(db);
    return newBlog;
  },
  update: (id: string, updates: Partial<BlogPost>) => {
    const db = readDb();
    const idx = db.blogs.findIndex((b) => b.id === id);
    if (idx >= 0) {
      db.blogs[idx] = { ...db.blogs[idx], ...updates, updatedAt: new Date().toISOString() };
      writeDb(db);
      return db.blogs[idx];
    }
    return null;
  },
  delete: (id: string) => {
    const db = readDb();
    db.blogs = db.blogs.filter((b) => b.id !== id);
    writeDb(db);
  },
};

// Testimonials
export const testimonialStore = {
  list: () => readDb().testimonials,
  create: (testimonial: Omit<Testimonial, "id" | "createdAt">) => {
    const db = readDb();
    const newTestimonial: Testimonial = {
      ...testimonial,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    db.testimonials.unshift(newTestimonial);
    writeDb(db);
    return newTestimonial;
  },
  delete: (id: string) => {
    const db = readDb();
    db.testimonials = db.testimonials.filter((t) => t.id !== id);
    writeDb(db);
  },
};

// Messages
export const messageStore = {
  list: () => readDb().messages,
  create: (message: Omit<Message, "id" | "createdAt">) => {
    const db = readDb();
    const newMessage: Message = {
      ...message,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    db.messages.unshift(newMessage);
    writeDb(db);
    return newMessage;
  },
  delete: (id: string) => {
    const db = readDb();
    db.messages = db.messages.filter((m) => m.id !== id);
    writeDb(db);
  },
};
