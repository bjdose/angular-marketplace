export const loadFont = (): void => {
  const resource = document.createElement('link');
  resource.setAttribute('rel', 'stylesheet');
  resource.setAttribute(
    'href',
    'https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap'
  );
  resource.setAttribute('type', 'text/css');
  const head = document.getElementsByTagName('head')[0];
  head.appendChild(resource);
};
