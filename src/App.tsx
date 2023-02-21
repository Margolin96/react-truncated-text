import React, { useMemo } from 'react';

import { TruncatedText } from './TruncatedText';

function App() {
  const items = useMemo(() => {
    return new Array(2000).fill(null).map((_, index) => {
      return {
        text: `feature/create-new-text-ellipsis-component-TC2018.${index}`,
        tail: index % 20,
      };
    })
  }, []);

  return (
    <div className="App">
      <table>
        <tbody>
          { items.map(({ text, tail }, index) =>
            <tr key={index}>
              <td width={200}>
                <TruncatedText
                  children={text}
                  tailLength={tail}
                  title={text}
                />
              </td>
            </tr>
          ) }
        </tbody>
      </table>
    </div>
  );
}

export default App;
