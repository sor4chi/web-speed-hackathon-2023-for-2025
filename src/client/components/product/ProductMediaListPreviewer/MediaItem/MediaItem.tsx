import type { FC } from 'react';

import type { MediaFileFragmentResponse } from '../../../../graphql/fragments';
import { getMediaType } from '../../../../utils/get_media_type';
import { Icon } from '../../../foundation/Icon';

import * as styles from './MediaItem.styles';

type Props = {
  file: MediaFileFragmentResponse;
};

export const MediaItem: FC<Props> = ({ file }) => {
  const mediaType = getMediaType(file.filename);

  return (
    <div className={styles.container()}>
      <img height={40} src={file.filename.replace('.jpg', '-40x40.webp').replace('.mp4', '-40x40.webp')} width={40} />
      {mediaType === 'video' && (
        <div className={styles.playIcon()}>
          <Icon color="#ffffff" height={16} type="FaPlay" width={16} />
        </div>
      )}
    </div>
  );
};
