import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  Box,
  Image,
  UnorderedList,
  ListItem,
  Flex,
  Spinner,
  Heading,
  Badge,
  Divider,
  SimpleGrid,
  Grid,
} from "@chakra-ui/react";

const CharacterDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [character, setCharacter] = useState(null);
  const [films, setFilms] = useState([]);

  useEffect(() => {
    if (id) {
      fetch(`https://swapi.dev/api/people/${id}/`)
        .then((response) => response.json())
        .then((data) => {
          setCharacter(data);
          return data.films;
        })
        .then((films) => {
          Promise.all(
            films.map((film) => fetch(film).then((res) => res.json()))
          ).then((filmsData) => setFilms(filmsData));
        });
    }
  }, [id]);

  if (!character) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Box mx="auto" p={6}>
      <Grid templateColumns="3fr 1fr" gap={6} height={"100%"}>
        <Flex
          bg="white"
          boxShadow="md"
          borderRadius="lg"
          overflow="hidden"
          p={6}
          height={"90vh"}
        >
          <Image
            src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
            alt={character.name}
            objectFit="cover"
            borderRadius="lg"
          />
         <Box ml={6} textAlign="left">
  <Heading as="h1"  mb={4}>
    {character.name}
  </Heading>
  <Divider mb={4} />
  <UnorderedList spacing={2}>
    <ListItem>
      <Badge colorScheme="green" fontSize="x">Height: {character.height}</Badge>
    </ListItem>
    <ListItem>
      <Badge colorScheme="purple" fontSize="x">Mass: {character.mass}</Badge>
    </ListItem>
    <ListItem>
      <Badge colorScheme="blue" fontSize="x">Hair Color: {character.hair_color}</Badge>
    </ListItem>
    <ListItem>
      <Badge colorScheme="yellow" fontSize="x">Skin Color: {character.skin_color}</Badge>
    </ListItem>
    <ListItem>
      <Badge colorScheme="red" fontSize="x">Eye Color: {character.eye_color}</Badge>
    </ListItem>
    <ListItem>
      <Badge colorScheme="orange" fontSize="x">Birth Year: {character.birth_year}</Badge>
    </ListItem>
    <ListItem>
      <Badge colorScheme="teal" fontSize="x">Gender: {character.gender}</Badge>
    </ListItem>
  </UnorderedList>
</Box>
        </Flex>
        <Box bg="white" boxShadow="md" borderRadius="lg" p={6}>
          <Heading as="h2" size="lg" mb={4}>
            Films
          </Heading>
          <Divider mb={4} />
          <UnorderedList spacing={3} styleType="disc" pl={4}>
            {films.map((film) => (
              <ListItem key={film.episode_id} fontSize="lg">
                {film.title}
              </ListItem>
            ))}
          </UnorderedList>
        </Box>
      </Grid>
    </Box>
  );
};

export default CharacterDetail;
