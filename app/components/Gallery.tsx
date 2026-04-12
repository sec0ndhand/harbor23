import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryImage } from "~/lib/types";

interface GalleryProps {
  images: GalleryImage[];
  heroLayout?: boolean; // Show a featured grid for the first 5 images
}

export default function Gallery({ images, heroLayout = false }: GalleryProps) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  function openLightbox(idx: number) {
    setLightboxIdx(idx);
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    setLightboxIdx(null);
    document.body.style.overflow = "";
  }

  function prev() {
    setLightboxIdx((i) => (i !== null ? (i - 1 + images.length) % images.length : null));
  }

  function next() {
    setLightboxIdx((i) => (i !== null ? (i + 1) % images.length : null));
  }

  if (heroLayout && images.length >= 5) {
    return (
      <>
        {/* Hero Grid (like Airbnb's 5-photo layout) */}
        <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[480px] sm:h-[560px] rounded-xl overflow-hidden">
          {/* Large hero */}
          <div
            className="col-span-2 row-span-2 cursor-pointer img-overlay"
            onClick={() => openLightbox(0)}
          >
            <img
              src={images[0].url}
              srcSet={images[0].srcSet}
              sizes="(min-width: 640px) 50vw, 100vw"
              alt={images[0].alt}
              className="w-full h-full object-cover"
              loading="eager"
              width={images[0].width ?? 1200}
              height={images[0].height ?? 800}
            />
          </div>
          {/* Four smaller images */}
          {images.slice(1, 5).map((img, i) => (
            <div
              key={i}
              className="cursor-pointer img-overlay"
              onClick={() => openLightbox(i + 1)}
            >
              <img
                src={img.url}
                srcSet={img.srcSet}
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                alt={img.alt}
                className="w-full h-full object-cover"
                loading="lazy"
                width={img.width ?? 800}
                height={img.height ?? 600}
              />
              {/* Show all photos button on last tile */}
              {i === 3 && (
                <div
                  className="absolute inset-0 bg-black/40 flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    openLightbox(4);
                  }}
                >
                  <span className="text-white font-medium text-sm bg-white/20 backdrop-blur-sm border border-white/40 px-4 py-2 rounded-full">
                    +{images.length - 4} photos
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        <Lightbox
          images={images}
          idx={lightboxIdx}
          onClose={closeLightbox}
          onPrev={prev}
          onNext={next}
        />
      </>
    );
  }

  // Standard masonry/grid for full gallery page
  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 space-y-3">
        {images.map((img, i) => (
          <div
            key={i}
            className="break-inside-avoid cursor-pointer img-overlay rounded-lg overflow-hidden"
            onClick={() => openLightbox(i)}
          >
            <img
              src={img.url}
              srcSet={img.srcSet}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              alt={img.alt}
              className="w-full h-auto object-cover"
              loading={i < 6 ? "eager" : "lazy"}
              width={img.width ?? 800}
              height={img.height ?? 600}
            />
            {img.caption && (
              <p className="text-xs text-gray-500 px-2 py-1">{img.caption}</p>
            )}
          </div>
        ))}
      </div>

      <Lightbox
        images={images}
        idx={lightboxIdx}
        onClose={closeLightbox}
        onPrev={prev}
        onNext={next}
      />
    </>
  );
}

// ── Lightbox ──────────────────────────────────────────────────────────────────

interface LightboxProps {
  images: GalleryImage[];
  idx: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function Lightbox({ images, idx, onClose, onPrev, onNext }: LightboxProps) {
  if (idx === null) return null;
  const img = images[idx];

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Image */}
      <div
        className="relative max-w-5xl max-h-[90vh] w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={img.url}
          srcSet={img.srcSet}
          sizes="90vw"
          alt={img.alt}
          className="max-w-full max-h-[85vh] object-contain mx-auto rounded-lg"
        />
        {img.alt && (
          <p className="text-center text-sm text-gray-300 mt-3">{img.alt}</p>
        )}
        <p className="text-center text-xs text-gray-500 mt-1">
          {idx + 1} / {images.length}
        </p>
      </div>

      {/* Close */}
      <button
        className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
        onClick={onClose}
        aria-label="Close gallery"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous photo"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Next */}
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next photo"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
