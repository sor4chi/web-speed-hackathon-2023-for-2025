import classNames from 'classnames';
import type { FC } from 'react';
import { useState } from 'react';

import type { ProductFragmentResponse } from '../../../graphql/fragments';
import { AspectRatio } from '../../foundation/AspectRatio';

import { MediaItem } from './MediaItem';
import { MediaItemPreviewer } from './MediaItemPreviewer';
import * as styles from './ProductMediaListPreviewer.styles';

type Props = {
  product: ProductFragmentResponse | undefined;
};

export const ProductMediaListPreviewer: FC<Props> = ({ product }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <div className={styles.container()}>
      {product ? (
        <MediaItemPreviewer file={product.media[activeIndex].file} />
      ) : (
        <div style={{ aspectRatio: '16 / 9', backgroundColor: 'gray', height: 'auto', width: '100%' }}></div>
      )}
      <div className={styles.itemListWrapper()}>
        <ul className={styles.itemList()}>
          {product
            ? product.media.map((media, index) => {
                const disabled = index === activeIndex;

                return (
                  <li key={media.id} className={styles.item()}>
                    <AspectRatio ratioHeight={1} ratioWidth={1}>
                      <button
                        className={classNames(styles.itemSelectButton(), {
                          [styles.itemSelectButton__disabled()]: disabled,
                        })}
                        disabled={disabled}
                        onClick={() => setActiveIndex(index)}
                      >
                        <MediaItem file={media.file} />
                      </button>
                    </AspectRatio>
                  </li>
                );
              })
            : Array.from({ length: 7 }).map((_, index) => (
                <li key={index} className={styles.item()}>
                  <div style={{ backgroundColor: 'gray', height: '40px', width: '40px' }} />
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
};
