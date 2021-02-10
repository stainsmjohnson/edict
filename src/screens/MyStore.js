import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, View, Dimensions, FlatList } from 'react-native';
import {
  Button,
  Caption,
  Card,
  FAB,
  Headline,
  List,
  Text,
  TouchableRipple,
  useTheme,
  TextInput,
  RadioButton,
  Subheading,
  Avatar,
} from 'react-native-paper';
import { insert, getAll } from '../database/db';
import StoreController from '../controllers/store';
import SectionController from '../controllers/section';
import ItemController from '../controllers/item';
import Modal from '../components/Modal';
import { useDispatch, useSelector } from 'react-redux';

const MEASUREMENTS = [
  { label: 'kilogram', value: 'kg' },
  { label: 'litter', value: 'l' },
  { label: 'gram', value: 'g' },
];

const { width, height } = Dimensions.get('screen');

const StatScreen = () => {
  const [fabsVisible, setFabsVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [sectionModalVisible, setSectionModalVisible] = useState(false);
  const [itemModalVisible, setItemModalVisible] = useState(false);
  const [activeStore, setActiveStore] = useState(null);

  const [availableStores, setAvailableStores] = useState([]);
  const authState = useSelector(state => state.auth);
  //newstore
  const [storename, setStorename] = useState('');
  //section
  const [sectionTitle, setSectionTitle] = useState('');
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedSections, setSelectedSections] = useState(null);

  const [selectedMeasurement, setSelectedMeasurement] = useState(
    MEASUREMENTS[0],
  );

  const [availableSections, setAvailableSections] = useState([]);

  //item modal
  const [modalItemName, setModalItemName] = useState('');
  const [modalItemCost, setModalItemCost] = useState('');
  const [modalItemImage, setModalItemImage] = useState('');
  const [storeChangeModalVisible, setStoreChangeModalVisible] = useState(false);

  const theme = useTheme();

  const changeStore = async () => {
    try {
      const allStores = await StoreController.getAll(authState?.user_id);
      console.log(JSON.stringify(allStores));
      setAvailableStores(allStores);
      let activeStore = allStores.find(store => store.isActive === true);
      if (!activeStore) {
        activeStore = allStores?.length ? allStores[0] : null;
      }
      setActiveStore(activeStore);
      getAllSections(activeStore?.id);
    } catch (err) {
      console.log(err.message);
    }
  };

  const createSection = async () => {
    try {
      const newsection = await SectionController.create({
        title: sectionTitle,
        store_id: selectedSection.id,
      });
      console.log(newsection);
    } catch (err) {
      console.log(err.message);
    }
  };

  const createStore = async () => {
    try {
      const newstore = await StoreController.create({
        name: storename,
        user_id: authState?.user_id,
      });
      console.log(newstore);
    } catch (err) {
      console.log(err.message);
    }
  };

  const createItem = async () => {
    try {
      const newItem = await ItemController.create({
        name: modalItemName,
        cost: Number(modalItemCost),
        image: modalItemImage,
        measurementIn: selectedMeasurement?.value,
        section_id: selectedSections?.id,
      });
      console.log(newItem);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getAllSections = async id => {
    try {
      const allSections = await SectionController.getAll(id);
      console.log(allSections, 'all sections', id);
      setAvailableSections(allSections);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    changeStore();
  }, []);

  const sections = [
    {
      id: 1,
      title: 'Fav',
      items: [
        {
          name: 'tomato',
          cose: 20,
        },
      ],
    },
    {
      id: 2,
      title: 'Most Recent',
      items: [],
    },
    {
      id: 3,
      title: 'Veg',
      items: [],
    },
    {
      id: 4,
      title: 'Fruit',
      items: [],
    },
  ];
  return (
    <View
      style={{
        flex: 1,
      }}>
      <List.Item
        title="Active Store"
        description="uppatty"
        left={props => <List.Icon {...props} icon="store" />}
        onPress={() => {
          changeStore();
          setStoreChangeModalVisible(true);
        }}
      />

      <List.AccordionGroup>
        <FlatList
          data={availableSections}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <List.Accordion title={item.title} id={item.id}>
              {item.items.map(item => (
                <List.Item
                  key={item.id.toString()}
                  title={item.name}
                  description={item.cost}
                  left={props => (
                    <Avatar.Image
                      {...props}
                      source={{ uri: item.image }}
                      size={40}
                    />
                  )}
                  onPress={() => alert('Under dev')}
                />
              ))}
            </List.Accordion>
          )}
        />
      </List.AccordionGroup>

      <View style={styles.fabGroup}>
        <FAB
          small
          // color={theme.colors.primary}
          visible={fabsVisible}
          icon="file"
          onPress={() => setItemModalVisible(true)}
          style={styles.fab}
        />
        <FAB
          small
          // color={theme.colors.primary}
          visible={fabsVisible}
          icon="folder-plus"
          onPress={() => setSectionModalVisible(true)}
          style={styles.fab}
        />
        <FAB
          small
          // color={theme.colors.primary}
          visible={fabsVisible}
          icon="store"
          onPress={() => setModalVisible(true)}
          style={styles.fab}
        />
        <FAB
          // color={theme.colors.primary}
          icon="plus"
          onPress={() => setFabsVisible(pre => !pre)}
          style={styles.fab}
        />
      </View>

      {/* STORE MODAL */}
      <Modal onDismiss={() => setModalVisible(false)} visible={modalVisible}>
        <View
          style={{
            width: width - 20,
            justifyContent: 'center',
            alignItems: 'stretch',
            backgroundColor: theme.colors.background,
            padding: 16,
            borderWidth: 1,
            borderColor: theme.colors.border,
            borderRadius: 10,
          }}>
          <Headline
            style={{
              marginBottom: 16,
            }}>
            Create Store
          </Headline>
          <View style={{ width: '100%' }}>
            <TextInput
              label="store name"
              value={storename}
              onChangeText={setStorename}
              style={{
                marginBottom: 16,
              }}
            />
            <Button onPress={createStore} mode="contained">
              Create Store
            </Button>
          </View>
        </View>
      </Modal>
      {/* SECTION MODAL */}
      <Modal
        onDismiss={() => setSectionModalVisible(false)}
        visible={sectionModalVisible}>
        <View
          style={{
            width: width - 20,
            justifyContent: 'center',
            alignItems: 'stretch',
            backgroundColor: theme.colors.background,
            padding: 16,
            borderWidth: 1,
            borderColor: theme.colors.border,
            borderRadius: 10,
          }}>
          <Headline
            style={{
              marginBottom: 16,
            }}>
            Create Section
          </Headline>
          <View style={{ width: '100%' }}>
            <View>
              <Subheading>under which store?</Subheading>
              <RadioButton.Group
                onValueChange={newValue =>
                  setSelectedSection(() =>
                    availableStores.find(item => item.name === newValue),
                  )
                }
                value={selectedSection?.name}>
                {availableStores.map(store => (
                  <View style={styles.radioContainer}>
                    <RadioButton value={store.name} />
                    <Text>{store.name}</Text>
                  </View>
                ))}
              </RadioButton.Group>
            </View>
            <TextInput
              label="section title"
              value={sectionTitle}
              onChangeText={setSectionTitle}
              style={{
                marginBottom: 16,
              }}
            />
            <Button onPress={createSection} mode="contained">
              Create Section
            </Button>
          </View>
        </View>
      </Modal>
      {/* ITEM MODAL */}
      <Modal
        onDismiss={() => setItemModalVisible(false)}
        visible={itemModalVisible}>
        <View
          style={{
            width: width - 20,
            justifyContent: 'center',
            alignItems: 'stretch',
            backgroundColor: theme.colors.background,
            padding: 16,
            borderWidth: 1,
            borderColor: theme.colors.border,
            borderRadius: 10,
          }}>
          <Headline
            style={{
              marginBottom: 16,
            }}>
            Create Item
          </Headline>
          <View style={{ width: '100%' }}>
            <View>
              <Subheading>under which section?</Subheading>
              <RadioButton.Group
                onValueChange={newValue =>
                  setSelectedSections(() =>
                    availableSections.find(item => item.title === newValue),
                  )
                }
                value={selectedSections?.title}>
                {availableSections.map(sec => (
                  <View style={styles.radioContainer}>
                    <RadioButton value={sec.title} />
                    <Text>{sec.title}</Text>
                  </View>
                ))}
              </RadioButton.Group>
            </View>
            <TextInput
              label="Item name"
              value={modalItemName}
              onChangeText={setModalItemName}
              style={{
                marginBottom: 16,
              }}
            />
            <TextInput
              label="Cost"
              value={modalItemCost}
              onChangeText={setModalItemCost}
              keyboardType="number-pad"
              style={{
                marginBottom: 16,
              }}
            />
            <View>
              <Subheading>How will you measure?</Subheading>
              <RadioButton.Group
                onValueChange={newValue =>
                  setSelectedMeasurement(() =>
                    MEASUREMENTS.find(item => item.value === newValue),
                  )
                }
                value={selectedMeasurement?.value}>
                {MEASUREMENTS.map(measurement => (
                  <View style={styles.radioContainer}>
                    <RadioButton value={measurement.value} />
                    <Text>{measurement.label}</Text>
                  </View>
                ))}
              </RadioButton.Group>
            </View>
            <TextInput
              label="Image"
              value={modalItemImage}
              onChangeText={setModalItemImage}
              style={{
                marginBottom: 16,
              }}
            />
            <Button onPress={createItem} mode="contained">
              Create Item
            </Button>
          </View>
        </View>
      </Modal>
      {/* CHANGE STORE MODAL */}
      <Modal
        onDismiss={() => setStoreChangeModalVisible(false)}
        visible={storeChangeModalVisible}>
        <View
          style={{
            width: width - 20,
            justifyContent: 'center',
            alignItems: 'stretch',
            backgroundColor: theme.colors.background,
            padding: 16,
            borderWidth: 1,
            borderColor: theme.colors.border,
            borderRadius: 10,
          }}>
          <Headline
            style={{
              marginBottom: 16,
            }}>
            Select Store
          </Headline>
          <View style={{ width: '100%' }}>
            <RadioButton.Group
              onValueChange={newValue =>
                setSelectedSection(() =>
                  availableStores.find(item => item.name === newValue),
                )
              }
              value={selectedSection?.name}>
              {availableStores.map(store => (
                <View style={styles.radioContainer}>
                  <RadioButton value={store.name} />
                  <Text>{store.name}</Text>
                </View>
              ))}
            </RadioButton.Group>
            <Button onPress={createStore} mode="contained">
              Continue
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default StatScreen;

const styles = StyleSheet.create({
  radioContainer: { flexDirection: 'row', alignItems: 'center' },
  fabGroup: {
    position: 'absolute',
    right: 16,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    margin: 16,
  },
});
