import { StyleSheet } from 'react-native';

export const styleGoals = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 80,
    marginTop: -20,
  },
  header: {
    padding: 20,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 150, 
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  newGoalButton: {
    backgroundColor: '#a020f0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
  },
  newGoalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  goalsContainer: {
    padding: 20,
  },
  goalItem: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f1f1f1',
    elevation: 3,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  goalName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  goalTarget: {
    fontSize: 14,
    color: '#666',
  },
  progressBar: {
    height: 10,
    marginBottom: 8,
  },
  goalAmount: {
    fontSize: 16,
    color: '#333',
  },
  goalPercentage: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});

export const styleNavigation = StyleSheet.create({
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f8f8f8',
  },
});
