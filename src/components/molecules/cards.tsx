import { Link } from "react-router-dom";
import { ArrowUpRight, Linkedin } from "lucide-react";
import { Img } from "@/components/atoms/media";
import type { Insight } from "@/content/insights";
import { initials, type Person } from "@/content/people";
import { cn, formatDate } from "@/lib/utils";

/** Borderless article entry: photo, category · date, title, excerpt. */
export function ArticleCard({ post, className, sizes = "(min-width:1024px) 30vw, (min-width:810px) 45vw, 100vw" }: { post: Insight; className?: string; sizes?: string }) {
  return (
    <Link to={`/insights/${post.slug}`} className={cn("group/card flex flex-col", className)}>
      <div className="overflow-hidden rounded-xs">
        <Img
          photo={post.cover}
          src={post.coverUrl}
          alt={post.title}
          ratio="3/2"
          sizes={sizes}
          imgClassName="transition-transform duration-5 ease-out group-hover/card:scale-[1.04]"
        />
      </div>
      <div className="mt-5 flex items-center justify-between gap-4 text-micro text-muted">
        <span className="font-medium uppercase tracking-[0.08em]">{post.category}</span>
        <time dateTime={new Date(post.date).toISOString()}>{formatDate(post.date)}</time>
      </div>
      <h3 className="mt-3 text-h4 font-medium text-ink transition-colors duration-2 group-hover/card:text-accent tablet:text-[1.375rem]">
        {post.title}
      </h3>
      <p className="mt-3 line-clamp-2 text-small text-body">{post.excerpt}</p>
    </Link>
  );
}

/** Portrait (4:5), greyscale → colour on hover, name and role. Opens the person dialog. */
export function PersonCard({ person, onOpen }: { person: Person; onOpen: () => void }) {
  return (
    <button type="button" onClick={onOpen} className="group/person flex w-full flex-col text-left" aria-haspopup="dialog">
      <div className="relative w-full overflow-hidden rounded-xs bg-mist" style={{ aspectRatio: "4/5" }}>
        {person.photo ? (
          <img
            src={`${person.photo}-480.webp`}
            srcSet={`${person.photo}-480.webp 480w, ${person.photo}-800.webp 800w`}
            sizes="(min-width:1024px) 22vw, 45vw"
            alt={person.name}
            loading="lazy"
            width={480}
            height={600}
            className="absolute inset-0 size-full object-cover grayscale-[0.85] transition-[filter,transform] duration-4 ease-out group-hover/person:scale-[1.03] group-hover/person:grayscale-0 group-focus-visible/person:grayscale-0"
          />
        ) : (
          <span aria-hidden className="absolute inset-0 grid place-items-center text-display font-medium text-quiet">
            {initials(person.name)}
          </span>
        )}
        <span className="absolute bottom-3 right-3 grid size-9 translate-y-2 place-items-center rounded-full bg-white text-ink opacity-0 transition-[opacity,transform] duration-3 ease-out group-hover/person:translate-y-0 group-hover/person:opacity-100">
          <ArrowUpRight aria-hidden strokeWidth={1.75} className="size-4" />
        </span>
      </div>
      <span className="mt-4 text-[1.0625rem] font-medium text-ink transition-colors duration-2 group-hover/person:text-accent">
        {person.name}
      </span>
      <span className="mt-1 text-small text-muted">{person.role}</span>
      {person.linkedin && (
        <span className="mt-2 inline-flex items-center gap-1.5 text-micro text-muted">
          <Linkedin aria-hidden className="size-3.5" strokeWidth={1.75} /> LinkedIn
        </span>
      )}
    </button>
  );
}
