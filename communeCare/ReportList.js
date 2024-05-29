import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { firestore } from './firebaseConfig';

const ReportList = ({ navigation }) => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const reportsCollection = collection(firestore, 'Reports');
        const q = query(reportsCollection, orderBy('date', 'desc'));
        const snapshot = await getDocs(q);
        const reportList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReports(reportList);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };
    fetchReports();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Список отчетов</Text>
      <ScrollView>
        {reports.map(report => (
          <View key={report.id} style={styles.reportContainer}>
            <Text style={styles.reportDate}>Дата: {new Date(report.date.seconds * 1000).toLocaleString()}</Text>
            <Text style={styles.reportType}>Тип отчета: {report.type}</Text>
            {report.type === 'Проверка численности' && (
              <View>
                <Text style={styles.reportTitle}>Количество жителей:</Text>
                <Text style={styles.reportText}>{report.count}</Text>
              </View>
            )}
            {report.type === 'Санитарная проверка' && (
              <View>
                <Text style={styles.reportTitle}>Оценки:</Text>
                {Object.keys(report.ratings).map(room => (
                  <Text key={room} style={styles.reportText}>Комната {room}: {report.ratings[room]}</Text>
                ))}
                {report.reasons.length > 0 && (
                  <View>
                    <Text style={styles.reportTitle}>Причины снижения оценок:</Text>
                    {report.reasons.map(reason => (
                      <Text key={reason} style={styles.reportText}>{reason}</Text>
                    ))}
                  </View>
                )}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
      <Button title="Назад к задачам" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default ReportList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  title: {
    fontSize: 24,
    color: 'black',
    marginBottom: 20,
    textAlign: 'center',
  },
  reportContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  reportDate: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reportType: {
    fontSize: 16,
    marginBottom: 10,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  reportText: {
    fontSize: 16,
  },
});
