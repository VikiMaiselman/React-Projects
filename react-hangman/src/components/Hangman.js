import React, { Component } from "react";
import "../styles/Hangman.css";
import img0 from "../images/0.jpg";
import img1 from "../images/1.jpg";
import img2 from "../images/2.jpg";
import img3 from "../images/3.jpg";
import img4 from "../images/4.jpg";
import img5 from "../images/5.jpg";
import img6 from "../images/6.jpg";
import { randomWord } from "../words";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
    this.handleGuess = this.handleGuess.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.restart = this.restart.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr, idx) => (
      <button
        key={idx}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }
  restart () {
    this.setState(st => ({
      guessed: new Set(),
      nWrong: 0,
      answer: randomWord()
    }));
  }
  handleClick() {
    this.restart();
  }

  /** render: render game */
  render() {
    const isActive = this.state.nWrong < this.props.maxWrong;
    const isWinner = this.guessedWord().join("") === this.state.answer;
    let display = this.generateButtons();
    if (!isActive) display = <h1>You've lost!</h1>;
    if (isWinner) display = <h1>You won!</h1>

    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img src={this.props.images[this.state.nWrong]} alt={`${this.state.nWrong} wrong guesses.`} />
        <p>Number of wrong guesses: {this.state.nWrong}</p>
        {isActive ? <p className='Hangman-word'>{this.guessedWord()}</p> : <p className='Hangman-word'>{this.state.answer}</p>}

        <p className='Hangman-btns'>{display}</p> 

        
        <button onClick={this.handleClick} style={{width: "100px"}}>Restart!</button>
      </div>
    );
  }
}

export default Hangman;
