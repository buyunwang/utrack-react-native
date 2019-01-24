import React, {Component} from 'react';
import { PushNotificationIOS } from 'react-native'
import PushNotification from "react-native-push-notification";

export default class PushController extends Component {
    componentDidMount() {
        PushNotification.configure({
          onNotification: function(notification) {
            console.log("NOTIFICATION:", notification);
            notification.finish(PushNotificationIOS.FetchResult.NoData);
          },
          popInitialNotification: true,
          requestPermissions: true,
        });
    }

    render() {
        return null;
    }
}