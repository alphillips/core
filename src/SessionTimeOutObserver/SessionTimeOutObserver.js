import React from 'react'
import observer from 'node-observer'
import IdleTimer from 'react-idle-timer';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {ping, getUserInfo} from './../api';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';

class SessionTimeOutObserver extends React.Component {

        constructor(props) {
              super(props);
              this.state = {
                open : false,
                sessionExpired : false,
                auskeyAuthentication : false,
                lastAccessTS : null,
                sessionExpiryPeriodInMinutes : props.sessionExpiryPeriodInMinutes || 37,
                jsTimerIntervalInMilliseconds : 50000
              };

              this.sessionExpired = false;
        }

        componentDidMount() {
          console.log(' getUserInfo ');

              getUserInfo().then (
               data => {
                 //ping will revallidate the session, so no point keeping the 'sessionwillexpiresoon message'
                 this.setState({auskeyAuthentication: data.auskeyAuthentication });
                 console.log(data);
               } );


              observer.subscribe('send-last-access-ts', "send-last-access-ts", function(who, data) {

                  console.log('send-last-access-ts : received event');
                  console.log(data);

                  this.setState((prevState, props) => ({
                    lastAccessTS : data.lastAccessTS
                  }))
              }.bind(this));

              observer.subscribe("error-sender", "error", function(who, data) {

                  console.log('error-sender : received event');
                  console.log(data);

                  if(data && data.indexOf('Your session has timed out')>=0) {
                      console.log('Session expired');
                      this.showSessionExpiredMessage();
                  }
              }.bind(this));

              this.callSessionTimeoutOrchestrator();
        }


      _onActive = () => {
      }

      callSessionTimeoutOrchestrator = () => {
         if(this.sessionExpired != true) {
             window.setTimeout( this.callSessionTimeoutOrchestrator, this.state.jsTimerIntervalInMilliseconds );
             var sessionExpiryPeriodInSeconds = this.state.sessionExpiryPeriodInMinutes*60;
             var sessionExpiryWarningAppearTimeInSeconds = (sessionExpiryPeriodInSeconds*84)/100;

             var showSessionExpiredMessageVar = this.findIfTimeExcededTheLimit( this.state.lastAccessTS , sessionExpiryPeriodInSeconds );
             var showSessionGoingToExpireSoonMessageVar = this.findIfTimeExcededTheLimit( this.state.lastAccessTS , sessionExpiryWarningAppearTimeInSeconds );

             console.log("showSessionGoingToExpireSoonMessageVar - "+ showSessionGoingToExpireSoonMessageVar);
             console.log("showSessionExpiredMessageVar - "+ showSessionExpiredMessageVar);

             if (showSessionExpiredMessageVar) {
                  this.checkIfSessionExpired ();
             } else if (showSessionGoingToExpireSoonMessageVar) {
                  this.showSessionGoingToExpireSoonMessage ();
             }
        }
      }


      findIfTimeExcededTheLimit = (suppliedDate, limitSeconds) => {

          if(suppliedDate == null || suppliedDate == undefined){
              return false;
          }

          var nowMS = new Date().getTime();
          var suppliedDateMS = suppliedDate.getTime();

          if( (nowMS - suppliedDateMS)/1000 > limitSeconds ) {
              return true;
          }

          return false;
      }



      showSessionGoingToExpireSoonMessage = () => {

          // var timeExceededLimit = this.findIfTimeExcededTheLimit( this.state.lastAccessTS , 15 );

           if(this.sessionExpired != true) {
                   console.log('Session will expire');
                   this.setState({open: true,
                                  sessionExpriyDialogTitle : 'Your session is about to time out soon',
                                  sessionExpiryDialogStyle : {'backgroundColor' : 'none', 'height': 100, 'border' : '2em','textAlign': 'center'} ,
                                  sessionExpiryMessageTxt : 'Your browser session is to time out soon due to inactivity. Please choose to stay logged in or to logout . Otherwise, you will be timed out automatically.' ,
                                  button : {margin: 12 } ,
                                  actions :  [
                                                 <FlatButton
                                                   label="Log Out"
                                                   primary={true}
                                                   onClick={this.logout} /> ,
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


      checkIfSessionExpired = () => {
         console.log("checkIfSessionExpired - IN ");
         console.log("this.state.sessionExpired " + this.state.sessionExpired);

             if(this.sessionExpired != true) {
                     ping().then (
                        data => {
                            console.log("ping");
                            console.log(data);
                            //ping will revallidate the session, so no point keeping the 'sessionwillexpiresoon message'
                            this.setState({open: false});
                          }
                        )
             }
       }

       showSessionExpiredMessage = () => {
         console.log("showSessionExpiredMessage - IN ");
         this.sessionExpired = true;
         this.setState({open: true,
                        sessionExpriyDialogTitle : 'Your session has timed out',
                        sessionExpiryDialogStyle : {'backgroundColor' : '#cac8c8','height': 100, 'border' : '2em', 'textAlign': 'center'},
                        sessionExpiryMessageTxt : 'Please login again ',
                        sessionExpired : true,
                        actions : [
                                    <FlatButton
                                       label="Close"
                                       primary={true}
                                       onClick={this.handleClose} /> ,

                                    <RaisedButton
                                       label="Login"
                                       labelPosition="before"
                                       primary={true}
                                       keyboardFocused={true}
                                       onClick={this.handleExpiredSession}
                                       style={this.state.button} />
                                  ]
                     });
       }


       handleContinueWithSession = () => {
             this.setState({open: false});
             ping();
             //make a rest service call to the server to keep the session active.
             console.log('handle continue with the current session');
       };

       logout = () => {
             this.setState({open: false});
             //logout
             console.log('logout');
             window.location.href = '/auth/faces/logout/';
       };


       handleExpiredSession = () => {
             this.setState({open: false});
             //redirect to login page
             console.log('handle expired session');
             window.location.href = '/portal'
       };
/*
       handleClose = () => {
            this.setState({open: false});
            console.log('handle close');
       }
*/

      handleClose = () => {
         console.log('handle close');
           this.setState({ open : false, sessionExpired: false });
           this.sessionExpired = false;
           console.log(this.sessionExpired);
           this.callSessionTimeoutOrchestrator();

      }

  render() {

    return (
      <div>

            <Dialog
              title={this.state.sessionExpriyDialogTitle}
              actions={this.state.actions}
              modal={true}
              open={this.state.open} >
                { !this.state.sessionExpired &&
                  <Paper>

                   <div style= {this.state.sessionExpiryDialogStyle} >
                       {this.state.sessionExpiryMessageTxt}
                   </div>

                  </Paper>
               }
               { this.state.sessionExpired && this.state.auskeyAuthentication &&
                 <div className ="message-container"><div className="uikit-page-alerts uikit-page-alerts--error" role="alert"><div>Your session with the department online services has timed out. But your AUSkey session may still be active. Please click to <a href="#" onClick={this.logout}>terminate your AUSKey session</a> </div></div></div>

               }
               { this.state.sessionExpired && !this.state.auskeyAuthentication &&
                 <div className="message-container"><div className="uikit-page-alerts uikit-page-alerts--error" role="alert"><div>Your session with the department online services has timed out. Please login again.</div></div></div>

               }


            </Dialog>



      </div>
    )
  }
}

export default SessionTimeOutObserver
