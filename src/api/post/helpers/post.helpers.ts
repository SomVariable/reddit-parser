import { POST_SELECTORS } from '../constants/post.constants';

export const generateOpinionSelector = (opinionNumber: number) =>
  `${POST_SELECTORS.FORM_SECTION_POLL__OPINIONS_INPUTS} > div:nth-child(${opinionNumber}) > div > input`;
