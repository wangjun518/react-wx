import xFetch from './xFetch';

export async function queryOptrList(values) {
  return xFetch('/api/optrlistdata');
}

export async function queryOptrFormData() {
  return xFetch('/api/optrformdata');
}


export async function queryOptrChannel() {
  return xFetch('/api/optrchannel');
}
