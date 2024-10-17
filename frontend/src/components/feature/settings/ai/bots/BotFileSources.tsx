import { Stack } from '@/components/layout/Stack'
import { RavenBot } from '@/types/RavenBot/RavenBot'
import { FileExtensionIcon } from '@/utils/layout/FileExtIcon'
import { Card, Text } from '@radix-ui/themes'
import { useFieldArray, useFormContext } from 'react-hook-form'

type Props = {}

const BotFileSources = (props: Props) => {

    const { control } = useFormContext<RavenBot>()

    const { fields } = useFieldArray({
        control,
        name: 'ai_data_sources'
    })

    return (
        <Stack gap='3' pt='2'>
            <Text as='p' size='3'>
                Add file sources to the bot to provide it more context about it's environment.
            </Text>
            {fields.map((field) => (
                <Card key={field.id}>
                    <FileExtensionIcon ext='.pdf' />
                    <Text>{field.file_name}</Text>
                </Card>
            ))}
        </Stack>
    )
}

export default BotFileSources