import deep from '../../src/node-deep';

describe('nodeDeep', () => {
  let cbSpy;
  beforeEach(() => {
    cbSpy = spy();
  });

  it('should call back for every node', () => {
    deep({ a: 'b', c: { d: 'e' } }, cbSpy);
    expect(cbSpy).to.have.been.calledWith(['a', 'b']);
    expect(cbSpy).to.have.been.calledWith(['c', 'd', 'e']);
  });
});
