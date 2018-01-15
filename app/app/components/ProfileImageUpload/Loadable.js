/**
 *
 * Asynchronously loads the component for ImageUpload
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
