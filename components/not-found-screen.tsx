import Link from "next/link";

export type NotFoundAction = {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
};

type NotFoundScreenProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions: NotFoundAction[];
};

export function NotFoundScreen({ eyebrow, title, description, actions }: NotFoundScreenProps) {
  return (
    <main className="not-found-page">
      <div className="not-found-page__wrap">
        <section className="not-found-page__hero">
          <div className="not-found-page__copy">
            <p className="not-found-page__eyebrow">{eyebrow}</p>
            <h1 className="not-found-page__title">{title}</h1>
            <p className="not-found-page__lede">{description}</p>

            <div className="not-found-page__actions">
              {actions.map((action, index) => {
                const primary = action.variant === "primary" || (action.variant == null && index === 0);

                return (
                  <Link
                    key={`${action.href}-${action.label}`}
                    href={action.href}
                    className={primary ? "button--primary" : "button"}
                  >
                    {action.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <aside className="not-found-page__panel" aria-label="Page not found details">
            <p className="not-found-page__code" aria-hidden>
              404
            </p>

            <div className="not-found-page__meta">
              <div>
                <span className="not-found-page__meta-label">Status</span>
                <p className="not-found-page__meta-value">Page unavailable</p>
              </div>
              <div>
                <span className="not-found-page__meta-label">Best next step</span>
                <p className="not-found-page__meta-value">Use one of the links to continue browsing.</p>
              </div>
            </div>

            <p className="not-found-page__signoff">
              <span className="not-found-page__signoff-name">Takem Jim</span>
              <span className="not-found-page__signoff-role">Software engineer | web & mobile</span>
            </p>
          </aside>
        </section>
      </div>
    </main>
  );
}
