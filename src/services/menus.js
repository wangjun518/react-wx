import xFetch from './xFetch';

export async function queryMeunData(values) {
  return xFetch('/api/menuData');
}
