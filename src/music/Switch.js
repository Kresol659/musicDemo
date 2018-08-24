import React from 'react';
import Switch from '@material-ui/core/Switch';

class Switches extends React.Component {
    state = {
        checkedA: true,
        checkedB: true,
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    render() {
        return (
            <Switch
                checked={this.state.checkedB}
                onChange={this.handleChange('checkedB')}
                value="checkedB"
                color="primary"
                style={{ height: '.5rem' }}
            />
        );
    }
}

export default Switches;