import React, { useMemo, useState } from 'react';

import { TruncatedText } from './TruncatedText';

function App() {
  const [offset, setOffset] = useState(0);

  const items = useMemo(() => {
    return new Array(2000).fill(null).map((_, index) => {
      return {
        text: `feature/create-new-text-ellipsis-component-TC2018.${index}`,
        tail: index % 50 + offset,
      };
    })
  }, [offset]);

  return (
    <div className="App">
      <input
        type="number"
        value={offset}
        onChange={(e) => {
          setOffset(Number(e.target.value));
        }}
      />

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
