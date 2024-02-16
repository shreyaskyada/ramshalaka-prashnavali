import { useState } from "react";
import "./App.css";
import { prashnavaliMatrix } from "./const";

function App() {
  const [selectedCells, setSelectedCells] = useState<any>([]);
  const [firstCell, setFirstCell] = useState<any>([]);

  const onClickHandler = (row: number, col: number) => {
    let count = 0;
    const arr = [];
    const m = prashnavaliMatrix.length;
    const n = prashnavaliMatrix[0].length;

    let i = row;
    let j = col;

    do {
      while (count !== 9) {
        if (j === n - 1) {
          j = 0;
          if (i === m - 1) {
            i = 0;
          } else i++;
        } else j++;
        count++;
      }
      arr.push([i, j]);
      count = 0;
    } while (row !== i);

    arr.push([row, col]);
    arr.sort((a, b) => a[0] - b[0]);

    setFirstCell([row, col]);
    setSelectedCells(arr);
  };

  const isActiveCell = (row: number, col: number) => {
    for (let i = 0; i < selectedCells.length; i++) {
      if (selectedCells[i][0] === row && selectedCells[i][1] === col) {
        return true;
      }
    }
    return false;
  };

  const isFirstCell = (row: number, col: number) => {
    if (row === firstCell[0] && col === firstCell[1]) return true;

    return false;
  };

  const onResetClickHandler = () => {
    setSelectedCells([]);
    setFirstCell([]);
  };

  return (
    <div className="w-[calc(100vw - 4px)] h-auto md:w-auto">
      <button
        type="button"
        className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 border-none"
        onClick={onResetClickHandler}
      >
        Reset
      </button>
      <table className="table-auto w-full md:w-[550px] mx-auto">
        <tbody>
          {prashnavaliMatrix.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((data, colIndex) => (
                <td
                  key={colIndex}
                  className={`w-[25px] md:w-0 py-[6px] text-[14px] border-2 border-[#363549] cursor-pointer hover:text-black ${
                    isActiveCell(rowIndex, colIndex) &&
                    "bg-green-400 text-black transition-colors duration-500"
                  } ${
                    isFirstCell(rowIndex, colIndex)
                      ? "!bg-cyan-500"
                      : "hover:bg-green-400"
                  } ${!!selectedCells.length && "pointer-events-none"}`}
                  onClick={() => onClickHandler(rowIndex, colIndex)}
                >
                  {data}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-[20px] h-[30px] px-[10px]">
        {!!selectedCells.length &&
          selectedCells.map((cell: any) => {
            return ` ${prashnavaliMatrix[cell[0]][cell[1]]} `;
          })}
      </p>
    </div>
  );
}

export default App;
