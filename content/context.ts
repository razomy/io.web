const subdomainName = 'function';
const domain = subdomainName + '.razomy.org';
const cookie = {
  session: {locale: subdomainName + '.razomy.org-session-locale',}
}
const i18n = {
  name: 'name',
  description: 'description',
}

export const c = {
  subdomainName,
  domain,
  cookie,
  i18n
}