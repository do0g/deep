import deep from '../../src/node-deep';

describe('deep', () => {
  it('calls back for every node', () => {
    const cb = spy();
    deep(cb, { a: 'b', c: { d: { e: 'f' } } });
    expect(cb).to.have.been.calledWith(['a'], 'b');
    expect(cb).to.have.been.calledWith(['c'], { d: { e: 'f' } });
    expect(cb).to.have.been.calledWith(['c', 'd'], { e: 'f' });
    expect(cb).to.have.been.calledWith(['c', 'd', 'e'], 'f');
  });

  it(`doesn't mutate the source object graph`, () => {
    const pred = () => false;
    const obj = { a: 'b' };
    const res = deep(pred, obj);
    expect(res).to.deep.equal(obj);
    expect(res).not.to.equal(obj);
  });

  it('omits', () => {
    const pred = (path, val) => path.join('.') === 'c.d';
    const res = deep(pred, { a: 'b', c: { d: { e: 'f' } } });
    expect(res).to.eql({ a: 'b', c: {} });
  });

  it('replaces', () => {
    const replaceFn = (path, val) => {
      if (path.join('.') === 'c.d.e') {
        return { f: 'g' };
      };
    };
    const res = deep(replaceFn, { a: 'b', c: { d: { e: 'f' } } });
    expect(res).to.eql({ a: 'b', c: { d: { f: 'g' } } });
  });
});
