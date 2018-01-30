import React from 'react'
import observer from 'node-observer'
import IdleTimer from 'react-idle-timer';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {ping} from './../api';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';

class SessionTimeOutObserver extends React.Component {

        constructor(props) {
              super(props);
              this.state = {
                loading:false,
                sessionWillExpireWaningDisplayed : false,
                sessionExpiredWaningDisplayed : false,
                sessionExtended : false,
                sessionExpiryPeriodInMinutes : props.sessionExpiryPeriodInMinutes,
                jsTimerIntervalInMilliseconds : 15000,
              }
        }

        componentDidMount() {
          console.log( 'sessionExpiryPeriodInMinutes : ' + this.state.sessionExpiryPeriodInMinutes );
              observer.subscribe('send-last-access-ts', "send-last-access-ts", function(who, data) {
                this.setState((prevState, props) => ({
                  lastAccessTS : data.lastAccessTS
                }))
              }.bind(this))

              this.callSessionTimeoutOrchestrator();
        }


      _onActive = () => {
      }

      callSessionTimeoutOrchestrator = () => {
         window.setTimeout( this.callSessionTimeoutOrchestrator, this.state.jsTimerIntervalInMilliseconds );
         var sessionExpiryPeriodInSeconds = this.state.sessionExpiryPeriodInMinutes*60;
         var sessionExpiryWarningAppearTimeInSeconds = (sessionExpiryPeriodInSeconds*84)/100;

         var showSessionExpiredMessage = this.findIfTimeExcededTheLimit( this.state.lastAccessTS , sessionExpiryPeriodInSeconds );
         var showSessionGoingToExpireSoonMessage = this.findIfTimeExcededTheLimit( this.state.lastAccessTS , sessionExpiryWarningAppearTimeInSeconds );

         if (showSessionExpiredMessage) {
              this.showSessionExpiredWarning ();
         } else if (showSessionGoingToExpireSoonMessage) {
              this.showSessionWillExpireWarning ();
         }
      }


      findIfTimeExcededTheLimit = (suppliedDate, limitSeconds) => {

          console.log( "suppliedDate "+ suppliedDate);

          if(suppliedDate == null || suppliedDate == undefined){
            return false;
          }

          var nowMS = new Date().getTime();
          var suppliedDateMS = suppliedDate.getTime();

          if( (nowMS - suppliedDateMS)/1000 > limitSeconds ) {
              console.log( "findIfTimeExcededTheLimit : true");
              return true;
          }

          console.log( "findIfTimeExcededTheLimit : false");
          return false;
      }



      showSessionWillExpireWarning = () => {

           var timeExceededLimit = this.findIfTimeExcededTheLimit( this.state.lastAccessTS , 15 );

           if(timeExceededLimit && this.state.sessionExpired != true) {
                   console.log('Session will expire');
                   this.setState({open: true, sessionExpriyDialogTitle : 'Your session is about to expire soon', sessionExpiryDialogStyle : {'backgroundColor' : 'none', 'height':'100', 'border' : '2em','text-align': 'center'} , sessionExpiryMessageTxt : 'Your browser session is to expire soon due to inactivity. Please choose to stay signed in or to logout . Otherwise, you will be logged out automatically.' , button : {margin: 12 } } );
                   this.setState({actions :  [

                      <FlatButton
                         label="Log Out"
                         primary={true}
                         onClick={this.handleExpiredSession} /> ,
                       <RaisedButton
                         label="Stay Logged In"
                         labelPosition="before"
                         primary={true}
                         keyboardFocused={true}
                         onClick={this.handleContinueWithSession}
                         style={this.state.button} />
                                                 ]
                       });
             }
      }


      showSessionExpiredWarning = () => {

             var timeExceededLimit = this.findIfTimeExcededTheLimit( this.state.lastAccessTS , 30);

             if(timeExceededLimit && this.state.sessionExpired != true) {
                     console.log('Session expired');
                     this.setState({open: true, sessionExpriyDialogTitle : 'Your session has expired', sessionExpiryDialogStyle : {'backgroundColor' : '#cac8c8','height':'100', 'border' : '2em', 'text-align': 'center'}, sessionExpiryMessageTxt : 'Please login again to use the system ', sessionExpired : true});
                     this.setState({actions :  [     <FlatButton
                                                       label="Login"
                                                       primary={true}
                                                       keyboardFocused={true}
                                                       onClick={this.handleExpiredSession}
                                                     />
                                                ]
                         });
             }
       }


       handleContinueWithSession = () => {
             this.setState({open: false});
             ping();
             //make a rest service call to the server to keep the session active.
             console.log('handle continue with the current session');
       };

       handleExpiredSession = () => {
             this.setState({open: false});
             //redirect to login page
             console.log('handle expired session');
             window.location.href = '/auth/faces/logout/'
       };

       handleClose = () => {
            this.setState({open: false, sessionExpired : false});
            console.log('handle close');
       }

  render() {

    const loading = this.props.loading || this.state.loading

    return (
      <div>

            <Dialog
              title={this.state.sessionExpriyDialogTitle}
              actions={this.state.actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}>

                <Paper>

                 <div style= {this.state.sessionExpiryDialogStyle} >
                     {this.state.sessionExpiryMessageTxt}
                 </div>

                </Paper>
            </Dialog>



      </div>
    )
  }
}

export default SessionTimeOutObserver
