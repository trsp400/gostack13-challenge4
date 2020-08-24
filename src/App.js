import React, {useEffect, useState} from "react";
import api from './services/api';

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const [repo, setRepo] = useState([]);

  async function handleLikeRepository(id) {
    const likedRepository = await api.post(`/repositories/${id}/like`);

    const updatedRepositories = repo.map( repository => {
      
      if(repository.id === likedRepository.data.id) {
        return likedRepository.data;
      } else {
        return repository;
      }
    });

    setRepo(updatedRepositories);
  }

  // useEffect(() => {
  //   console.log(repo);
  //   setRepo(repo)
    
  // },[repo])

  const updateRepo = rep => {
    
    setRepo(rep);
  }

  const retrieveRepo = async () => {
    const response = await api.get('/repositories');
    
    if(response) updateRepo(response.data);
  }

  useEffect(() => {        
    retrieveRepo();
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
        <SafeAreaView style={styles.container}>
          <FlatList 
          style={styles.container}
          data={repo}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <View style={styles.repositoryContainer}>
              <Text style={styles.repository}>{item.title}</Text>
              
              <View styles={styles.techsContainer}>
                {
                  item.techs.map( tech => (
                    <Text key={tech} style={styles.tech}>{tech}</Text>
                  ))
                }                
              </View> 
              
              <View style={styles.likesContainer}>
                {
                  item.likes < 2 ? (
                    <Text style={styles.likeText} testID={`repository-likes-${item.id}`}>{item.likes} curtida</Text>
                  ) : (
                    <Text style={styles.likeText} testID={`repository-likes-${item.id}`}>{item.likes} curtidas</Text>
                  )
                }
                
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleLikeRepository(item.id)}
                testID={`like-button-${item.id}`}
              >
                <Text style={styles.buttonText}>Curtir</Text>
              </TouchableOpacity>
            </View>
          )}
          />
        </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
