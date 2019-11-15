import React from 'react';
import './Loading.css';

export default class Loading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }

    render() {
        const styles = {
            body: {
                width: '100%',
                textAlign: 'center',

            },
            body2: {
                // width: '100%',
                textAlign: 'center',
                transform: 'scale(0.3)',

            },
        }
        return (
            // <div style={this.props.loading?styles.body2:styles.body}>
            <div style={styles.body}>
                <div className="orbit-spinner">
                    <div className="orbit"></div>
                    <div className="orbit"></div>
                    <div className="orbit"></div>
                </div>
            </div>
        )
    }
}

