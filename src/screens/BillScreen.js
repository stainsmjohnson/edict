import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  RefreshControl,
  FlatList,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Section } from '../components';
import { getData } from '../staticData';
import { useTheme } from 'react-native-paper';
import StoreController from '../controllers/store';
import SectionController from '../controllers/section';

const BillScreen = props => {
  const [Alldata, setAllData] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const dispatch = useDispatch();
  const authState = useSelector(state => state.auth);
  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    const searchValue = props.val;
    if (searchValue === '') {
      // setData(Alldata);
      return;
    }
    let filtered = [];
    for (let i = 0; i < Alldata.length; i++) {
      const filteredItems = Alldata[i].items.filter(item => {
        return item.name.indexOf(searchValue) !== -1;
      });
      if (filteredItems.length > 0) {
        filtered.push({
          ...Alldata[i],
          items: filteredItems,
        });
      }
    }
    setData(filtered);
  }, [props.val]);

  const refresh = async () => {
    setLoading(true);
    await changeStore();
    setLoading(false);
  };

  const changeStore = async () => {
    try {
      const allStores = await StoreController.getAll(authState?.user_id);
      console.log(JSON.stringify(allStores));
      let activeStore = allStores.find(store => store.isActive === true);
      if (!activeStore) {
        activeStore = allStores?.length ? allStores[0] : null;
      }
      getAllSections(activeStore?.id);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getAllSections = async id => {
    try {
      const allSections = await SectionController.getAll(id);
      console.log(allSections, 'all sections', id);
      setData(allSections);
      setAllData(allSections);
    } catch (err) {
      console.log(err.message);
    }
  };

  const onSelect = item => {
    dispatch({
      type: 'add',
      payload: item,
    });
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <FlatList
        keyboardShouldPersistTaps="always"
        style={{ flex: 1 }}
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <Section item={item} onPress={onSelect} />}
        refreshControl={
          <RefreshControl
            enabled={true}
            refreshing={loading}
            onRefresh={() => {
              refresh();
            }}
            colors={[theme.colors.primary, theme.colors.accent]}
            progressBackgroundColor={theme.colors.card}
          />
        }
      />
    </SafeAreaView>
  );
};

export default BillScreen;

const styles = StyleSheet.create({});
