import xFetch from './xFetch';

export async function queryChannelForm(){
  return xFetch('/api/channelFormData');
}

export async function queryChannelList(values){
  return xFetch('/api/channelList');
}
