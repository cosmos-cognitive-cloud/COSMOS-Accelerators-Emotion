import { COSMOSAcceleratorsEmotionPage } from './app.po';

describe('cosmos-accelerators-emotion App', () => {
  let page: COSMOSAcceleratorsEmotionPage;

  beforeEach(() => {
    page = new COSMOSAcceleratorsEmotionPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
