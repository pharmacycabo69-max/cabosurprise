// Background-image based so a missing placeholder file shows the warm gradient instead of a broken image.
export default function Photo({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={`bg-cover bg-center bg-gradient-to-br from-blush via-[#F1CFC2] to-terracotta/70 ${className}`}
      style={{ backgroundImage: `url(/photos/${src})` }}
    />
  );
}
