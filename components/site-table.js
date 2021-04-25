import NextLink from 'next/link'
import {parseISO, format} from 'date-fns'
import {Box, Link} from '@chakra-ui/react'

import {Table, Tr, Th, Td} from './table'
import {DeleteSiteButton} from './delete-site-button'

function SiteTable({sites}) {
  return (
    <Box overflowX="scroll">
      <Table w="full">
        <thead>
          <Tr>
            <Th>Name</Th>
            <Th>Site Link</Th>
            <Th>Feedback Link</Th>
            <Th>Date Added</Th>
            <Th w="50px" />
          </Tr>
        </thead>

        <tbody>
          {sites.map(site => (
            <Box as="tr" key={site.id}>
              <Td fontWeight="medium">{site.name}</Td>
              <Td>{site.url}</Td>
              <Td>
                <NextLink href="/site/[siteId]" as={`/site/${site.id}`} passHref>
                  <Link color="blue.500" fontWeight="medium">
                    View Feedback
                  </Link>
                </NextLink>
              </Td>
              <Td>{format(parseISO(site.createdAt), 'PPpp')}</Td>
              <Td>
                <DeleteSiteButton siteId={site.id} />
              </Td>
            </Box>
          ))}
        </tbody>
      </Table>
    </Box>
  )
}

export {SiteTable}
