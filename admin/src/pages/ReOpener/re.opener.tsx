import { Autocomplete, Banner, BlockStack, Box, Button, Card, ChoiceList, ColorPicker, Combobox, DropZone, Frame, Grid, Icon, InlineGrid, InlineStack, Layout, LegacyCard, Modal, Page, Select, Text, TextField, Thumbnail, Toast } from "@shopify/polaris"
import { useCallback, useState } from "react";
import '@/assets/css/switch.css';
import { list } from "@/common/ListLogo";
import {
    SelectIcon, XIcon
} from '@shopify/polaris-icons';
import { changeHexColor } from "@/common/ChangeColorHex";

const options = [
    { label: 'Bottom - Left', value: '1' },
    { label: 'Bottom - Right', value: '2' },
    { label: 'Top - Left', value: '3' },
    { label: 'Top - Right', value: '4' },
];
const postion = [
    { top: 'start', left: 'end', value: '1' },
    { top: 'end', left: 'end', value: '2' },
    { top: 'start', left: 'start', value: '3' },
    { top: 'end', left: 'start', value: '4' },
];

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
    const [showModal, setShowModal] = useState<any>({ model: false, type: 0 });
    const [dataText, setDataText] = useState<any>({
        name: 'Manage Cookie',
        colorText: '#FFFFFF',
        colorBackGround: '#fec944',
        horizontal: 0,
        vertical: 0,
        selectedP: '1',

    });
    const [color, setColor] = useState({
        hue: 300,
        brightness: 1,
        saturation: 0.7,
        alpha: 0.7,
    });
    const [hex, setHex] = useState<any>();
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

    const handleColor = (value: any) => {
        setColor(value);
        setHex(changeHexColor(color));
    }
    const selectedOption = dataText.selectedP ? options.find(option => option.value === dataText.selectedP) : null;
    const selectedPostion = dataText.selectedP ? postion.find(option => option.value === dataText.selectedP) : null;

    const toastMarkup = active ? (
        <Toast content="Please upload a PNG or JPEG file smaller than 1MB." onDismiss={() => setActive(!active)} />
    ) : null;
    return (
        <Frame>
            <Page
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
                                    <InlineGrid columns="1fr auto">
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
                                        {selected[0] === "text" && <Grid columns={{ xs: 4, sm: 4, md: 4, lg: 4, xl: 4 }}  >
                                            <Grid.Cell columnSpan={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1 }}>
                                                <div style={{ height: '60px', display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                                                    <Text variant="headingMd" as="h6" >
                                                        Preview:
                                                    </Text>
                                                </div>
                                            </Grid.Cell>
                                            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 3, lg: 3, xl: 3 }}>
                                                <div style={{ backgroundColor: '#F1F1F1', padding: '5px', display: 'flex', justifyContent: selectedPostion?.top, alignItems: selectedPostion?.left, height: '60px' }}>
                                                    <text style={{
                                                        padding: '6px',
                                                        borderRadius: '4px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        backgroundColor: dataText.colorBackGround,
                                                        justifyContent: 'center',
                                                        color: dataText.colorText,
                                                        marginInline: dataText.horizontal + 'px',
                                                    }}>
                                                        {dataText.name}
                                                    </text>
                                                </div>
                                            </Grid.Cell>
                                        </Grid>}
                                    </InlineGrid>
                                    <Box padding="300">
                                        <BlockStack gap="400">
                                            {selected[0] === "text" ?
                                                <>
                                                    <InlineGrid columns={3} alignItems="center" gap="400">
                                                        <TextField
                                                            label="Re-open button text"
                                                            value={dataText.name}
                                                            onChange={(value) => setDataText({ ...dataText, name: value })}
                                                            autoComplete="off"
                                                        />
                                                        <div onClick={() => setShowModal({ model: true, type: 1 })} style={{ cursor: 'pointer' }}>
                                                            <TextField
                                                                label="Re-open text color"
                                                                value={dataText.colorText}
                                                                onChange={(value) => setDataText({ ...dataText, colorText: value })}
                                                                autoComplete="off"
                                                            />
                                                        </div>
                                                        <div onClick={() => setShowModal({ model: true, type: 2 })} style={{ cursor: 'pointer' }}>
                                                            <TextField
                                                                label="Re-open background color"
                                                                value={dataText.colorBackGround}
                                                                onChange={(value) => setDataText({ ...dataText, colorBackGround: value })}
                                                                autoComplete="off"

                                                            />
                                                        </div>
                                                    </InlineGrid>
                                                    <InlineGrid columns={2} alignItems="center" gap="400">
                                                        <Autocomplete
                                                            options={options}
                                                            selected={dataText.selectedP}
                                                            onSelect={(selected) => setDataText({ ...dataText, selectedP: selected[0] })}
                                                            textField={(<Autocomplete.TextField
                                                                label="Position"
                                                                value={selectedOption ? selectedOption.label : ''}
                                                                autoComplete="off"
                                                                suffix={
                                                                    <Icon
                                                                        source={SelectIcon}
                                                                        tone="base"
                                                                    />
                                                                }
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
                                                        <Autocomplete
                                                            options={options}
                                                            selected={dataText.selectedP}
                                                            onSelect={(selected) => setDataText({ ...dataText, selectedP: selected[0] })}
                                                            textField={(<Autocomplete.TextField
                                                                label="Position"
                                                                value={selectedOption ? selectedOption.label : ''}
                                                                autoComplete="off"
                                                                suffix={
                                                                    <Icon
                                                                        source={SelectIcon}
                                                                        tone="base"
                                                                    />
                                                                }
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
                    </BlockStack>
                </Layout>
                {showModal.model && (
                    <Modal
                        open={showModal}
                        onClose={() => setShowModal(false)}
                        title={`Choice Color ${showModal.type === 1 ? 'text' : 'background'}`}
                        primaryAction={{
                            content: 'Save',
                            onAction: () => {
                                if (hex !== null) {
                                    if (showModal.type === 1) {
                                        setDataText({ ...dataText, colorText: hex })
                                    } else {
                                        setDataText({ ...dataText, colorBackGround: hex })
                                    }
                                }
                                setShowModal({ model: false, type: 0 })
                            },
                        }}
                        secondaryActions={[
                            {
                                content: 'Cancel',
                                onAction: () => setShowModal({ model: false, type: 0 }),
                            },
                        ]}
                    >
                        <Modal.Section>
                            <InlineGrid columns="1fr auto">
                                <ColorPicker onChange={(value) => handleColor(value)} color={color} />
                                <Box>
                                    <TextField
                                        label="Color (Hex) "
                                        value={hex ? hex : ''}
                                        autoComplete="off"
                                    />
                                </Box>
                            </InlineGrid>
                        </Modal.Section>
                    </Modal>
                )}
                {open.customize && (
                    <Modal
                        open={showModal}
                        onClose={() => setOpen({ ...open, customize: false })}
                        title={`Pick logo from the gallery`}
                    >
                        <Modal.Section>
                            <Box padding="100">
                                <BlockStack gap="300">
                                    <Grid columns={{ xs: 10, sm: 10, md: 10, lg: 10, xl: 10 }} >
                                        {list.map((image, index) => (
                                            <Grid.Cell key={index} >
                                                <div onClick={() => setImage(image)} style={{ cursor: 'pointer' }}>
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
                                        <Grid columns={{ xs: 5, sm: 5, md: 5, lg: 5, xl: 5 }}>
                                            <Grid.Cell columnSpan={{ xs: 4, sm: 4, md: 4, lg: 4, xl: 4 }}>
                                                <Box padding="800">
                                                    <Text variant="headingMd" as="h6" alignment="center">
                                                        Upload file icon
                                                    </Text>
                                                    <Text variant="bodyMd" as="p" alignment="center">
                                                        Format PNG or JPG /Maximum size 1MB
                                                    </Text>
                                                    <Text variant="bodyMd" as="p" alignment="center">
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
                            </Box>
                        </Modal.Section>
                    </Modal>
                )}
            </Page >
        </Frame >
    )
}
export default ReOpener;
