import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
});

class ControlledExpansionPanels extends React.Component {
    constructor(p) {
        super(p);
        this.state={
            info:{
                uname:'xxxxxxxxx',
                email:'xxxxxxxxx'
            }
        }
    }
    state = {
        expanded: null,
    };

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    render() {
        const { classes } = this.props;
        const { expanded } = this.state;

        return (
            <div className={classes.root}>
                <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>帐号设置</Typography>
                        <Typography className={classes.secondaryHeading}></Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>

                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>个人资料</Typography>
                        <Typography className={classes.secondaryHeading}>

                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            <span style={{display:'block', width: '17rem', padding: '1rem', borderBottom: '.05rem solid #d2dbda' }}>
                                <span>名字</span>
                                <span style={{marginLeft:'2rem'}}>{this.state.info.uname}</span>
                            </span>
                            <span style={{ display:'block',width: '17rem', padding: '1rem', borderBottom: '.05rem solid #d2dbda' }}>
                                <span>手机</span>
                                <span style={{marginLeft:'2rem'}}>15888888888</span>
                            </span>
                            <span style={{ display:'block',width: '17rem', padding: '1rem', borderBottom: '.05rem solid #d2dbda' }}>
                                <span>邮箱</span>
                                <span style={{marginLeft:'2rem'}}>{this.state.info.email}</span>
                            </span>
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>会员中心</Typography>
                        <Typography className={classes.secondaryHeading}>

                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>

                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={expanded === 'panel4'} onChange={this.handleChange('panel4')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>商城</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>

                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
    componentWillMount(){
        if(this.props.info){
            this.setState({
                info:this.props.info
            })
        }
    }
}

ControlledExpansionPanels.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlledExpansionPanels);