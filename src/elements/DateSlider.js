import React, { Component } from 'react';
import {
    View,
    FlatList,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';
import { COLOR_YELLOW } from '../styles/common';

class DateSlider extends Component {
    constructor(props) {
        super(props);
    
        this.state = { 
          chosenDate: ''
        }
    
        this.formatDateForRequest = this.formatDateForRequest.bind(this);
        this.getListOfDates = this.getListOfDates.bind(this);
        this.changeDate = this.changeDate.bind(this);
    }

    componentDidMount() {
        //let today = new Date();
        let today = "2018-06-10";
        this.props.request(this.props.authToken, today);
    
        this.setState({
          chosenDate: today,
        })
    }

    getListOfDates(){
        let month = new Array();
        month[0] = "Jan";
        month[1] = "Feb";
        month[2] = "Mar";
        month[3] = "Apr";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "Aug";
        month[8] = "Sept";
        month[9] = "Oct";
        month[10] = "Nov";
        month[11] = "Dec";

        let weekday = new Array();
        weekday[0] =  "SUN";
        weekday[1] = "MON";
        weekday[2] = "TUE";
        weekday[3] = "WED";
        weekday[4] = "THU";
        weekday[5] = "FRY";
        weekday[6] = "SAT";

        let listOfDates = [
            {
                formattedDate:"2018-06-10",
                day:"SUN",
                date: "June 10"
            }
        ];

        // Get a list of 30 dates from startDate
        // for (let i = 0; i <= 30; i++) {
        // const dateObj = {};

        // const date = new Date();
        // date.setDate(date.getDate() + i);

        // dateObj.formattedDate = "2018-06-10";
        // dateObj.day = weekday[date.getDay()];
        // dateObj.date = month[date.getMonth()] + ' ' + date.getDate();

        // listOfDates.push(dateObj);
        // }

        return listOfDates;
    }
    
    formatDateForRequest(date) {
        let dd = date.getDate();
        let mm = date.getMonth() + 1;
        const yyyy = date.getFullYear();
    
        if (dd < 10) {
          dd = '0' + dd
        }
    
        if (mm < 10) {
          mm = '0' + mm
        }
    
        return yyyy + "-" + mm + "-" + dd;
    }

    changeDate(newDate) {
        this.setState({
            chosenDate: newDate.formattedDate,
        });

        this.props.request(this.props.authToken, newDate.formattedDate);
    }
  
    render() {
        return(
            <View style={styles.datesContainer}>
            <FlatList
              contentContainerStyle={styles.horizontalListView}
              horizontal={true}
              data={this.getListOfDates()}
              keyExtractor={item=>item.date.toString()}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => {
                return (
                  <View style={styles.horizontalListItem}>
                    <TouchableOpacity onPress={()=>{this.changeDate(item)}} style={styles.horizontalTouch}>       
                      <Text style={item.formattedDate == this.state.chosenDate ? styles.horizontalListTextDayAlt : styles.horizontalListTextDay}>{item.day}</Text>
                      <Text style={item.formattedDate == this.state.chosenDate ? styles.horizontalListTextDateAlt : styles.horizontalListTextDate}>{item.date}</Text>
                    </TouchableOpacity>
                  </View>
                  );
              }}/>
            </View>
        );
    }
}

export default DateSlider;


const styles = StyleSheet.create({
    datesContainer: {
        height: 70,
    },
    horizontalListView: {
        paddingTop: 13,
    },
    horizontalListItem: {
        width: 72,
        marginRight: 16
    },
    horizontalListTextDay: {
        color: "#586475",
        fontSize: 9
    },
    horizontalListTextDate: {
        color: "#586475",
        fontSize: 20
    },
    horizontalListTextDayAlt: {
        color: COLOR_YELLOW,
        fontSize: 9,
    },
    horizontalListTextDateAlt: {
        color: COLOR_YELLOW,
        fontSize: 20,
        textDecorationLine: "underline"
    },
    horizontalTouch: {
        alignItems: "center"
    },
});
