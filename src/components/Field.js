import React, { Component } from 'react'
import Row from './Row'
import Next from './Next'
import { Figures } from "../figures";
import './CSS/Field.css';

import { confirmAlert } from 'react-confirm-alert'; // Import
import './CSS/react-confirm-alert.css'; // Import css


export default class Field extends Component {
    constructor(props) {
        super(props)
        this.state = {
            field: [],
            currentFigure: '',
            currentFigureId: 0,
            currentFigureType: '',
            nextFigure: '',
            nextFigureId: 0,
            nextFigureType: '',
            score: 0,
            fieldWidth: 10,
            fieldHeight: 20,
            figures: [],
            interval: null,
            speed: 150,
            defaultSpeed: 150,
            fastSpeed: 10,
            gameOver: false,
            rotate: false,
            stepCounter: 0,
            pause: false,
            loading: false,
            connect: false,
            partnerState: null,
            keyDown:false,
        };
    }

    componentDidMount() {
        this.flushField()
        this.initFigures()

        document.addEventListener('keydown', this.moveLeft.bind(this), false)
        document.addEventListener('keydown', this.moveRight.bind(this), false)
        document.addEventListener('keydown', this.moveDown.bind(this), false)
        document.addEventListener('keydown', this.rotate.bind(this), false)
        document.addEventListener('keydown', this.pause.bind(this), false)
        document.addEventListener('keydown', this.resume.bind(this), false)
        this.props.socket.on('updateGameStateTo', (response) => { this.updateGameState(response) });

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.createLobby) {
            this.state.connect = nextProps.createLobby;
            window.clearInterval(this.state.interval)
            this.loop();
        }
    }

    // shouldComponentUpdate(nextProps, NextState) {
    //     // if (nextProps.createLobby==this.props.createLobby) {
    //     //     return false;
    //     // }
    // }

    componentWillUnmount() {
        if (this.props.createLobby) {

            document.removeEventListener('keydown', this.moveLeft.bind(this), false)
            document.removeEventListener('keydown', this.moveRight.bind(this), false)
            document.removeEventListener('keydown', this.moveDown.bind(this), false)
            document.removeEventListener('keydown', this.rotate.bind(this), false)
            document.removeEventListener('keydown', this.pause.bind(this), false)
            document.removeEventListener('keydown', this.resume.bind(this), false)
        }

    }

    updateGameState = (res) => {
        if (this.props.partnerIn4.id == res.gameState.playerIn4.id) {

            this.state.partnerState = res.gameState;
            if (this.state.partnerState.gameOver && this.state.gameOver) {
                let mess = '';
                if (this.state.partnerState.score > this.state.score)
                    mess = this.state.partnerState.playerIn4.name + ' W I N!';
                else if (this.state.partnerState.score < this.state.score)
                    mess = this.props.playerIn4.name + ' W I N!';
                else
                    mess = ' D R A W!';

                confirmAlert({
                    onClickOutside: () => { },
                    title: 'R E S U L T',
                    message: mess,
                    buttons: [
                        {
                            label: 'Yes',
                            onClick: () => {
                                this.setState({
                                    field: [],
                                    currentFigure: '',
                                    currentFigureId: 0,
                                    currentFigureType: '',
                                    nextFigure: '',
                                    nextFigureId: 0,
                                    nextFigureType: '',
                                    score: 0,
                                    fieldWidth: 10,
                                    fieldHeight: 20,
                                    figures: [],
                                    interval: null,
                                    speed: 150,
                                    defaultSpeed: 150,
                                    fastSpeed: 10,
                                    gameOver: false,
                                    rotate: false,
                                    stepCounter: 0,
                                    pause: false,
                                    loading: false,
                                    connect: false,
                                    partnerState: null,
                                })
                                this.state.connect = false;
                                window.clearInterval(this.state.interval)

                                this.flushField()
                                this.initFigures()
                                this.props.resetFlag();

                            }
                        },
                        {
                            label: 'No',
                            onClick: () => alert('Click No')
                        }
                    ]
                });

            }

        }
        this.setState(this.state);

    }

    flushField() {
        let newField = [];
        for (let i = 0; i < this.state.fieldHeight; i++) {
            newField[i] = [];
            for (let j = 0; j < this.state.fieldWidth; j++) {
                newField[i][j] = '';
            }
        }
        this.setState({ field: newField })
    }

    initFigures() {
        this.setState({ figures: Figures })
    }

    moveFigure() {
        let freezeFlag = false;
        if (this.state.stepCounter % 3 === 0) {
            if (this.state.currentFigure) {
                if (!this.state.nextFigure) {
                    let randomFigure = this.state.figures[Math.floor(Math.random() * this.state.figures.length)]
                    this.setState({
                        nextFigure: randomFigure.path,
                        nextFigureId: randomFigure.id,
                        nextFigureType: randomFigure.type,
                        keyDown:false,
                    })
                    if (this.state.speed !== this.state.defaultSpeed) {
                        this.setState({
                            speed: this.state.defaultSpeed
                        })
                        window.clearInterval(this.state.interval)
                        this.loop();
                        // window.setTimeout(() => this.loop(), this.state.speed)
                        return
                    }
                }
                this.state.field.map((row, rowIndex) => {
                    row.map((cell, cellIndex) => {
                        this.state.currentFigure.map(item => {
                            if ((cell === 'fill' && (item[0] === cellIndex && item[1] + 1 === rowIndex)) || item[1] + 1 === this.state.field.length) {
                                freezeFlag = true;

                            }
                        })
                    })
                })
                if (!freezeFlag) {
                    let stepFigure = this.state.currentFigure.map((item) => {
                        return [item[0], item[1] + 1]
                    })
                    this.setState({
                        currentFigure: stepFigure
                    })
                } else {
                    this.setState({
                        currentFigure: this.state.nextFigure,
                        currentFigureId: this.state.nextFigureId,
                        currentFigureType: this.state.nextFigureType,
                        field: this.state.field.map((row) => row.map((cell) => cell === 'active' ? 'fill' : cell))
                    });
                    this.setState({
                        nextFigure: '',
                        nextFigureId: 0,
                        nextFigureType: ''
                    })
                }
            } else {
                let randomFigure = this.state.figures[Math.floor(Math.random() * this.state.figures.length)]

                this.setState({
                    currentFigure: randomFigure.path,
                    currentFigureId: randomFigure.id,
                    currentFigureType: randomFigure.type,
                    keyDown:false,
                })
            }
        }
        if (this.state.rotate) {
            this.rotateFigure()
        }
        this.updateField()
    }

    moveLeft(e) {
        if (e.keyCode !== 37 || !this.state.currentFigure || this.state.pause) {
            return null
        }
        let canBeShifted = true;
        this.state.currentFigure.map(item => {
            if (!(item[0] - 1 >= 0) || this.state.field[item[1]][item[0] - 1] === 'fill') {
                canBeShifted = false;
            }
        })
        if (canBeShifted) {
            this.setState({
                currentFigure: this.state.currentFigure.map(item => [item[0] - 1, item[1]])
            })
            this.updateField()
        }
    }

    pause(e) {
        if (e.keyCode !== 80 || !this.state.currentFigure) {
            return null
        }
        this.setState({ pause: true });
        window.clearInterval(this.state.interval)

    }
    resume(e) {
        if (e.keyCode !== 82 || !this.state.currentFigure) {
            return null
        }
        this.setState({ pause: false });
        this.loop();
    }

    moveRight(e) {
        if (e.keyCode !== 39 || !this.state.currentFigure || this.state.pause) {
            return null
        }
        let canBeShifted = true;
        this.state.currentFigure.map(item => {
            if (!(item[0] + 1 < this.state.fieldWidth) || this.state.field[item[1]][item[0] + 1] === 'fill') {
                canBeShifted = false;
            }
        })
        if (canBeShifted) {
            this.setState({
                currentFigure: this.state.currentFigure.map(item => [item[0] + 1, item[1]])
            })
            this.updateField()
        }
    }

    moveDown(e) {
        if (e.keyCode !== 40 || !this.state.currentFigure || this.state.pause) {
            return null
        }
        // alert(111);
        if(!this.state.keyDown){
            this.setState({
                keyDown:true,
                speed: this.state.fastSpeed
            })
            window.clearInterval(this.state.interval)
            this.loop()
        }
        
    }

    rotate(e) {
        if (e.keyCode !== 38 || !this.state.currentFigure || this.state.pause) {
            return null
        }
        this.setState({
            rotate: true
        })
    }

    rotateFigure() {
        let defaultPath = Figures.find(figure => (figure.type === this.state.currentFigureType && figure.id === this.state.currentFigureId)).path
        let offsetLeft = this.state.currentFigure[0][0] - defaultPath[0][0]
        let offsetTop = this.state.currentFigure[0][1] - defaultPath[0][1]
        let next = Object.assign({}, Figures.find(figure => (figure.type === this.state.currentFigureType && figure.id === this.state.currentFigureId + 1)))
        if (!next.hasOwnProperty('id')) {
            next = Object.assign({}, Figures.find(figure => (figure.type === this.state.currentFigureType && figure.id === 1)))
        }
        let canBeShifted = true;
        next.path = next.path.map(item => [item[0] + offsetLeft, item[1] + offsetTop])
        next.path.map(item => {
            if (!(item[0] >= 0) || !(item[0] < this.state.fieldWidth) || this.state.field[item[1]][item[0]] === 'fill' || this.state.field[item[1]][item[0]] === 'fill') {
                canBeShifted = false;
            }
        })
        if (next && canBeShifted) {
            this.setState({
                currentFigure: next.path,
                currentFigureId: next.id,
                currentFigureType: next.type
            })
        }
    }

    updateField() {     //update Field View (reRender)
        let activeField = this.state.field.map(row => {
            return row.map(
                cell => cell === 'active' ? '' : cell
            )
        })
        this.state.currentFigure.map(item => {
            if (activeField[item[1]][item[0]] !== 'fill') {
                activeField[item[1]][item[0]] = 'active'
            } else {
                this.finish()
            }
        })
        this.setState({
            field: activeField,
            rotate: false,
            stepCounter: this.state.stepCounter + 1
        })
    }

    finish = () => {
        window.clearInterval(this.state.interval)

        if (this.state.partnerState.gameOver) {
            let mess = '';
            if (this.state.partnerState.score > this.state.score)
                mess = this.state.partnerState.playerIn4.name + ' W I N!';
            else if (this.state.partnerState.score < this.state.score)
                mess = this.props.playerIn4.name + ' W I N!';
            else
                mess = ' D R A W!';

            confirmAlert({
                title: 'R E S U L T',
                message: mess,
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => {
                            this.setState({
                                field: [],
                                currentFigure: '',
                                currentFigureId: 0,
                                currentFigureType: '',
                                nextFigure: '',
                                nextFigureId: 0,
                                nextFigureType: '',
                                score: 0,
                                fieldWidth: 10,
                                fieldHeight: 20,
                                figures: [],
                                interval: null,
                                speed: 150,
                                defaultSpeed: 150,
                                fastSpeed: 10,
                                gameOver: false,
                                rotate: false,
                                stepCounter: 0,
                                pause: false,
                                loading: false,
                                connect: false,
                                partnerState: null,
                            })
                            this.state.connect = false;

                            this.flushField()
                            this.initFigures()
                            this.props.resetFlag();
                        }
                    },
                    {
                        label: 'No',
                        onClick: () => alert('Click No')
                    }
                ],

            });


        }
        this.setState({
            gameOver: true
        })
    }

    flushRows() {
        let fullRows = []
        this.state.field.map((row, rowIndex) => {
            if (row.indexOf('') === -1 && row.indexOf('active') === -1) {
                fullRows.push(rowIndex)
            }
        });
        if (fullRows.length) {
            let field = this.state.field;
            fullRows.forEach(row => {
                for (let i = row; i > 0; i--) {
                    for (let j = 0; j < this.state.fieldWidth; j++) {
                        if (field[i][j] !== 'active' && field[i - 1][j] !== 'active') {
                            field[i][j] = field[i - 1][j]
                        }
                    }
                }
            })
            this.setState({
                score: this.state.score + fullRows.length * fullRows.length,    //score calculation formula
                field: field
            })
        }
    }

    loop() {
        if (!this.state.pause && this.state.connect)
            this.setState({
                interval: window.setInterval(() => {        //set Delay Speed
                    this.moveFigure()
                    this.flushRows()
                    this.props.socket.emit("updateGameStateFrom", {
                        field: this.state.field,
                        gameOver: this.state.gameOver,
                        score: this.state.score,
                        nextFigure: this.state.nextFigure,
                        fieldWidth: this.state.fieldWidth,
                        roomKey: this.props.roomKey,
                        playerIn4: this.props.playerIn4,
                    });
                }, this.state.speed)
            })
    }

    render() {

        return (
            <div>
                <div className="wrapper">
                    <div className="field">
                        {this.state.field.map((row, i) =>
                            <Row key={i} row={row} />
                        )}
                    </div>
                    <div className="aside">
                        <div className="status">{this.state.gameOver ? 'Game over' : ''}</div>
                        <div className="score">{this.state.score}</div>
                        <Next figure={this.state.nextFigure} shift={this.state.fieldWidth / 2 - 2} />
                        <div className="score">{this.props.playerIn4.name}</div>

                    </div>
                </div>

                {
                    this.state.connect && this.state.partnerState ?
                        <div className="wrapper">
                            <div className="field">
                                {this.state.partnerState.field.map((row, i) =>
                                    <Row key={i} row={row} />
                                )}
                            </div>
                            <div className="aside">
                                <div className="status">{this.state.partnerState.gameOver ? 'Game over' : ''}</div>
                                <div className="score">{this.state.partnerState.score}</div>
                                <Next figure={this.state.partnerState.nextFigure} shift={this.state.partnerState.fieldWidth / 2 - 2} />
                                <div className="score">{this.state.partnerState.playerIn4.name}</div>

                            </div>
                        </div> : null
                }
            </div>
        )
    }
}
