/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectContactForm = (state) => state.get('contactForm');
const selectGlobal = (state) => state.get('contactForm');

const makeSelectForm = () => createSelector(
  selectContactForm,
  (contactFormState) => homeState.get('form')
);

export {
  selectContactForm,
  makeSelectForm,
};
