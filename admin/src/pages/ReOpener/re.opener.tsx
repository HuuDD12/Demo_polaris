import { Autocomplete, Banner, BlockStack, Box, Button, Card, ChoiceList, Combobox, DropZone, Frame, Grid, InlineGrid, InlineStack, Layout, LegacyCard, Page, Select, Text, TextField, Thumbnail, Toast } from "@shopify/polaris"
import { useCallback, useState } from "react";
import '@/assets/css/switch.css';
const options = [
    { label: 'Bottom - Left', value: '1' },
    { label: 'Bottom - Right', value: '2' },
    { label: 'Top - Left', value: '3' },
    { label: 'Top - Right', value: '4' },

];
import { list } from "@/common/ListLogo";

const ReOpener: React.FC = () => {
    const [open, setOpen] = useState<any>({
        switch: false,
        customize: false,
    });
    const [selected, setSelected] = useState<any>(['text']);
    const [image, setImage] = useState<{ source: any, alt: any }>({
        source: list[0].source,
        alt: list[0].alt,
    });
    const [active, setActive] = useState<any>(false);

    const [dataText, setDataText] = useState<any>({
        name: 'Manage Cookie',
        colorText: '#FFFFFF',
        colorBackGround: '#FFFFFF',
        horizontal: 10,
        vertical: 10,
        selectedP: '1',

    });
    const handleDrop = (files: File[]) => {
        const acceptedFiles = files.filter(file => ['image/png', 'image/jpeg'].includes(file.type) && file.size <= 1024 * 1024);
        if (acceptedFiles.length > 0) {
            setImage({
                source: URL.createObjectURL(acceptedFiles[0]),
                alt: acceptedFiles[0].name
            });
            setActive(false)
        } else {
            setActive(true);
        }
    };
    const selectedOption = dataText.selectedP ? options.find(option => option.value === dataText.selectedP) : null;

    const toastMarkup = active ? (
        <Toast content="Please upload a PNG or JPEG file smaller than 1MB." onDismiss={() => setActive(!active)} />
    ) : null;
    return (
        <Frame>
            <Page
                // fullWidth
                title=" Demo Re-Opener Polaris"
                backAction={{ content: '', url: '/' }}
            >
                {toastMarkup}
                <Layout>
                    <BlockStack gap="600">
                        <Card>
                            <BlockStack gap="300">
                                <InlineGrid columns="1fr auto">
                                    <Text variant="headingMd" as="h6">
                                        Show re-open button
                                    </Text>
                                    <label className="switch">
                                        <input type="checkbox" onClick={() => {
                                            setOpen({ ...open, switch: !open.switch, customize: false })
                                        }
                                        } />
                                        <span className="slider" ></span>
                                    </label>
                                </InlineGrid>
                                <Text as="p" variant="bodyMd">
                                    Provide a re-opener to allow customers a way to change their consent selections.
                                </Text>
                            </BlockStack>
                            {open.switch ?
                                <Box padding="200">
                                    <Text as="p" fontWeight="medium">
                                        Display re-open button as:
                                    </Text>
                                    <InlineGrid columns={2} alignItems="center">
                                        <ChoiceList
                                            title=""
                                            choices={[
                                                { label: 'Text', value: 'text' },
                                                { label: 'Icon', value: 'icon' },
                                            ]}
                                            selected={selected}
                                            onChange={(value) => {
                                                setOpen({ ...open, customize: false });
                                                setSelected(value);
                                            }
                                            }
                                        />
                                        {selected[0] === "text" ?
                                            <Box>
                                                <InlineGrid columns={2} alignItems="center">
                                                    <Text variant="headingMd" as="h6">
                                                        Preview:
                                                    </Text>
                                                    <Box padding="400" background="bg-surface-hover">
                                                        <Box padding="200" background="bg-fill-warning" borderRadius="200">
                                                            <Text variant="bodyLg" as="p" alignment="center">
                                                                {dataText.name}
                                                            </Text>
                                                        </Box>
                                                    </Box>
                                                </InlineGrid>
                                            </Box>
                                            :
                                            <></>
                                        }
                                    </InlineGrid>

                                    <Box padding="300">
                                        <BlockStack gap="400">
                                            {selected[0] === "text" ?
                                                <>
                                                    <InlineGrid columns={3} alignItems="center" gap="400">
                                                        <TextField
                                                            label="Re-open button text"
                                                            value={dataText.name}
                                                            clearButton
                                                            onChange={(value) => setDataText({ ...dataText, name: value })}
                                                            autoComplete="off"
                                                        />
                                                        <TextField
                                                            label="Re-open text color"
                                                            value={dataText.colorText}
                                                            autoComplete="off"
                                                        />
                                                        {/* <ColorPicker onChange={(color) => setDataText({ ...dataText, colorText: color })} color={dataText.colorText} />; */}
                                                        <TextField
                                                            label="Re-open background color"
                                                            value={dataText.colorBackGround}
                                                            onChange={(value) => setDataText({ ...dataText, colorBackGround: value })}
                                                            autoComplete="off"
                                                        />
                                                    </InlineGrid>
                                                    <InlineGrid columns={2} alignItems="center" gap="400">
                                                        <Select
                                                            label="Position"
                                                            options={options}
                                                            onChange={(value) => setDataText({ ...dataText, selectedP: value })}
                                                            value={dataText.selectedP}
                                                        />
                                                        <TextField
                                                            label="Horizontal margin"
                                                            type="number"
                                                            value={dataText.horizontal}
                                                            onChange={(value) => setDataText({ ...dataText, horizontal: value })}
                                                            autoComplete="off"
                                                            suffix={"px"}
                                                        />
                                                    </InlineGrid>
                                                </>
                                                :
                                                <>
                                                    <InlineStack gap="300" >
                                                        <Box>
                                                            <Thumbnail
                                                                source={image.source}
                                                                size="small"
                                                                alt={image.alt}
                                                            />
                                                        </Box>
                                                        <Button variant="plain" onClick={() => setOpen({ ...open, customize: !open.customize })}>Customize icon</Button>
                                                    </InlineStack>
                                                    <InlineGrid columns={3} alignItems="center" gap="400">
                                                        <Select
                                                            label="Position"
                                                            options={options}
                                                            onChange={(value) => setDataText({ ...dataText, selectedP: value })}
                                                            value={dataText.selectedP}
                                                        />
                                                        <Autocomplete
                                                            options={options}
                                                            selected={dataText.selectedP}
                                                            onSelect={(selected) => setDataText({ ...dataText, selectedP: selected })}
                                                            textField={(<Autocomplete.TextField
                                                                label="Position"
                                                                value={selectedOption ? selectedOption.label : ''}
                                                                autoComplete="off"
                                                            />)}
                                                        />
                                                        <TextField
                                                            label="Horizontal margin"
                                                            type="number"
                                                            value={dataText.horizontal}
                                                            onChange={(value) => setDataText({ ...dataText, horizontal: value })}
                                                            autoComplete="off"
                                                            suffix={"px"}

                                                        />
                                                        <TextField
                                                            label="Vertical margin"
                                                            type="number"
                                                            value={dataText.vertical}
                                                            onChange={(value) => setDataText({ ...dataText, vertical: value })}
                                                            autoComplete="off"
                                                            suffix={"px"}

                                                        />
                                                    </InlineGrid>
                                                </>
                                            }
                                        </BlockStack>
                                    </Box>
                                </Box>
                                :
                                <>
                                </>
                            }
                        </Card>
                        {open.customize ?
                            <Banner
                                hideIcon
                                tone="warning"
                                title="Pick logo from the gallery"
                                onDismiss={() => { setOpen({ ...open, customize: !open.customize }) }}
                            >
                                <BlockStack gap="500">
                                    <Grid columns={{ xs: 7, sm: 7, md: 10, lg: 12, xl: 14 }} >
                                        {list.map((image, index) => (
                                            <Grid.Cell key={index} >
                                                <div onClick={() => setImage(image)}>
                                                    <Thumbnail
                                                        source={image.source}
                                                        alt={image.alt}
                                                        size="large"
                                                    />
                                                </div>
                                            </Grid.Cell>
                                        ))}
                                    </Grid>
                                    <DropZone onDrop={handleDrop} >
                                        <Grid columns={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                                            <Grid.Cell columnSpan={{ xs: 5, sm: 5, md: 5, lg: 5, xl: 5 }}>
                                                <Box padding="800">
                                                    <Text variant="headingMd" as="h6" alignment="center">
                                                        Upload file icon
                                                    </Text>
                                                    <Text variant="bodyLg" as="p" alignment="center">
                                                        Format PNG or JPG /Maximum size 1MB
                                                    </Text>
                                                    <Text variant="bodyLg" as="p" alignment="center">
                                                        Update may takke up to minute propagate to the live store.
                                                    </Text>
                                                </Box>
                                            </Grid.Cell>
                                            <Grid.Cell columnSpan={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1 }}   >
                                                <div style={{ width: '100%', height: '100%', padding: '7px' }}>
                                                    <img style={{ width: '100%', height: '100%', borderRadius: '5px' }}
                                                        src={image.source}>
                                                    </img>
                                                </div>
                                            </Grid.Cell>
                                        </Grid>
                                    </DropZone>
                                </BlockStack>
                            </Banner>
                            :
                            <>
                            </>
                        }
                    </BlockStack>
                </Layout>
            </Page >
        </Frame >
    )
}
export default ReOpener;
