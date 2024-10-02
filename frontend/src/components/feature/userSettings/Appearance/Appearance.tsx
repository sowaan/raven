import { ErrorBanner } from "@/components/layout/AlertBanner"
import { Flex, Box, Text, Separator, RadioCards } from "@radix-ui/themes"
import { FormProvider, useForm } from "react-hook-form"
import { useTheme } from "@/ThemeProvider"

export const Appearance = () => {

    const { appearance, setAppearance } = useTheme()

    const methods = useForm()
    const { register, handleSubmit, formState: { errors } } = methods
    let updatingDoc = false
    let error = null

    return (
        <Flex direction='column' gap='4' px='6' py='4'>
            <FormProvider {...methods}>
                <form>
                    <Flex direction={'column'} gap='4'>
                        <Flex justify={'between'} align={'center'}>
                            <Flex direction='column' gap='0'>
                                <Text size='3' className={'font-semibold'}>Appearance</Text>
                                <Text size='1' color='gray'>Configure how your chat looks</Text>
                            </Flex>
                        </Flex>

                        <Flex direction={'column'} gap='0'>

                            <ErrorBanner error={error} />

                            <Flex gap='4' direction='column' className={'py-4 dark:bg-slate-2'}>
                                <Text>Theme</Text>
                                <Box maxWidth="600px">
                                    <RadioCards.Root value={appearance} defaultValue={appearance} columns={{ initial: '1', sm: '3' }}>
                                        <Flex direction="column" align="center" gap='3'>
                                            <RadioCards.Item value="light" className="cursor-pointer" onClick={() => setAppearance("light")}>
                                                <img src={"https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"}
                                                    className="w-full h-auto object-cover" />
                                            </RadioCards.Item>
                                            <Text weight="bold">Light</Text>
                                        </Flex>
                                        <Flex direction="column" align="center" gap='3'>
                                            <RadioCards.Item value="dark" className="cursor-pointer" onClick={() => setAppearance("dark")}>
                                                <img src={"https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"}
                                                    className="w-full h-auto object-cover" />
                                            </RadioCards.Item>
                                            <Text weight="bold">Dark</Text>
                                        </Flex>
                                        <Flex direction="column" align="center" gap='3'>
                                            <RadioCards.Item value="inherit" className="cursor-pointer" onClick={() => setAppearance("inherit")}>
                                                <img src={"https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"}
                                                    className="w-full h-auto object-cover" />
                                            </RadioCards.Item>
                                            <Text weight="bold">System</Text>
                                        </Flex>
                                    </RadioCards.Root>
                                </Box>

                                <Separator className={'w-full bg-slate-4'} />

                                <Text>Chat Layout</Text>
                                <Box maxWidth="600px">
                                    <RadioCards.Root defaultValue="Simple" columns={{ initial: '1', sm: '2' }}>
                                        <Flex direction="column" align="center" gap='3'>
                                            <RadioCards.Item value="Simple" className="cursor-pointer">
                                                <img src={"https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"}
                                                    className="w-full h-auto object-cover" />

                                            </RadioCards.Item>
                                            <Text weight="bold">Simple</Text>
                                        </Flex>
                                        <Flex direction="column" align="center" gap='3'>
                                            <RadioCards.Item value="Left-Right" className="cursor-pointer">
                                                <img src={"https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"}
                                                    className="w-full h-auto object-cover" />
                                            </RadioCards.Item>
                                            <Text weight="bold">Left-Right</Text>
                                        </Flex>
                                    </RadioCards.Root>
                                </Box>
                            </Flex>
                        </Flex>
                    </Flex>
                </form >
            </FormProvider >
        </Flex >
    )
}