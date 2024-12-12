import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native'
import {useState, React} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const Home = () => {

    const [item, setItem] = useState("");
    const [itemList, setItemList] = useState([]);
    const [editItem, setEditItem] = useState(null);

    //Create
    const handleSubmit = () => {

        if(item === ""){
            return alert("Please fill in the item");
        }
        const newId = itemList.length > 0 ? itemList[itemList.length - 1].id + 1 : 1;

        setItemList([...itemList, {id: newId, name: item}]);
        setItem("");
    }

    // Edit
    const handleEdit = (data) => {
        setEditItem(data);
        setItem(data.name);
    }

    // Update
    const handleUpdate = () => {
       const updated = itemList.map((z) => {
        if(z.id === editItem.id){
            return {    
                ...z,
                name: item}
        }

        return z;
       });

       setItemList(updated);
       setEditItem(null);
       setItem("");
    }

    // Delete
     const handleDelete  = (id) => {
        Alert.alert(
            "Delete Item",
            "Are you sure to delete this item?",
            [
              {
                text: "Cancel"
              },
              { 
                text: "OK",
                onPress: () => {
                    const newList = itemList.filter((item) => item.id !== id);
                    setItemList(newList);
                }
              }
            ]
      );

    }

    // Read
    const renderItem= ({item}) => {
        return (
        <View style={styles.item} >
            <Text style={styles.itemName}>{item.name}</Text>
            <Icon name="pencil" 
            size={20} 
            color="red"
            onPress={()=>handleEdit(item) } />
            <Icon name="trash" 
            size={20} 
            color="red" 
            onPress={()=>handleDelete(item.id) } />
        </View>  
        )
    }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Input Your Item:</Text>
      <TextInput style={styles.textInput} 
        value={item}
        placeholder='Enter Item'
        onChangeText={(text) => setItem(text) }/>
    {
        editItem ? 
            <TouchableOpacity
            style={styles.button}
            onPress={()=>handleUpdate()}>
            <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
            : 
            <TouchableOpacity
            style={styles.button}
            onPress={()=>handleSubmit()}>
            <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
    }
        <FlatList
        data={itemList}
        renderItem={renderItem}
       />
       {itemList.length <= 0  && <Text style={styles.label}>No data found</Text>}
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container:{
        'marginHorizontal': 20
    },
    title:{
        'fontSize': 20,
        'fontWeight': 'bold'
    }, 
    textInput:{
        'marginTop': 10,
        'borderWidth': 1,
        'borderColor': 'black',
        'padding': 15,
        'borderRadius': 10
    },
    button:{
        'backgroundColor': 'black',
        'borderRadius': 5,
        'paddingVertical': 10,
        'marginVertical': 10
    },
    buttonText:{
        'color': 'white',
        'fontSize': 20,
        'textAlign': 'center',
    },
    item:{
        'flexDirection': 'row',
        'backgroundColor': 'white',
        'borderRadius': 5,
        'paddingHorizontal': 10,
        'paddingVertical': 15,
        'marginBottom': 10,
        'borderColor': 'black',
        'borderWidth': 1,
        'alignItems': 'center'
    },
    itemName:{
        'flex': 1,
        'color': 'black',
        'fontSize': 15,
        'fontWeight': '600'
    },
    label:{
        'marginTop': 30,
        'textAlign': 'center',
    }
})