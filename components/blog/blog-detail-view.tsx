import Link from "next/link";
import { BackLink } from "@/components/back-link";
import { AppPhoto } from "@/components/landing/app-photo";
import { getBlogDetailMedia } from "@/lib/figma-blog-detail-assets";
import { blogPosts, profile } from "@/lib/site-data";

type BlogDetailViewProps = {
  post: {
    slug: string;
    title: string;
    category: string;
    excerpt: string;
    image?: string;
    date?: string;
    publishedAt?: string;
    readTime?: string;
    bodyHtml?: string;
    content?: string[];
    closing?: string[];
    layout?: {
      issueNo?: string;
    };
  };
  postIndex?: number;
};

function splitTitle(title: string): [string, string] {
  const words = title.split(" ");
  if (words.length <= 1) return [title, ""];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}

export function BlogDetailView({ post, postIndex = 0 }: BlogDetailViewProps) {
  const media = getBlogDetailMedia(postIndex);
  
  const idx = blogPosts.findIndex((p) => p.slug === post.slug);
  const next = blogPosts[idx >= 0 ? (idx + 1) % blogPosts.length : 0]!;
  const [nextA, nextB] = splitTitle(next.title);
  const author = profile.name;
  
  // Standardizing labels and values for both static and CMS posts
  const issueLabel = post.layout?.issueNo ? ` / ISSUE NO. ${post.layout.issueNo}` : "";
  const eyebrow = `${post.category.toUpperCase()}${issueLabel}`;
  const dateStr = post.date || (post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : new Date().toLocaleDateString());
  const readTime = post.readTime || "5 min read";
  const closing = post.closing ?? [];

  return (
    <main className="blog-detail animate-enter">
      <div className="blog-detail__wrap">
        <BackLink href="/blog">Back to blog</BackLink>

        <header className="blog-detail__hero">
          <p className="blog-detail__eyebrow">{eyebrow}</p>
          <h1 className="blog-detail__title max-w-[800px]">
            {post.title}
          </h1>

          <div className="blog-detail__meta-row">
            <div className="blog-detail__meta-item">
              <span className="blog-detail__meta-label">Author</span>
              <span className="blog-detail__meta-value">{author}</span>
            </div>
            <div className="blog-detail__meta-item">
              <span className="blog-detail__meta-label">Reading time</span>
              <span className="blog-detail__meta-value">{readTime}</span>
            </div>
            <div className="blog-detail__meta-item">
              <span className="blog-detail__meta-label">Date</span>
              <span className="blog-detail__meta-value">{dateStr}</span>
            </div>
          </div>
        </header>
      </div>

      <div className="blog-detail__hero-image">
        <div className="blog-detail__hero-image-inner">
          <AppPhoto
            src={post.image || media.hero}
            alt=""
            className="aspect-[21/9] min-h-[14rem] w-full md:min-h-[18rem] lg:aspect-auto lg:min-h-[28rem]"
            imgClassName="absolute inset-0 h-full w-full max-w-none object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-black/10 mix-blend-multiply" aria-hidden />
        </div>
      </div>

      <div className="blog-detail__article">
        <div className="blog-detail__wrap">
          <div className="mx-auto max-w-3xl">
            {/* Standfirst / Summary */}
            <p className="blog-detail__standfirst mb-12 text-xl font-medium leading-relaxed text-(--fg-soft) md:text-2xl">
              {post.excerpt}
            </p>

            {/* Main Blog Content */}
            <div className="blog-detail__article-inner">
              {post.bodyHtml ? (
                <div
                  className="blog-detail__body-html prose prose-lg dark:prose-invert max-w-none text-(--muted)"
                  dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
                />
              ) : (
                <div className="blog-detail__intro space-y-6">
                  {(post.content || []).map((paragraph: string) => (
                    <p key={paragraph} className="text-lg leading-relaxed text-(--muted)">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}

              {/* Static closing paragraphs if they exist */}
              {closing.length > 0 && (
                <div className="blog-detail__closing mt-12 space-y-6 border-t border-(--line) pt-12">
                  {closing.map((paragraph: string) => (
                    <p key={paragraph} className="text-lg leading-relaxed text-(--muted)">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <section className="blog-detail__next" aria-labelledby="blog-next-label">
        <div className="blog-detail__wrap blog-detail__next-wrap">
          <p id="blog-next-label" className="blog-detail__next-label">
            Next article
          </p>
          <Link href={`/blog/${next.slug}`} className="blog-detail__next-link">
            <span className="blog-detail__next-title">
              <span className="block">{nextA}</span>
              {nextB ? <span className="block">{nextB}</span> : null}
            </span>
            <span className="blog-detail__next-cta">
              <span className="blog-detail__next-cta-text">Continue reading</span>
              <span className="blog-detail__next-cta-circle" aria-hidden>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-[15px]"
                >
                  <path d="M7 17 17 7" />
                  <path d="M8 7h9v9" />
                </svg>
              </span>
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
