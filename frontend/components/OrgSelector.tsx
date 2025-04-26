import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { API_BASE_URL } from '../utils/config'; 


export const OrgSelector = () => {
  const [selected, setSelected] = useState('All');
  const [cat] = useState<{ OrgAbbr: string; OrgName: string }[]>([
    { OrgAbbr: 'All', OrgName: 'All' },
    { OrgAbbr: 'COCS', OrgName: 'College of Computer Studies' },
    { OrgAbbr: 'AJMA', OrgName: 'Association of Junior Marketing Associates' },
    { OrgAbbr: 'JPIA', OrgName: 'Junior Philippine Institute of Accountants' },
    { OrgAbbr: 'ANSA', OrgName: 'Ateneo Nursing Students Association' },
  ]);


  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const ipAdd = API_BASE_URL;
      try {
        const res = await axios.get(ipAdd + 'orgs');
        const data = res.data;

        const orgs = data.map((i: any) => ({
          OrgAbbr: i.OrgAbbr,
          OrgName: i.OrgName
        }));

        setCat([{ OrgAbbr: 'All', OrgName: 'All' }, ...orgs]); // add "All" manually
      } catch (err) {
        console.log('Fail to retrieve Organizations:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What's New</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {cat.map((item) => (
          <TouchableOpacity
            key={item.OrgAbbr}
            style={[
              styles.chip,
              selected === item.OrgAbbr && styles.selectedChip
            ]}
            onPress={() => {
              setSelected(item.OrgAbbr);
              navigation.navigate('Orgs', {
                orgId: item.OrgAbbr,
                orgAbbr: item.OrgName
              });
            }}
          >
            <Text
              style={[
                styles.chipText,
                selected === item.OrgAbbr && styles.selectedChipText
              ]}
            >
              {item.OrgAbbr}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#002855',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 10,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 20,
    marginRight: 10,
  },
  selectedChip: {
    backgroundColor: '#007AFF',
  },
  chipText: {
    color: '#333',
    fontWeight: '600',
  },
  selectedChipText: {
    color: 'white',
  },
});
