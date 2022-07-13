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
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
} from "@chakra-ui/react";

let a = 0
function GithubRepositories() {
  const [query, setQuery] = useState("react");
  const [data, setData] = useState({});
  const [order_by, setOrder_by] = useState("desc");
  const [page, setPage] = useState(2);
  const [pages, setPages] = useState([1, 2, 3]);
  const [per_page, setPer_page] = useState(20);

  async function search(value, sort_by = "updated") {
    let res = await axios.get(
      `https://api.github.com/search/repositories?q=${value}&page=${page}&per_page=${per_page}&sort=${sort_by}&order=${order_by}`
    );
    console.log(res.data);
    setData(res.data);
  }

  useEffect(() => {
    search(query);
  }, [order_by, page]);

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
  
  function isPrev() {
    console.log("isprev called",++a, page> 3);
    return pages[0] === 1?"none":""
  }
  function isNext() {
    // console.log("isprev called",++a, page> 3);
    console.log(data.total_count,Math.ceil(data.total_count/per_page));
    return pages[pages.length-1] === Math.ceil(data.total_count/per_page)?"none":""
  }
  function changeArr(Arr, val) {
    console.log(Arr, val);
    return Arr.map(element => element+=val);
    
  }

  return (
    <div>
      <Center>
        <Input
          width={"20%"}
          m={10}
          focusBorderColor="lime"
          borderColor={"blackAlpha"}
          placeholder=" Input repo name to search"
          onChange={(e) => {
            setQuery(e.target.value);
          }}></Input>
        <Button
          onClick={() => {
            search(query);
          }}>
          Search
        </Button>
      </Center>

      <Flex>
        <div>
          <Menu closeOnSelect={true}>
            <MenuButton as={Button} margin={"0 10px"} colorScheme="blue">
              sort by updated
            </MenuButton>
            <MenuList minWidth="240px">
              <MenuOptionGroup defaultValue="desc" title="Order" type="radio">
                <MenuItemOption
                  onClick={() => {
                    setOrder_by("arc");
                  }}
                  value="asc">
                  Ascending
                </MenuItemOption>
                <MenuItemOption
                  onClick={() => {
                    setOrder_by("desc");
                  }}
                  value="desc">
                  Descending
                </MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        </div>
        <Spacer />
        <div>
            <Button colorScheme="teal" size="sm" onClick={()=>{search(query)}} >set per_page</Button>
            <Input width="50px" margin={"0 5px"} size="xs" borderColor={"black"} onChange={(e)=>{setPer_page(e.target.value)}} value={per_page}></Input>

          <Button onClick={()=>{setPages(prev=>changeArr(prev, -3))}} isDisabled={false} display={isPrev()} m={" 0 3px"} colorScheme="teal" size="xs">
            prev
          </Button>
          <Button onClick={()=>{setPages([1,2,3])}} isDisabled={false} display={isPrev()} m={" 0 3px"} colorScheme="teal" size="xs">
            1
          </Button>
          <Button isDisabled={false} onClick={()=>{setPages(prev=>changeArr(prev, -10))}} display={isPrev()} m={" 0 3px"} colorScheme="teal" size="xs">
            ...
          </Button>
          {pages.map((item) => (
            <>
              <Button
              onClick={()=>{setPage(item)}}
                borderRadius={"50%"}
                isDisabled={item === page?true:false}
                m={" 0 3px"}
                colorScheme="teal"
                size="xs">
                {item}
              </Button>
            </>
          ))}
          <Button isDisabled={false} onClick={()=>{setPages(prev=>changeArr(prev, -10))}} display={isNext()} m={" 0 3px"} colorScheme="teal" size="xs">
            ...
          </Button>
          <Button onClick={()=>{setPages([Math.ceil(data.total_count/per_page)-2,Math.ceil(data.total_count/per_page)-1,Math.ceil(data.total_count/per_page)])}} isDisabled={false} display={isNext()} m={" 0 3px"} colorScheme="teal" size="xs">
            {Math.ceil(data.total_count/per_page)}
          </Button>

          <Button onClick={()=>{setPages(prev=>changeArr(prev, 3))}} display={isNext()} isDisabled={false} m={" 0 3px"} colorScheme="teal" size="xs">
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
