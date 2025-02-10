import { isEqual } from 'lodash-es';
import type { FC } from 'react';
import { memo } from 'react';

import type { FeatureSectionFragmentResponse } from '../../../graphql/fragments';
import { DeviceType, GetDeviceType } from '../../foundation/GetDeviceType';
import { ProductGridList } from '../ProductGridList';
import { ProductListSlider } from '../ProductListSlider';

import * as styles from './ProductList.styles';

type Props = {
  featureSection: FeatureSectionFragmentResponse;
};

export const ProductList: FC<Props> = memo(({ featureSection }) => {
  return (
    <div className={styles.container()}>
      <GetDeviceType>
        {({ deviceType }) => {
          switch (deviceType) {
            case DeviceType.DESKTOP: {
              return <ProductListSlider featureSection={featureSection} />;
            }
            case DeviceType.MOBILE: {
              return <ProductGridList featureSection={featureSection} />;
            }
          }
        }}
      </GetDeviceType>
    </div>
  );
}, isEqual);

ProductList.displayName = 'ProductList';
