import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/
class Board extends Component {
  static defaultProps = {
    nrows: 5, 
    ncols: 5,
    chanceLightStartsOn: 0.25,
  }

  constructor(props) {
    super(props);

    this.state = {
      hasWon: false, 
      board: this.createBoard()
    }

    this.flipCellsAround = this.flipCellsAround.bind(this);
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  createBoard() {
    let board = [];
    for (let i = 0; i < this.props.nrows; ++i) {
      let row = [];
      for (let j = 0; j < this.props.ncols; ++j) {
        row.push(Math.random() < this.props.chanceLightStartsOn)
      }
      board.push(row);
    }

    return board;
  }

  /** handle changing a cell: update board & determine if winner */
  flipCellsAround(coord) {
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [i, j] = coord.split("-").map(Number);

    function flipCell(i, j) {
      if (j >= 0 && j < ncols && i >= 0 && i < nrows) {
        board[i][j] = !board[i][j];
      }
    }
    flipCell(i,j);
    flipCell(i+1,j);
    flipCell(i-1, j);
    flipCell(i, j+1);
    flipCell(i, j-1);


    // win when every cell is turned off
    const hasWon = board.every(row => row.every(cell => !cell)); // every cell in every row is false

    this.setState({board, hasWon});
  }

  render() {

    if (this.state.hasWon) {
      return (
        <>
           <h1 className="neon">You <span className="flux">won !</span></h1>
        </>
      )
    }
    // if the game is won, just show a winning msg & render nothing else
    return (
      <>
        <h1 className="neon">Lights <span className="flux">out</span></h1>
        <table className="Board">
          <tbody>
              
              {this.state.board.map((row, i) => {
                return <tr key={i}>
                  {row.map((cell, j) => {
                    return <Cell key={`${i}-${j}`} id={`${i}-${j}`} isLit={cell} flipCellsAroundMe={this.flipCellsAround}/>
                  })}
                </tr>
                
              })}

          </tbody>
        </table>
      </>
    );
  }
}


export default Board;
