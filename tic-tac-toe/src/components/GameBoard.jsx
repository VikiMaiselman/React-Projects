import React from "react";
export default function GameBoard({ handleClickOnBoard, board }) {
  return (
    <ol id="game-board">
      {React.Children.toArray(
        board.map((row, rowIndex) => (
          <li>
            <ol>
              {React.Children.toArray(
                row.map((playerSymbol, colIndex) => (
                  <li>
                    <button onClick={() => handleClickOnBoard(rowIndex, colIndex)} disabled={playerSymbol !== null}>
                      {playerSymbol}
                    </button>
                  </li>
                ))
              )}
            </ol>
          </li>
        ))
      )}
    </ol>
  );
}
