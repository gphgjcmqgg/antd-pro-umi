import { reloadAuthorized } from './Authorized';

// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str?: string): string | string[] {
  const authorityString =
    typeof str === 'undefined' && localStorage ? localStorage.getItem('security.user') : str;
  // authorityString could be admin, "admin", ["admin"]
  let authority;
  if (authorityString != null) {
    try {
        authority = JSON.parse(authorityString);
        if (authority && authority.isPayed){
          authority = 'admin';
        } else {
          authority = 'user';
        }
    } catch (e) {
      authority = authorityString;
    }
  }
  if (typeof authority === 'string') {
    return [authority];
  }
  
  return '';
}

export function setAuthority(authority: string | string[]): void {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority));
  // auto reload
  reloadAuthorized();
}
