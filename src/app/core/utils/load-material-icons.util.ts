export const loadMaterialIcons = (): void => {
  const resource = document.createElement('link');
  resource.setAttribute('rel', 'stylesheet');
  resource.setAttribute(
    'href',
    'https://fonts.googleapis.com/icon?family=Material+Icons'
  );
  resource.setAttribute('type', 'text/css');
  const head = document.getElementsByTagName('head')[0];
  head.appendChild(resource);
};
