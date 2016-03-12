import deep from '../../src/node-deep';

describe('nodeDeep', () => {
  it('should call back for every node', () => {
    const cb = spy();
    deep({ a: 'b', c: { d: { e: 'f' } } }, cb);
    expect(cb).to.have.been.calledWith(['a'], 'b');
    expect(cb).to.have.been.calledWith(['c'], { d: { e: 'f' } });
    expect(cb).to.have.been.calledWith(['c', 'd'], { e: 'f' });
    expect(cb).to.have.been.calledWith(['c', 'd', 'e'], 'f');
  });

  it(`doesn't mutate the source object graph`, () => {
    const pred = () => false;
    const obj = { a: 'b' };
    const res = deep(obj, pred);
    expect(res).not.to.equal(obj);
    expect(res).to.deep.equal(obj);
  });

  it('omits', () => {
    const pred = (path, val) => path.join('.') === 'c.d';
    const res = deep({ a: 'b', c: { d: { e: 'f' } } }, pred);
    expect(res).to.eql({ a: 'b', c: {} });
  });
});
