import Block from '../block';

describe('core/Block', () => {
  type TestProps = {mockProp: number, id: string}
  class TestBlock extends Block<TestProps> {
    render(): string {
      return '<div>{{id}}</div>';
    }
  }
  const blockUpdated = jest.fn();
  const block = new TestBlock({ mockProp: 10, id: 'TestBlock' });
  block.eventBus.on(Block.EVENTS.FLOW_CDU, blockUpdated);

  it('created with props', () => {
    // @ts-expect-error check that object is defined
    expect(block.props).toHaveProperty('mockProp', 10);
  });

  it('setting new props', () => {
    block.setProps({mockProp: 11})
    // @ts-expect-error check that object is changed
    expect(block.props).toHaveProperty('mockProp', 11);
  });

  it('update urops', () => {
    block.setProps({mockProp: 12})
    expect(blockUpdated).toBeCalled();
  });

  it('get content', () => {
    expect(block.getContent().innerHTML).toBe('TestBlock');
  });

  it('update content', () => {
    block.setProps({id: 'NewBlock'})
    expect(block.getContent().innerHTML).toBe('NewBlock');
  });

});
