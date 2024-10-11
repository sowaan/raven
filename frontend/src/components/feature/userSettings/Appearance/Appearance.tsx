import { Flex, Box, Text, Separator, RadioCards } from "@radix-ui/themes"
import { useTheme } from "@/ThemeProvider"
import lightModeImg from "../../../../images/theme_light_mode.png"
import darkModeImg from "../../../../images/theme_dark_mode.png"
import systemModeImg from "../../../../images/theme_system_mode.png"
import lightModeLeftRightImg from "../../../../images/light_mode_left_right.png"
import darkModeLeftRightImg from "../../../../images/dark_mode_left_right.png"
import { useFrappeGetCall, useFrappePostCall } from "frappe-react-sdk"
import { toast } from "sonner"
import { useUserData } from "@/hooks/useUserData"

export const Appearance = () => {

    const { appearance, setAppearance } = useTheme()

    const userData = useUserData()

    const { data: chatStyle, mutate } = useFrappeGetCall<{ message: { chat_style: 'Simple' | 'Left-Right' } }>('frappe.client.get_value', {
        doctype: 'Raven User',
        fieldname: JSON.stringify(['chat_style']),
        filters: {
            name: userData.name
        }
    }, undefined, { revalidateOnFocus: false })

    const { call } = useFrappePostCall('frappe.client.set_value')

    const setChatStyle = (style: string) => {
        call({
            doctype: 'Raven User',
            name: userData.name,
            fieldname: 'chat_style',
            value: style
        }).then(() => {
            mutate()
            toast.success('Chat style updated')
        }).catch((e) => {
            toast.error(e.message)
        })
    }

    return (
        <Flex direction='column' gap='4' px='6' py='4'>
            <Flex direction={'column'} gap='4'>
                <Flex justify={'between'} align={'center'}>
                    <Flex direction='column' gap='0'>
                        <Text size='3' className={'font-semibold'}>Appearance</Text>
                        <Text size='1' color='gray'>Configure how your chat looks</Text>
                    </Flex>
                </Flex>

                <Flex direction={'column'} gap='0'>
                    <Flex gap='4' direction='column' className={'py-4 dark:bg-slate-2'}>
                        <Themes appearance={appearance} setAppearance={setAppearance} />

                        <Separator className={'w-full bg-slate-4'} />

                        {chatStyle && <ChatLayouts chatStyle={chatStyle?.message?.chat_style} setChatStyle={setChatStyle} appearance={appearance} />}
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}


const Themes = ({ appearance, setAppearance }: { appearance: string, setAppearance: (appearance: 'light' | 'dark' | 'inherit') => void }) => {

    return (
        <>
            <Text>Theme</Text>
            <Box maxWidth="910px">
                <RadioCards.Root value={appearance} defaultValue={appearance} columns={{ initial: '1', sm: '3' }}>
                    <Flex direction="column" align="center" gap='3'>
                        <RadioCards.Item value="light" className="p-0 cursor-pointer" onClick={() => setAppearance("light")}>
                            <img src={lightModeImg}
                                className="w-full h-auto object-cover" />
                        </RadioCards.Item>
                        <Text weight="bold">Light</Text>
                    </Flex>
                    <Flex direction="column" align="center" gap='3'>
                        <RadioCards.Item value="dark" className="p-0 cursor-pointer" onClick={() => setAppearance("dark")}>
                            <img src={darkModeImg}
                                className="w-full h-auto object-cover" />
                        </RadioCards.Item>
                        <Text weight="bold">Dark</Text>
                    </Flex>
                    <Flex direction="column" align="center" gap='3'>
                        <RadioCards.Item value="inherit" className="p-0 cursor-pointer" onClick={() => setAppearance("inherit")}>
                            <img src={systemModeImg}
                                className="w-full h-auto object-cover" />
                        </RadioCards.Item>
                        <Text weight="bold">System</Text>
                    </Flex>
                </RadioCards.Root>
            </Box>
        </>
    )
}


const ChatLayouts = ({ chatStyle, setChatStyle, appearance }: { chatStyle: 'Simple' | 'Left-Right', setChatStyle: (style: string) => void, appearance: string }) => {

    const getImageSrc = (chatStyle: "Simple" | "Left-Right") => {
        const lightModeImages = {
            "Simple": lightModeImg,
            "Left-Right": lightModeLeftRightImg
        };

        const darkModeImages = {
            "Simple": darkModeImg,
            "Left-Right": darkModeLeftRightImg
        };

        if (appearance === "light") {
            return lightModeImages[chatStyle];
        }

        if (appearance === "dark") {
            return darkModeImages[chatStyle];
        }

        // For "inherit", check system preference
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return darkModeImages[chatStyle];
        } else {
            return lightModeImages[chatStyle];
        }
    }

    return (
        <>
            <Text>Chat Layout</Text>
            <Box maxWidth="600px">
                {chatStyle && <RadioCards.Root value={chatStyle} onValueChange={(value) => setChatStyle(value)} columns={{ initial: '1', sm: '2' }}>
                    <Flex direction="column" align="center" gap='3'>
                        <RadioCards.Item value="Simple" className="p-0 cursor-pointer">
                            <img src={getImageSrc("Simple")} className="w-full h-auto object-cover" />
                        </RadioCards.Item>
                        <Text weight="bold">Simple</Text>
                    </Flex>
                    <Flex direction="column" align="center" gap='3'>
                        <RadioCards.Item value="Left-Right" className="p-0 cursor-pointer">
                            <img src={getImageSrc("Left-Right")} className="w-full h-auto object-cover" />
                        </RadioCards.Item>
                        <Text weight="bold">Left-Right</Text>
                    </Flex>
                </RadioCards.Root>}
            </Box>
        </>
    )
}