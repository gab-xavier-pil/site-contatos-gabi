import React from 'react';

const studioStripPhotos = [
  { src: '/images/faixa/ft-01.webp', width: 540, height: 720 },
  { src: '/images/faixa/ft-02.webp', width: 540, height: 720 },
  { src: '/images/faixa/ft-03.webp', width: 540, height: 720 },
  { src: '/images/faixa/ft-04.webp', width: 540, height: 720 },
  { src: '/images/faixa/ft-05.webp', width: 540, height: 720 },
  { src: '/images/faixa/ft-06.webp', width: 405, height: 720 },
  { src: '/images/faixa/ft-07.webp', width: 480, height: 720 },
  { src: '/images/faixa/ft-08.webp', width: 480, height: 720 },
  { src: '/images/faixa/ft-09.webp', width: 540, height: 720 },
  { src: '/images/faixa/ft-10.webp', width: 540, height: 720 },
  { src: '/images/faixa/ft-11.webp', width: 540, height: 720 },
  { src: '/images/faixa/ft-12.webp', width: 540, height: 720 },
  { src: '/images/faixa/ft-13.webp', width: 480, height: 720 },
  { src: '/images/faixa/ft-14.webp', width: 480, height: 720 },
  { src: '/images/faixa/ft-15.webp', width: 480, height: 720 },
  { src: '/images/faixa/ft-16.webp', width: 1280, height: 720 },
  { src: '/images/faixa/ft-17.webp', width: 858, height: 720 },
  { src: '/images/faixa/ft-18.webp', width: 576, height: 720 },
  { src: '/images/faixa/ft-19.webp', width: 405, height: 720 },
  { src: '/images/faixa/ft-20.webp', width: 480, height: 720 },
  { src: '/images/faixa/ft-21.webp', width: 480, height: 720 },
  { src: '/images/faixa/ft-22.webp', width: 1279, height: 720 },
  { src: '/images/faixa/ft-23.webp', width: 508, height: 720 },
  { src: '/images/faixa/ft-24.webp', width: 405, height: 720 },
  { src: '/images/faixa/ft-25.webp', width: 1280, height: 703 },
];

export default function StudioPhotoStrip() {
  const photos = [...studioStripPhotos, ...studioStripPhotos];

  return (
    <div className="studio-photo-strip" role="region" aria-label="Fotos do Studio GX">
      <div className="studio-photo-track">
        {photos.map((photo, index) => (
          <img
            key={`${photo.src}-${index}`}
            src={photo.src}
            width={photo.width}
            height={photo.height}
            alt=""
            loading="lazy"
            decoding="async"
          />
        ))}
      </div>
    </div>
  );
}
