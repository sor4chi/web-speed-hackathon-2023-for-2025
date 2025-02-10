import { css } from '@emotion/css';

export const featureList = () => css`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 40px;
`;

export const feature = () => css`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const featureHeading = () => css`
  font-size: 1.5rem;
  font-weight: 700;
  padding: 0 16px;
`;

export const heroImageContainer = () => css`
  aspect-ratio: 16 / 9;
  height: auto;
  margin: 0 auto;
  max-width: 1024px;
  width: 100%;
`;
