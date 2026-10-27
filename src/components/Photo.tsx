import Image from "next/image";

// Gradient shows while the image loads. Images are lazy-loaded unless `priority` is set.
export default function Photo({
  src,
  alt,
  className = "",
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-blush via-[#F1CFC2] to-terracotta/70 ${className}`}>
      <Image src={`/photos/${src}`} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
    </div>
  );
}
