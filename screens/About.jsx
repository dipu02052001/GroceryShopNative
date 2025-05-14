import { ScrollView, StyleSheet } from 'react-native';
import { Text, Divider, List } from 'react-native-paper';

const About = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="titleLarge" style={styles.centered}>
        About Us
      </Text>

      <Text variant="bodyMedium" style={styles.paragraph}>
        Welcome to <Text style={styles.bold}>FreshBasket</Text> — your trusted online grocery destination! We’re
        dedicated to making your grocery shopping easier, faster, and fresher. From farm-fresh vegetables and fruits to
        essential pantry items, we bring the store to your door.
      </Text>

      <Divider style={styles.divider} />

      <Text variant="titleMedium" style={styles.subtitle}>
        Why Shop With Us?
      </Text>

      <List.Section>
        <List.Item title="🚚 Fast & Free Delivery on orders over ₹499" />
        <List.Item title="🥬 Fresh Produce Daily" />
        <List.Item title="🛡️ Quality Guaranteed" />
        <List.Item title="💳 Easy & Secure Payments" />
      </List.Section>

      <Divider style={styles.divider} />

      <Text variant="titleMedium" style={styles.subtitle}>
        Our Mission
      </Text>

      <Text variant="bodyMedium" style={styles.paragraph}>
        We aim to deliver not just groceries, but convenience and reliability to every household. Your time is
        precious — let us help you save it.
      </Text>
    </ScrollView>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 21,
    backgroundColor: '#a1c4f0',
  },
  centered: {
    textAlign: 'center',
    marginBottom: 12,
    color:'black'
  },
  subtitle: {
    marginTop: 20,
    marginBottom: 10,
    color:'black'
  },
  paragraph: {
    lineHeight: 22,
    textAlign: 'justify',
    color:'black'
  },
  bold: {
    fontWeight: 'bold',
    color:'black'
  },
  divider: {
    marginVertical: 20,
  },
});
