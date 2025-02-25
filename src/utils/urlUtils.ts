
export const convertDropboxToDirectLink = (dropboxLink: string): string => {
  const baseUrl = dropboxLink.split('?')[0];
  return baseUrl
    .replace('www.dropbox.com', 'dl.dropboxusercontent.com')
    .replace('/scl/', '/')
    .replace('?dl=0', '');
};
