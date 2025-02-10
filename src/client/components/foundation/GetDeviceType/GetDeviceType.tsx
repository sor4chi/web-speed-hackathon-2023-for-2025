import { useEffect, useState } from 'react';

export const DeviceType = {
  DESKTOP: 'DESKTOP',
  MOBILE: 'MOBILE',
} as const;
export type DeviceType = typeof DeviceType[keyof typeof DeviceType];

type Props = {
  children: ({ deviceType }: { deviceType: DeviceType }) => React.ReactElement;
};

export const GetDeviceType = ({ children }: Props) => {
  const [deviceType, setDeviceType] = useState<DeviceType>(
    window.innerWidth >= 1024 ? DeviceType.DESKTOP : DeviceType.MOBILE,
  );

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      setDeviceType(window.innerWidth >= 1024 ? DeviceType.DESKTOP : DeviceType.MOBILE);
    });

    resizeObserver.observe(document.documentElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return children({ deviceType });
};
