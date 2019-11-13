import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import propTypes from 'prop-types';
import style from '../ClassCss/MainScreen.css';

import Matrix from './Matrix';
import Decorate from './Decorate';
import Number from './Number';
import Next from './Next';
import Music from './Music';
import Pause from './Pause';
import Point from './Point';
import Logo from './Logo';
import Keyboard from './Keyboard';
import Guide from './Guide';

// import { transform, lastRecord, speeds, i18n, lan } from '../Assistance/const';
import { visibilityChangeEvent, isFocus } from '../Assistance/';
import states from '../control/states';

var transform = require('../Assistance/const').transform;
var lastRecord = require('../Assistance/const').lastRecord;
var speeds = require('../Assistance/const').speeds;
var i18n = require('../Assistance/const').i18n;
var lan = require('../Assistance/const').lan;



class App extends React.Component {
  constructor() {
    super();
    this.state = {
      w: document.documentElement.clientWidth,
      h: document.documentElement.clientHeight,
    };
  }
  componentWillMount() {
    window.addEventListener('resize', this.resize.bind(this), true);
    console.log(style);
  }
  componentDidMount() {
    if (visibilityChangeEvent) { 
      document.addEventListener(visibilityChangeEvent, () => {
        states.focus(isFocus());
      }, false);
    }

    if (lastRecord) { 
      if (lastRecord.cur && !lastRecord.pause) { 
        const speedRun = this.props.speedRun;
        let timeout = speeds[speedRun - 1] / 2; 
        
        timeout = speedRun < speeds[speeds.length - 1] ? speeds[speeds.length - 1] : speedRun;
        states.auto(timeout);
      }
      if (!lastRecord.cur) {
        states.overStart();
      }
    } else {
      states.overStart();
    }
  }
  resize() {
    this.setState({
      w: document.documentElement.clientWidth,
      h: document.documentElement.clientHeight,
    });
  }
  render() {
    let filling = 0;
    const size = (() => {
      const w = this.state.w;
      const h = this.state.h;
      const ratio = h / w;
      let scale;
      let css = {};
      if (ratio < 1.5) {
        scale = h / 960;
      } else {
        scale = w / 640;
        filling = (h - (960 * scale)) / scale / 3;
        css = {
          paddingTop: Math.floor(filling) + 42,
          paddingBottom: Math.floor(filling),
          marginTop: Math.floor(-480 - (filling * 1.5)),
        };
      }
      css[transform] = `scale(${scale})`;
      return css;
    })();

    return (
      <div
        className="app"
        style={size}
      >
        <div className={classnames({ [style.rect]: true, [style.drop]: this.props.drop })}>
          <Decorate />
          <div className={style.screen}>
            <div className={style.panel}>
              <Matrix
                matrix={this.props.matrix}
                cur={this.props.cur}
                reset={this.props.reset}
              />
              <Logo cur={!!this.props.cur} reset={this.props.reset} />
              <div className={style.state}>
                <Point cur={!!this.props.cur} point={this.props.points} max={this.props.max} />
                <p>{ this.props.cur ? i18n.cleans[lan] : i18n.startLine[lan] }</p>
                <Number number={this.props.cur ? this.props.clearLines : this.props.startLines} />
                <p>{i18n.level[lan]}</p>
                <Number
                  number={this.props.cur ? this.props.speedRun : this.props.speedStart}
                  length={1}
                />
                <p>{i18n.next[lan]}</p>
                <Next data={this.props.next} />
                <div className={style.bottom}>
                  <Music data={this.props.music} />
                  <Pause data={this.props.pause} />
                  <Number time />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Keyboard filling={filling} keyboard={this.props.keyboard} />
        <Guide />
      </div>
    );
  }
}

App.propTypes = {
  music: propTypes.bool.isRequired,
  pause: propTypes.bool.isRequired,
  matrix: propTypes.object.isRequired,
  next: propTypes.string.isRequired,
  cur: propTypes.object,
  dispatch: propTypes.func.isRequired,
  speedStart: propTypes.number.isRequired,
  speedRun: propTypes.number.isRequired,
  startLines: propTypes.number.isRequired,
  clearLines: propTypes.number.isRequired,
  points: propTypes.number.isRequired,
  max: propTypes.number.isRequired,
  reset: propTypes.bool.isRequired,
  drop: propTypes.bool.isRequired,
  keyboard: propTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  pause: state.get('pause'),
  music: state.get('music'),
  matrix: state.get('matrix'),
  next: state.get('next'),
  cur: state.get('cur'),
  speedStart: state.get('speedStart'),
  speedRun: state.get('speedRun'),
  startLines: state.get('startLines'),
  clearLines: state.get('clearLines'),
  points: state.get('points'),
  max: state.get('max'),
  reset: state.get('reset'),
  drop: state.get('drop'),
  keyboard: state.get('keyboard'),
});

export default connect(mapStateToProps)(App);
