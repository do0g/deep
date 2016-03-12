import deep from '../../src/node-deep';

describe('nodeDeep', () => {
  it('should call back for every node', () => {
    const cb = stub().returns(false);
    deep({ a: 'b', c: { d: { e: 'f' } } }, cb);
    expect(cb).to.have.been.calledWith(['a'], 'b');
    expect(cb).to.have.been.calledWith(['c'], { d: { e: 'f' } });
    expect(cb).to.have.been.calledWith(['c', 'd'], { e: 'f' });
    expect(cb).to.have.been.calledWith(['c', 'd', 'e'], 'f');
  });

  it('omits', () => {
    const pred = (path, val) => path.join('.') === 'c.d';
    const res = deep({ a: 'b', c: { d: { e: 'f' } } }, pred);
    expect(res).to.eql({ a: 'b', c: {} });
  });
});
