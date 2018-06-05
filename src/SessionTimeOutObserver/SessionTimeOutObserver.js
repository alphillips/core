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
                loading:false,
                sessionWillExpireWaningDisplayed : false,
                sessionExpiredWaningDisplayed : false,
                sessionExtended : false,
                sessionExpiryPeriodInMinutes : props.sessionExpiryPeriodInMinutes || 1,
                jsTimerIntervalInMilliseconds : 10000,
              }
        }

        componentDidMount() {

           getUserInfo().then (
             data => {
                 //ping will revallidate the session, so no point keeping the 'sessionwillexpiresoon message'
                 this.setState({auskeyAuthentication: data.auskeyAuthentication });
               } );


              observer.subscribe('send-last-access-ts', "send-last-access-ts", function(who, data) {
                  this.setState((prevState, props) => ({
                    lastAccessTS : data.lastAccessTS
                  }))
              }.bind(this));

              observer.subscribe("error-sender", "error", function(who, data) {
                  if(data && data.indexOf('Your session has timed out')>=0) {
                      this.setState({ sessionExpired : true });
                      console.log('Session expired');
                      this.showSessionExpiredMessage();
                  }
              }.bind(this));

              this.callSessionTimeoutOrchestrator();
        }


      _onActive = () => {
      }

      callSessionTimeoutOrchestrator = () => {
         if(this.state.sessionExpired != true) {
             window.setTimeout( this.callSessionTimeoutOrchestrator, this.state.jsTimerIntervalInMilliseconds );
             var sessionExpiryPeriodInSeconds = this.state.sessionExpiryPeriodInMinutes*60;
             var sessionExpiryWarningAppearTimeInSeconds = (sessionExpiryPeriodInSeconds*84)/100;

             var showSessionExpiredMessage = this.findIfTimeExcededTheLimit( this.state.lastAccessTS , sessionExpiryPeriodInSeconds );
             var showSessionGoingToExpireSoonMessage = this.findIfTimeExcededTheLimit( this.state.lastAccessTS , sessionExpiryWarningAppearTimeInSeconds );

             console.log("showSessionGoingToExpireSoonMessage - "+ showSessionGoingToExpireSoonMessage);
             console.log("showSessionExpiredMessage - "+ showSessionExpiredMessage);

             if (showSessionExpiredMessage) {
                  this.checkIfSessionExpired ();
             } else if (showSessionGoingToExpireSoonMessage) {
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

           if(this.state.sessionExpired != true) {
                   console.log('Session will expire');
                   this.setState({open: true, sessionExpriyDialogTitle : 'Your session is about to time out soon', sessionExpiryDialogStyle : {'backgroundColor' : 'none', 'height':'100', 'border' : '2em','text-align': 'center'} , sessionExpiryMessageTxt : 'Your browser session is to time out soon due to inactivity. Please choose to stay logged in or to logout . Otherwise, you will be timed out automatically.' , button : {margin: 12 } } );
                   this.setState({actions :  [

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

             if(this.state.sessionExpired != true) {
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
         this.setState({open: true, sessionExpriyDialogTitle : 'Your session has timed out', sessionExpiryDialogStyle : {'backgroundColor' : '#cac8c8','height':'100', 'border' : '2em', 'text-align': 'center'}, sessionExpiryMessageTxt : 'Please login again ', sessionExpired : true});

         if( !this.state.auskeyAuthentication){
                              this.setState({actions : [
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
         }else {
                             this.setState({actions : [
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

       handleClose = () => {
            this.setState({open: false});
            console.log('handle close');
       }

  render() {

    const loading = this.props.loading || this.state.loading

    return (
      <div>

            <Dialog
              title={this.state.sessionExpriyDialogTitle}
              actions={this.state.actions}
              modal={true}
              open={this.state.open}   //              onRequestClose={this.handleClose}
               >


                { !this.state.sessionExpired &&
                <Paper>

                 <div style= {this.state.sessionExpiryDialogStyle} >
                     {this.state.sessionExpiryMessageTxt}
                 </div>

                </Paper>
              }
              { this.state.sessionExpired && this.state.auskeyAuthentication &&
                 <div class="message-container"><div class="uikit-page-alerts uikit-page-alerts--error" role="alert"><div>Your session with the department online services has timed out. But your AUSkey session may still be active. Please click to <a href="#" onClick="">terminate your AUSKey session</a> </div></div></div>

              }
              { this.state.sessionExpired && !this.state.auskeyAuthentication &&
                 <div class="message-container"><div class="uikit-page-alerts uikit-page-alerts--error" role="alert"><div>Your session with the department online services has timed out. Please login again.</div></div></div>

              }


            </Dialog>



      </div>
    )
  }
}

export default SessionTimeOutObserver
