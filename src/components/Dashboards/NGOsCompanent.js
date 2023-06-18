import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Checkbox,
  CheckboxGroup,
  Stack,
  Text,
  Heading,
  Divider,
} from "@chakra-ui/react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  // FilterIcon,
  EmailIcon,
  PhoneIcon,
} from "@chakra-ui/icons";
import { sectorOptions } from "../sectorData";
import { fetchStates } from "../geoData";
import { Icon } from "@chakra-ui/react";
import { FiMapPin } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export const FilterDrawer = ({ isOpen, onClose, handleCheckboxChange }) => {
  const [states, setStates] = useState([]);
  const [selectedSectors, setSelectedSectors] = useState([]);
  const [selectedStates, setSelectedStates] = useState([]);
  const [isSectorDropdownOpen, setIsSectorDropdownOpen] = useState(false);
  const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);

  useEffect(() => {
    const getStates = async () => {
      const fetchedStates = await fetchStates();
      setStates(fetchedStates);
    };
    getStates();
  }, []);

  const handleToggleSectorDropdown = () => {
    setIsSectorDropdownOpen((prevIsDropdownOpen) => !prevIsDropdownOpen);
  };

  const handleToggleStateDropdown = () => {
    setIsStateDropdownOpen((prevIsDropdownOpen) => !prevIsDropdownOpen);
  };

  const handleSectorChange = (selectedOptions) => {
    setSelectedSectors(selectedOptions);
  };

  const handleStateChange = (selectedOptions) => {
    setSelectedStates(selectedOptions);
  };

  const handleApplyFilters = () => {
    handleCheckboxChange(selectedSectors, selectedStates);
  };

  return (
    <Box
      left={0}
      top={0}
      h="100vh"
      overflow="auto"
      padding="1%"
      w="45vh"
      bg="linear-gradient(174.6deg, rgba(19, 15, 38, 0.6825) 1.74%, rgba(19, 15, 38, 0.75) 53.41%, rgba(19, 15, 38, 0.739748) 76.16%, rgba(19, 15, 38, 0.6075) 97.17%)"
      boxShadow="md"
    >
      <Heading color="white" fontSize="4xl" marginBottom="0.7rem">
        Filters
      </Heading>
      <Button
        alignContent="center"
        w="90%"
        rightIcon={
          isSectorDropdownOpen ? <ChevronUpIcon /> : <ChevronDownIcon />
        }
        onClick={handleToggleSectorDropdown}
        display="flex"
        justifyContent="flex-start"
        style={{ background: "rgba(255, 255, 255, 0.27)", color: "white" }}
      >
        Select Sector
      </Button>
      {isSectorDropdownOpen && (
        <Stack
          maxH="300px"
          width="90%"
          overflowY="auto"
          spacing={2}
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.27)",
            color: "white",
            padding: "1rem",
            marginTop: "0.5rem",
            borderRadius: "5px",
          }}
        >
          <CheckboxGroup
            colorScheme="teal"
            value={selectedSectors}
            onChange={handleSectorChange}
          >
            {sectorOptions.map((option) => (
              <Checkbox key={option.value} id={option.id} value={option.label}>
                {option.label}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </Stack>
      )}
      <Button
        w="90%"
        rightIcon={
          isStateDropdownOpen ? <ChevronUpIcon /> : <ChevronDownIcon />
        }
        onClick={handleToggleStateDropdown}
        display="flex"
        justifyContent="flex-start"
        style={{
          background: "rgba(255, 255, 255, 0.27)",
          color: "white",
          marginTop: "1rem",
        }}
      >
        Select State
      </Button>

      {isStateDropdownOpen && (
        <Stack
          maxH="400px"
          overflowY="auto"
          width="90%"
          spacing={2}
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.27)",
            color: "white",
            padding: "1rem",
            marginTop: "0.5rem",
            borderRadius: "5px",
          }}
        >
          <CheckboxGroup
            colorScheme="teal"
            value={selectedStates}
            onChange={handleStateChange}
          >
            {states.map((state) => (
              <Checkbox
                key={state.adminCode1}
                id={state.geonameId}
                value={state.name}
              >
                {state.name}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </Stack>
      )}
      <Button
        w="90%"
        display="flex"
        justifyContent="center"
        justifyItems="center"
        style={{
          background: "rgba(255, 255, 255, 0.27)",
          color: "white",
          marginTop: "1rem",
        }}
        onClick={handleApplyFilters}
      >
        Apply
      </Button>
    </Box>
  );
};

export const CardComponent = ({
  userType,
  ngoId,
  name,
  email,
  phone,
  location,
}) => {
  const navigate = useNavigate();
  const ShowProfile = () => {
    if (userType === "company") {
      navigate(`/Company/ngo-profile/${ngoId}`, {
        state: {
          ngoID: ngoId,
          userType: userType,
        },
      });
    } else {
      navigate(`/Beneficiary/ngo-profile/${ngoId}`, {
        state: {
          ngoID: ngoId,
          userType: userType,
        },
      });
    }
  };
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      //   bg={"rgba(135, 206, 235, 0.8)"}
      bg={"whiteAlpha.900"}
      fontFamily={"serif"}
      borderColor={"skyblue"}
      marginLeft="0.5rem"
      mr={"2rem"}
    >
      <Text fontSize="xl" fontWeight="bold" mt={"-3"} align={"center"}>
        {name}
          </Text>
          <Divider width={"80%"} ml={"10%"} mb={"3"}></Divider>
      <Flex align="center" mb={2}>
        <EmailIcon mr={2} />
        <Text>{email}</Text>
      </Flex>
      <Flex align="center" mb={2}>
        <PhoneIcon mr={2} />
        <Text>{phone}</Text>
      </Flex>
      <Flex align="center">
        <Icon as={FiMapPin} mr={2} />
        <Text>
          {location.city} , {location.state} , {location.pincode}
        </Text>
      </Flex>
      <Box display="flex" justifyContent="flex-end">
        <Button
          bg="skyblue"
          color="white"
          w={"fit-content"}
          boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
          size={"sm"}
          fontSize={"xs"}
          _hover={{ boxShadow: "0px 4px 6px skyblue", color: "red.500" }}
          _active={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}
          onClick={() => {
            ShowProfile();
          }}
        >
          View More
        </Button>
      </Box>
    </Box>
  );
};

export const SearchIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M21 21l-4.35-4.35"
      />
      <circle cx="11" cy="11" r="8" />
    </svg>
  );
};