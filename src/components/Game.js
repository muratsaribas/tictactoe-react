import React, { Component } from 'react'
import Board from './Board';

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            xIsNext: true,
            stepNumber: 0,
            history: [
                { squares: Array(9).fill(null) }
            ]
        }
    }

    handleClick(i){
        const history = this.state.history.slice(0, this.state.stepNumber+1);
        const current = history[history.length-1];
        const squares = current.squares.slice();
        const winner = calculateWinner(squares);
        if(winner || squares[i]){
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat({
                squares: squares
            }),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length
        })
    }

    restartGame(){
        console.log("aman aman")
        this.setState({
            xIsNext: true,
            stepNumber: 0,
            history: [
                { squares: Array(9).fill(null) }
            ]
        });
    }

    render() {

        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const stepNum = this.state.stepNumber;
        let repeat = false;

        let status;
        if(winner){
            repeat = true;
            status = 'Kazanan: '+ winner;
        }
        else{
            status = 'Sıradaki Oyuncu: '+ (this.state.xIsNext ? 'X' : 'O');
        }

        if(!winner && stepNum > 8){
            repeat = true;
            status = 'Berabere!';
        }


        return (
            <div className='game'>
                <div className='game-info'>
                    <div className='status'>{status}</div>
                    {repeat && <div className="repeat-btn" onClick={() => this.restartGame()}>Tekrar Oyna</div>}
                </div>
                <div className='game-board'>
                    <Board onClick={(i) => this.handleClick(i)}
                    squares={current.squares} />
                </div>
            </div>
        )
    }
}

function calculateWinner(squares){

    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    for(let i = 0; i<lines.length; i++){
        const [a,b,c] = lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[b] === squares[c]){
            return squares[a];
        }
    }

    return null;

}