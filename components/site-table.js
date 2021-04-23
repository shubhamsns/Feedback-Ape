import React from 'react'
import {Box, Link} from '@chakra-ui/react'
import {parseISO, format} from 'date-fns'

import {Table, Tr, Th, Td} from './table'

function SiteTable({sites}) {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Site Link</Th>
          <Th>Feedback Link</Th>
          <Th>Date Added</Th>
          <Th />
        </Tr>
      </thead>

      <tbody>
        {sites.map(site => (
          <Box as="tr" key={site.url}>
            <Td fontWeight="medium">{site.name}</Td>
            <Td>{site.url}</Td>
            <Td>
              <Link>View Feedback</Link>
            </Td>
            <Td>{format(parseISO(site.createdAt), 'PPpp')}</Td>
          </Box>
        ))}
      </tbody>
    </Table>
  )
}

export {SiteTable}