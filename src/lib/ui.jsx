import React from 'react';
import manifest from '../image-manifest.json';

const BASE = import.meta.env.BASE_URL || '/';

export const cx = (...parts) => parts.filter(Boolean).join(' ');

/** Haal de leesbare tekst uit een waarde die ook een Athena-stijlobject kan zijn. */
export function text(value) {
  if (value === null || value === undefined) return '';
  const unwrapped = unwrap(value);
  if (unwrapped && typeof unwrapped === 'object') {
    return unwrapped.text ?? unwrapped.title ?? unwrapped.label ?? unwrapped.name ?? unwrapped.value ?? '';
  }
  return String(unwrapped ?? '');
}

/** Pak een array-of-één-object situatie netjes uit. */
export function first(value) {
  if (Array.isArray(value)) return value[0] || {};
  return value || {};
}

export function unwrap(value) {
  if (Array.isArray(value)) return value[0];
  return value;
}

const isRemote = (value) => /^(https?:)?\/\//.test(value) || value.startsWith('data:') || value.startsWith('/');

/** Bouw een URL naar een afbeelding in /public/images. */
export function imagePath(value) {
  const raw = text(value);
  if (!raw) return '';
  if (isRemote(raw)) return raw;
  const clean = raw.replace(/^\/+/, '');
  const url = clean.startsWith('images/') ? `${BASE}${clean}` : `${BASE}images/${clean}`;
  return url.replace(/\/{2,}/g, '/');
}

/** Bestaat er een geoptimaliseerde webp-variant? */
export function webpPath(value) {
  const raw = text(value);
  if (!raw || isRemote(raw)) return '';
  const file = raw.replace(/^\/+/, '').split('/').pop();
  const mapped = manifest[file];
  return mapped ? `${BASE}${mapped}`.replace(/\/{2,}/g, '/') : '';
}

/**.pathname helper voor interne ankers. */
export const anchor = (id) => `#${id}`;

/**
 * Atomair tekstveld met Athena data-dock binding.
 */
export function T({ as: Tag = 'span', value, file, index = 0, field, className, style, ...rest }) {
  return (
    <Tag
      className={className}
      style={style}
      data-dock-type="text"
      data-dock-bind={file ? `${file}.${index}.${field}` : undefined}
      {...rest}
    >
      {text(value)}
    </Tag>
  );
}

/**
 * Afbeelding met webp-fallback en optionele Athena media-binding.
 */
export function Picture({
  value,
  alt = '',
  className,
  imgClassName,
  file,
  index = 0,
  field,
  priority = false,
  sizes,
  style,
  ...rest
}) {
  const src = imagePath(value);
  const webp = webpPath(value);
  const img = (
    <img
      src={src}
      alt={alt}
      sizes={sizes}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : undefined}
      className={cx('h-full w-full object-cover', imgClassName)}
      style={style}
      data-dock-type="media"
      data-dock-bind={file ? `${file}.${index}.${field}` : undefined}
      {...rest}
    />
  );

  if (!webp) return <div className={cx('h-full w-full', className)}>{img}</div>;

  return (
    <div className={cx('h-full w-full', className)}>
      <picture>
        <source srcSet={webp} type="image/webp" sizes={sizes} />
        {img}
      </picture>
    </div>
  );
}

/** Cijfer-icoon zoals "01" in een rustig mono-achtig label. */
export function Index({ children, className }) {
  return (
    <span
      className={cx('font-sans text-[0.6875rem] font-bold uppercase tracking-[0.3em] text-accent', className)}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}