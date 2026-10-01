export default function Photo({ className, alt = '' }) {
  return (
    <picture>
      <source srcSet="/image/me-320.avif" type="image/avif" />
      <img className={className} src="/image/me-320.webp" width="320" height="320" alt={alt} decoding="async" />
    </picture>
  )
}
