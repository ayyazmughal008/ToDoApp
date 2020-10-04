/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList, Text } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import moment from 'moment';
import { Header, Card } from 'react-native-elements'
import Diolag from './Modal'
import { widthPercentageToDP, heightPercentageToDP } from './MakeMeResponsive'

export default class ToDoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      data: [],
      loading: false,
      promptVisible: false
    }
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.showForm = this.showForm.bind(this);
  }

  add = (text) => {
    let notEmpty = text.trim().length > 0;
    if (notEmpty) {
      this.setState(
        prevState => {
          let { data } = prevState;
          return {
            data: data.concat(text),
            text: "",

          };
        }
      );
    }
  }

  remove = (i) => {
    this.setState(
      prevState => {
        let data = prevState.data.slice();
        data.splice(i, 1);
        return { data };
      }
    );

  };
  toggleDialog = () => {
    this.setState({ promptVisible: !this.state.promptVisible })
  }
  showForm = () => {
    this.toggleDialog();
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          leftComponent={{ text: moment().format('MMMM Do YYYY'), style: { color: '#fff' } }}
          centerComponent={{ text: 'TODO APP', style: { color: '#fff' } }}
          rightComponent={{ text: moment().format('dddd'), style: { color: '#fff' } }}
          containerStyle={{
            backgroundColor: '#3D6DCC',
            justifyContent: 'space-around',
          }}
        />
        <FlatList
          data={this.state.data}
          renderItem={({ item, index }) =>
            <Card containerStyle={{
              alignItems: "center",
            }}>
              <View style={{
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                width: widthPercentageToDP(85),
                height: heightPercentageToDP(5)
              }}>
                <Text>
                  {item}
                </Text>
                <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', padding: 5, borderRadius: 5, borderColor: '#32CD32' }}
                  onPress={() => this.remove(index)}>
                  <FontAwesome name="minus" size={10} color='#32CD32' />
                </TouchableOpacity>
              </View>
            </Card>

          }
          keyExtractor={item => item.toString()}
        />
        <View style={styles.bottomView}>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity style={{ backgroundColor: '#3D6DCC', alignItems: 'center', justifyContent: 'center', padding: 20, borderRadius: 100 }}
              onPress={() =>
                this.showForm()
              }>
              <FontAwesome name="plus" size={20} color="#fff" />
            </TouchableOpacity>
          </View >
        </View>
        {this.state.promptVisible &&
          <Diolag
            isDialogOpen={this.state.promptVisible}
            handleMessage={text => this.setState({ text: text })}
            cancelClick={() => this.toggleDialog()}
            okClick={() => {
              this.add(this.state.text);
              this.toggleDialog();
            }}
          />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#edf5f8",
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomView: {
    flex: 1,
    position: "absolute",
    bottom: "2%",
    right: "2%"
  }
});

