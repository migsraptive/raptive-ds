/**
 * MediaGallery
 * Responsive image gallery with two layout modes.
 * Maps to Figma: molecules/media/gallery
 *
 * Layout "1": single full-bleed image
 * Layout "5+": 2-column grid — left (2 stacked), right (3 stacked), last shows +N overflow
 */

export function MediaGallery({
  images = [],
  size = 343,
  className = '',
}) {
  if (images.length === 0) return null

  const layout = images.length === 1 ? '1' : '5+'

  return (
    <div
      className={[
        'flex overflow-hidden rounded-xs',
        className,
      ].join(' ')}
      style={{ width: size, height: size }}
    >
      {layout === '1' ? (
        <SingleImage image={images[0]} />
      ) : (
        <GridLayout images={images} />
      )}
    </div>
  )
}

function SingleImage({ image }) {
  return (
    <img
      src={image.src}
      alt={image.alt || ''}
      className="w-full h-full object-cover"
    />
  )
}

function GridLayout({ images }) {
  const visible = images.slice(0, 5)
  const overflow = images.length - 5

  const left = visible.slice(0, 2)
  const right = visible.slice(2, 5)

  return (
    <div className="flex gap-1 w-full h-full">
      {/* Left column — 2 images */}
      <div className="flex flex-col gap-1 flex-1 min-w-0 h-full">
        {left.map((img, i) => (
          <div key={i} className="flex-1 min-h-0 relative overflow-hidden">
            <img
              src={img.src}
              alt={img.alt || ''}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {i === 0 && (
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent to-[12%]" />
            )}
          </div>
        ))}
      </div>

      {/* Right column — up to 3 images */}
      <div className="flex flex-col gap-1 flex-1 min-w-0 h-full">
        {right.map((img, i) => {
          const isLast = i === right.length - 1 && overflow > 0

          return (
            <div key={i} className="flex-1 min-h-0 relative overflow-hidden">
              <img
                src={img.src}
                alt={img.alt || ''}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {isLast && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-white text-lg font-bold">
                    +{overflow}
                  </span>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
