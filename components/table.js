import React from 'react'
import {Box, Text} from '@chakra-ui/react'

function Th(props) {
  return <Text as="th" textTransform="uppercase" fontSize="xs" color="gray.500" fontWeight="medium" px={4} {...props} />
}

function Td(props) {
  return <Box as="td" color="gray.900" p={4} borderBottom="1px solid" borderBottomColor="gray.100" {...props} />
}

function Tr(props) {
  return (
    <Box
      as="tr"
      backgroundColor="gray.50"
      borderTopLeftRadius={8}
      borderTopRightRadius={8}
      borderBottom="1px solid"
      borderBottomColor="gray.200"
      height="40px"
      {...props}
    />
  )
}

function Table(props) {
  return (
    <Box
      as="table"
      textAlign="left"
      backgroundColor="white"
      ml={0}
      mr={0}
      borderRadius={8}
      boxShadow="0px 4px 10px rgba(0, 0, 0, 0.05)"
      {...props}
    />
  )
}

export {Th, Td, Tr, Table}
