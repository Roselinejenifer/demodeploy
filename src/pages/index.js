import { useState, useEffect } from "react";
import { Box, Text, SimpleGrid, Flex,Spinner } from "@chakra-ui/react";
import CharacterCard from "../components/CharacterCard";
import Pagination from "@/components/Pagination";

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCharacters, setTotalCharacters] = useState(0);
  const [favorites, setFavorites] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("favorites")) || [];
    }
    return [];
  });

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://swapi.dev/api/people/?page=${page}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCharacters(data.results.slice(0, 10)); 
        setTotalCharacters(data.count);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [page]);

  const toggleFavorite = (character) => {
    const updatedFavorites = favorites.includes(character.name)
      ? favorites.filter((fav) => fav !== character.name)
      : [...favorites, character.name];

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  if (loading) {
    return (
      <Flex direction="column" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.500" mb={4} />
        <Text fontSize="lg" fontWeight="medium">
          Loading characters...
        </Text>
      </Flex>
    );
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <Box p={4}>
      <SimpleGrid columns={[1, 2, 3, 5]} gap={8}>
        {characters.map((character) => (
          <CharacterCard
            key={character.name}
            character={character}
            isFavorite={favorites.includes(character.name)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </SimpleGrid>
      <Pagination
        page={page}
        setPage={setPage}
        totalCharacters={totalCharacters}
        itemsPerPage={itemsPerPage}
      />
    </Box>
  );
};

export default CharacterList;
