import { Avatar, Box, BoxProps, Button, HStack, Link, Stack, StackDivider, Text, Tooltip, useColorMode, useDisclosure } from "@chakra-ui/react"
import { useContext, useState } from "react"
import { User } from "../../../../types/User/User"
import { ChannelContext } from "../../../../utils/channel/ChannelProvider"
import { DateObjectToTimeString, DateObjectToFormattedDateStringWithoutYear } from "../../../../utils/operations"
import { UserProfileDrawer } from "../../user-details/UserProfileDrawer"
import { ActionsPalette } from "../../message-action-palette/ActionsPalette"
import { useNavigate } from "react-router-dom";
import { Message } from "../../../../types/Messaging/Message"
import { MessageReactions } from "./MessageReactions"

interface ChatMessageBoxProps extends BoxProps {
    message: Message,
    isSearchResult?: boolean,
    isArchived?: number
    creation?: string
    channelName?: string
    channelID?: string,
    handleScroll?: (newState: boolean) => void,
    children?: React.ReactNode
}

export const ChatMessageBox = ({ message, isSearchResult, isArchived, creation, channelName, channelID, handleScroll, children, ...props }: ChatMessageBoxProps) => {

    const { colorMode } = useColorMode()
    const textColor = colorMode === 'light' ? 'gray.800' : 'gray.50'
    const [showButtons, setShowButtons] = useState<{}>({ visibility: 'hidden' })

    const { channelMembers, users } = useContext(ChannelContext)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const { isOpen: isUserProfileDetailsDrawerOpen, onOpen: onUserProfileDetailsDrawerOpen, onClose: onUserProfileDetailsDrawerClose } = useDisclosure()

    const navigate = useNavigate()

    const { name, text, file, owner: user, creation: timestamp, message_reactions, isContinuation } = message

    return (
        <Box
            pt={isContinuation ? 1 : 2}
            pb={1}
            px='2'
            zIndex={1}
            position={'relative'}
            _hover={{
                bg: colorMode === 'light' && 'gray.50' || 'gray.800',
                borderRadius: 'md'
            }}
            rounded='md'
            onMouseEnter={e => {
                setShowButtons({ visibility: 'visible' })
            }}
            onMouseLeave={e => {
                setShowButtons({ visibility: 'hidden' })
            }}
            {...props}>

            {isSearchResult && creation && <HStack pb={1.5} spacing={1}>
                <Text fontWeight='semibold' fontSize='sm'>{channelName ?? "Direct message"}</Text>
                {isArchived && <Text fontSize={'small'}>(archived)</Text>}
                <Text fontSize='small'>- {new Date(creation).toDateString()}</Text>
                <Link style={showButtons} color='blue.500' onClick={() => navigate(`/channel/${channelID}`)} pl={1}>
                    {channelName ? <Text fontSize={'small'}>View Channel</Text> : <Text fontSize={'small'}>View Chat</Text>}
                </Link>
            </HStack>
            }

            {isContinuation ?
                <HStack spacing={3.5}>
                    <Tooltip hasArrow label={`${DateObjectToFormattedDateStringWithoutYear(new Date(timestamp))} at ${DateObjectToTimeString(new Date(timestamp))}`} placement='top' rounded='md'>
                        <Text pl='1' style={showButtons} fontSize={'xs'} color="gray.500" _hover={{ textDecoration: 'underline' }}>{DateObjectToTimeString(new Date(timestamp)).split(' ')[0]}</Text>
                    </Tooltip>
                    <Stack spacing='1'>
                        {children}
                        <MessageReactions name={name} message_reactions={message_reactions} />
                    </Stack>
                </HStack>
                : <HStack spacing={2} alignItems='flex-start'>
                    <Avatar name={channelMembers?.[user]?.full_name ?? users?.[user]?.full_name ?? user} src={channelMembers?.[user]?.user_image ?? users?.[user]?.user_image} borderRadius={'md'} boxSize='36px' />
                    <Stack spacing='1'>
                        <HStack>
                            <HStack divider={<StackDivider />} align='flex-start'>
                                <Button variant='link' onClick={() => {
                                    setSelectedUser(channelMembers?.[user])
                                    onUserProfileDetailsDrawerOpen()
                                }}>
                                    <Text fontSize='sm' lineHeight={'0.9'} fontWeight="bold" as='span' color={textColor}>{channelMembers?.[user]?.full_name ?? users?.[user]?.full_name ?? user}</Text>
                                </Button>
                                <Tooltip hasArrow label={`${DateObjectToFormattedDateStringWithoutYear(new Date(timestamp))} at ${DateObjectToTimeString(new Date(timestamp))}`} placement='top' rounded='md'>
                                    <Text fontSize="xs" lineHeight={'0.9'} color="gray.500" _hover={{ textDecoration: 'underline' }}>{DateObjectToTimeString(new Date(timestamp))}</Text>
                                </Tooltip>
                            </HStack>
                        </HStack>
                        {children}
                        <MessageReactions message_reactions={message_reactions} name={name} />
                    </Stack>
                </HStack>
            }
            {message && handleScroll && <ActionsPalette name={name} file={file} text={text} user={user} showButtons={showButtons} handleScroll={handleScroll} />}
            {selectedUser && <UserProfileDrawer isOpen={isUserProfileDetailsDrawerOpen} onClose={onUserProfileDetailsDrawerClose} user={selectedUser} />}
        </Box>
    )
}