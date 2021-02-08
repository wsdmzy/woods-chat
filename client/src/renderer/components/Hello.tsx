import React from 'react';
import $style from './style.module.less';

export interface Props {
  name: string;
  enthusiasmLevel?: number;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export default class Hello extends React.Component<Props, object> {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  render() {
    const { name, enthusiasmLevel = 1 } = this.props;

    if (enthusiasmLevel <= 0) {
      throw new Error('You could be a little more enthusiastic. :D');
    }

    return (
      <div className="hello">
        <div className={$style.hello}>
          Hello {name + getExclamationMarks(enthusiasmLevel)}
        </div>
      </div>
    );
  }
}

function getExclamationMarks(numChars: number) {
  return Array(numChars + 1).join('!');
}