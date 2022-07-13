import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Input,
  Center,
  Button,
  Grid,
  Box,
  Heading,
  Text,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
  } from '@chakra-ui/react'
function GithubRepositories() {
  const [query, setQuery] = useState("react");
  const [data, setData] = useState({});
  const [order_by, setOrder_by] = useState("desc")
  const [page, setPage] = useState(1)
  const [per_page, setPer_page] = useState(20)

  async function search(value, sort_by = "updated") {

    let res = await axios.get(
      `https://api.github.com/search/repositories?q=${value}&page=${page}&per_page=${per_page}&sort=${sort_by}&order=${order_by}`
    );
    console.log(res.data);
    setData(res.data);
  }

  useEffect(() => {
    search(query);
  }, [order_by]);

  function Card({
    name,
    url,
    forks_count,
    language,
    created_at,
    updated_at,
    watchers_count,
    description,
    rest,
  }) {
    return (
      <Box p={5} shadow="md" borderWidth="1px" {...rest}>
        <a href={url}>
          <Heading fontSize="xl">{name}</Heading>
          <Text mt={4}> description: {description}</Text>
          <p>forks: {forks_count}</p>
          <p>language: {language}</p>
          <p>created at: {created_at}</p>
          <p>updated at: {updated_at}</p>
          <p>watchers count: {watchers_count}</p>
        </a>
      </Box>
    );
  }

  return (
    <div>
      <Center>
        <Input
          width={"20%"}
          m={10}
          focusBorderColor="lime"
          placeholder=" Input repo name to search"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        ></Input>
        <Button
          onClick={() => {
            search(query);
          }}
        >
          Search
        </Button>
      </Center>

      <Flex>
        
        <div>
        <Menu closeOnSelect={true} >
  <MenuButton as={Button} margin={"0 10px"} colorScheme='blue'>
    sort
  </MenuButton>
  <MenuList minWidth='240px'>
    <MenuOptionGroup defaultValue='desc' title='Order' type='radio'>
      <MenuItemOption onClick={()=>{setOrder_by("arc")}} value='asc'>Ascending</MenuItemOption>
      <MenuItemOption onClick={()=>{setOrder_by("desc")}} value='desc'>Descending</MenuItemOption>
    </MenuOptionGroup>
  </MenuList>
</Menu>
        </div>
        <Spacer />
        <div>
        <Button   isDisabled={false} m={" 0 3px"} colorScheme="teal" size="xs">
          prev
        </Button>
        
        <Button  borderRadius={"50%"} isDisabled={false} m={" 0 3px"} colorScheme="teal" size="xs">
          1
        </Button>
        <Button  borderRadius={"50%"} isDisabled={false} m={" 0 3px"} colorScheme="teal" size="xs">
          2
        </Button>
        <Button  borderRadius={"50%"} isDisabled={false} m={" 0 3px"} colorScheme="teal" size="xs">
          3
        </Button>
        <Button  borderRadius={"50%"} isDisabled={false} m={" 0 3px"} colorScheme="teal" size="xs">
          4
        </Button>
        <Button  isDisabled={false} m={" 0 3px"} colorScheme="teal" size="xs">
          Next
        </Button>
        </div>
      </Flex>

      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        {data.items &&
          data.items.map((ele) => (
            <Center key={ele.id}>
              <Card
                name={ele.name}
                url={ele.html_url}
                forks_count={ele.forks_count}
                language={ele.language}
                created_at={ele.created_at}
                updated_at={ele.updated_at}
                watchers_count={ele.watchers_count}
                description={ele.description}
              />
            </Center>
          ))}
      </Grid>
    </div>
  );
}

export default GithubRepositories;
