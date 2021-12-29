import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  Pressable,
  Image,
  Keyboard,
} from 'react-native';

const App2 = () => {
  const [text, setText] = useState('');
  const [githubData, setGithubData] = useState(null);

  const onClick = () => {
    Keyboard.dismiss();
    fetch('https://api.github.com/users/' + text)
      .then(response => response.json())
      .then(data => {
        console.log(JSON.stringify(data, null, 2));
        setGithubData(data);
      });
  };

  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Github Profile</Text>
          <View style={styles.form}>
            <TextInput
              value={text}
              style={styles.input}
              onChangeText={setText}
              placeholder="Type username"
            />
            <Pressable onPress={onClick} style={styles.button}>
              <Text style={styles.buttonTitle}>Fetch</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Image source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}} />

          <Text style={styles.fullName}>{githubData?.name || ''}</Text>
          <Text style={styles.username}>@{githubData?.login || ''}</Text>
        </View>
        <View style={styles.flowContainer}>
          <View>
            <Text style={styles.flowTitle}>Followers</Text>
            <Text style={styles.flowCount}>{githubData?.followers || 0}</Text>
          </View>
          <View>
            <Text style={styles.flowTitle}>Following</Text>
            <Text style={styles.flowCount}>{githubData?.following || 0}</Text>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#202124',
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  form: {
    flexDirection: 'row',
  },
  title: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#C4C4C4',
    borderRadius: 10,
    fontSize: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
  },
  button: {
    backgroundColor: '#3F8AFA',
    borderRadius: 10,
    marginLeft: 10,
    fontSize: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  buttonTitle: {
    fontSize: 20,
    color: '#fff',
  },
  avatar: {
    width: 138,
    height: 138,
    borderRadius: 138 / 2,
  },
  fullName: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '500',
  },
  username: {
    color: '#8886FF',
    fontSize: 20,
    fontWeight: '500',
  },
  infoContainer: {
    alignItems: 'center',
  },
  flowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flowTitle: {
    color: '#fff',
    fontSize: 24,
  },
  flowCount: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default App2;
