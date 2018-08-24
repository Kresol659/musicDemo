import React from 'react';

class ToMain extends React.Component {
    constructor(p) {
        super(p)
    }
    render() {

        return (
            <div>
            </div>
        );
    }
    componentWillMount() {
        this.props.history.push('/main/index')
    }

}



export default ToMain;