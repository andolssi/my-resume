import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay, { AutoplayOptionsType } from 'embla-carousel-autoplay';
import imageByIndex from './imageByIndex';
import Image from 'next/image';
import useThemePreference from '@/helpers/useThemePreference';
import imageByIndexDark from './imageByIndexDark';

type PropType = {
  slides: number[];
  options?: AutoplayOptionsType;
};

const Carousel: React.FC<PropType> = (props) => {
  const { theme } = useThemePreference();
  const { slides, options } = props;
  const [emblaRef] = useEmblaCarousel(options, [Autoplay()]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number">
                <span>{index + 1}</span>
              </div>
              <Image
                className="embla__slide__img"
                src={
                  theme === 'dark'
                    ? imageByIndexDark(index)
                    : imageByIndex(index)
                }
                alt="logo"
                width={100}
                height={100}
                sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 50vw,
                33vw"
                placeholder="blur"
                blurDataURL="/logos/logo-Placeholder.png"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
