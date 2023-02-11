import { useFrappeGetCall } from "frappe-react-sdk"
import { BiHash } from "react-icons/bi"
import { BiLockAlt } from "react-icons/bi"
import { AlertBanner } from "../../layout/AlertBanner"
import { SidebarGroup, SidebarGroupItem, SidebarGroupLabel, SidebarGroupList, SidebarIcon, SidebarItem, SidebarItemLabel } from "../../layout/Sidebar"

type ChannelListForUser = {
    name: string,
    channel_name: string,
    type: string,
    is_direct_message: boolean
}

export const ChannelList = () => {

    const { data, error } = useFrappeGetCall<{ message: ChannelListForUser[] }>("raven.channel_management.doctype.channel.channel.get_channel_list")

    if (error) {
        <AlertBanner status="error" heading={error.message}>{error.httpStatus} - {error.httpStatusText}</AlertBanner>
    }

    return (
        <SidebarGroup>
            <SidebarGroupItem>
                <SidebarGroupLabel>Channels</SidebarGroupLabel>
            </SidebarGroupItem>
            <SidebarGroupList>
                {data?.message.map((channel) => (
                    <SidebarItem to={channel.name} key={channel.name}>
                        <SidebarIcon>{channel.type === "Private" ? <BiLockAlt /> : <BiHash />}</SidebarIcon>
                        <SidebarItemLabel>{channel.channel_name}</SidebarItemLabel>
                    </SidebarItem>
                ))}
            </SidebarGroupList>
        </SidebarGroup>
    )
}