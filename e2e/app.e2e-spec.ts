import { JarvisPage } from './app.po';

describe('jarvis App', () => {
  let page: JarvisPage;

  beforeEach(() => {
    page = new JarvisPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
