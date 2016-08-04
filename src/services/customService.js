import xFetch from './xFetch';

export async function queryCustomServiceList(values) {
  return xFetch('/api/cmslist');
}
