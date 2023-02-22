import React, { useEffect, useState } from 'react';

import { TruncatedText } from './TruncatedText';

function App() {
  const [width, setWidth] = useState(200);
  const [count, setCount] = useState(10);
  const [offset, setOffset] = useState(5);
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(new Array(count).fill(null).map((_, index) => {
      return {
        text: `feature/create-new-text-ellipsis-component-TC2018.${index}`,
        tail: index % 50 + offset,
      };
    }));
  }, [count, offset]);

  return (
    <div className="App">
      <div>
        <b>Column Width</b>
        <br/>
        <input
          type="number"
          value={width}
          onChange={(e) => {
            setWidth(Number(e.target.value));
          }}
        />
      </div>

      <br/>

      <div>
        <b>Tail offset</b>
        <br/>
        <input
          type="number"
          value={offset}
          onChange={(e) => {
            setOffset(Number(e.target.value));
          }}
        />
      </div>

      <br/>

      <div>
        <b>Rows count</b>
        <br/>
        <input
          type="number"
          value={count}
          onChange={(e) => {
            setCount(Number(e.target.value));
          }}
        />
      </div>

      <br/>

      <table>
        <tbody>
          { items.map(({ text, tail }, index) =>
            <React.Fragment key={index}>
              <tr>
                {/* <td width={width}>
                  <TruncatedText
                    children={text}
                    tailLength={tail}
                    title={text}
                  />
                </td> */}

                <td width={width}>
                  <TruncatedText
                    children={text}
                    tailLength={tail}
                    title={text}
                  />
                </td>
              </tr>
            </React.Fragment>
          ) }
        </tbody>
      </table>
    </div>
  );
}

export default App;
