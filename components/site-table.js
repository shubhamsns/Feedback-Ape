import NextLink from 'next/link'
import {parseISO, format} from 'date-fns'
import {Box, HStack, IconButton, Link, useToast} from '@chakra-ui/react'

import {CopyIcon} from '@/assets/icons'

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
                <HStack>
                  <CopyLink />

                  <DeleteSiteButton siteId={site.id} />
                </HStack>
              </Td>
            </Box>
          ))}
        </tbody>
      </Table>
    </Box>
  )
}

function CopyLink() {
  const toast = useToast()

  return (
    <IconButton
      onClick={() => {
        navigator.clipboard.writeText(
          `<iframe src='https://fastfeedback.shubham-sns.vercel.app/embed/3BGPAcdMV7EFeLO9A9Yj' frameBorder='0' />`
        )
        toast({
          status: 'success',
          isClosable: true,
          title: 'Copied',
          description: 'Embed URL copied.',
          position: 'top',
        })
      }}
      icon={<CopyIcon />}
      variant="ghost"
    />
  )
}

export {SiteTable}
