import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ListRenderItem,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {deleteToDo, toggleTodoStatus} from '../Redux/TodoSlice';
import {RootState, AppDispatch} from '../Redux/store';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type Props = {
  navigation: NativeStackNavigationProp<any, any>;
};

type Todo = {
  id: number;
  title: string;
  status: boolean;
};

export default function Homescreen(props: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const {todoList} = useSelector((state: RootState) => state.todo);

  const handleAddBtnClick = () => {
    props.navigation.navigate('Addtask');
  };

  const handleCheckboxClick = (id: number) => {
    dispatch(toggleTodoStatus({id}));
  };

  const handleDeleteClick = (id: number) => {
    dispatch(deleteToDo({id}));
  };

  const renderTodoList: ListRenderItem<Todo> = ({item}) => {
    return (
      <View style={styles.itemView}>
        <View>
          <Text style={styles.titleText}>{item.title}</Text>
          <Text
            style={[styles.text, {color: item.status ? 'green' : 'orange'}]}>
            {item.status ? 'completed' : 'pending'}
          </Text>
        </View>
        <View style={styles.rowView}>
          <TouchableOpacity
            style={styles.checkBoxView}
            onPress={() => handleCheckboxClick(item.id)}>
            {item.status && <Text>{'✓'}</Text>}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDeleteClick(item.id)}>
            <Image
              source={require('../Images/download.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.roundBtn} onPress={handleAddBtnClick}>
        <Text style={styles.text}>{'+ AddTask'}</Text>
      </TouchableOpacity>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{marginTop: hp(1)}}
        data={todoList}
        keyExtractor={item => item.id.toString()}
        renderItem={renderTodoList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(2),
    paddingVertical: hp(2),
  },
  roundBtn: {
    borderRadius: 10,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
  },
  titleText: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
    width: wp(70),
  },
  itemView: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0.5,
    borderColor: '#000000',
    borderRadius: 10,
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    marginTop: hp(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkBoxView: {
    height: hp(2),
    width: hp(2),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000000',
    marginRight: wp(4),
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    height: hp(3),
    width: hp(3),
  },
});
