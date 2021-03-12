import React, { Component } from "react";
import "./board.css";

class board extends Component {
	state = {
		turn: "X",
		gameEnded: "false",
		winner: undefined
	};

	gameState = {
		board: Array(9).fill(""),
		totalMoves: 0
	};
	handleClick = event => {
		if (event.target.innerText === "") {
			this.gameState.totalMoves++
			this.gameState.board[event.target.dataset.square] = this.state.turn;
			event.target.innerText = this.state.turn;
			this.setState({
				turn: this.state.turn === "X" ? "O" : "X",
				board: this.gameState.board
			});
		}

		const result = this.checkWinner();

		if (result === "X") {
			this.setState({
				gameEnded: true,
				winner: "X",
				winnerLine: "Match won by X",
				noShow: "noShow"
			});
		}

		if (result === "O") {
			this.setState({
				gameEnded: true,
				winner: "O",
				winnerLine: "Match won by O",
				noShow: "noShow"
			});
		} else if (result === "draw") {
			this.setState({
				gameEnded: true,
				winner: "Draw",
				winnerLine: "Match is drawn",
				noShow: "noShow"
			});
		}
		console.log(this.state.gameEnded);
	};

	checkWinner = () => {
		const moves = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 5, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6]
		];

		const board = this.gameState.board;
		for (let i = 0; i < moves.length; i++) {
			if (
				board[moves[i][0]] === board[moves[i][1]] &&
				board[moves[i][1]] === board[moves[i][2]]
			) {
				return board[moves[i][0]];
			}
			console.log(this.gameState.totalMoves)

			if (this.gameState.totalMoves === 9) {
				return "draw";
			}
		}
	};

	render() {
		return (
			<div>
				<div id="status">
					<h1>{this.state.winnerLine}</h1>
				</div>
				<section
					onClick={e => this.handleClick(e)}
					className={"table" + " " + this.state.noShow}
				>
					<div className="square" data-square="0" />
					<div className="square" data-square="1" />
					<div className="square" data-square="2" />
					<div className="square" data-square="3" />
					<div className="square" data-square="4" />
					<div className="square" data-square="5" />
					<div className="square" data-square="6" />
					<div className="square" data-square="7" />
					<div className="square" data-square="8" />
				</section>
			</div>
		);
	}
}

export default board;
