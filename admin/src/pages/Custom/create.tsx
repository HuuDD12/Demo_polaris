import { FormLayout, Layout, LegacyCard, Page, Select, TextField, Text, IndexTable, useIndexResourceState, PageActions } from "@shopify/polaris"
import { useEffect, useState } from "react";
import { Input, Switch, Pagination as PaginationAnt } from 'antd';
import { useAppDispatch, useAppSelector } from "@/hooks";
import { createCustomButonActive, getAllProduct } from "@/redux/actions/product";


const { TextArea } = Input;
const options = [
    { label: 'Multi-line', value: '1' },
    { label: 'Single-line', value: '0' },
];
const optionsInput = [
    { label: 'All(Text, number)', value: '0' },
    { label: 'Only Number', value: '1' },
    { label: 'Email', value: '2' },
];
const optionsStyle = [
    { label: 'Textbox font', value: '0' },
    { label: 'Only Number', value: '1' },
    { label: 'Email', value: '2' },
];

const CreateF: React.FC = () => {
    const dispatch = useAppDispatch();
    const [data, setData] = useState<any>({
        // fieldName: '',
        fieldSize: '0',
        switch: '0',
        textfield: 'Here you can write notes',
        helpText: 'Here you can write helptext',
        textfieldSize: '14',
        helpTextSize: '14',
        rounded: 0,
        select: '0',
        width: '0',
        style: '',
        labelColor: '#000000',
        roundedColor: '#000000',
        length: 20,
        message: 'Please enter a text before adding'
    });
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(5);
    const dataP: any = useAppSelector((app) => app.Product.product);
    const [pagination, setPagination] = useState<any>();
    const [text, setText] = useState('');
    const [remainingChars, setRemainingChars] = useState(data.length);

    const handleChange = (event: any) => {
        const inputText = event.target.value;
        setText(inputText);
        setRemainingChars(data.length - inputText.length);
    };
    useEffect(() => {
        dispatch(getAllProduct({ page: page, pageSize: pageSize }));
    }, [dispatch, page, pageSize]);
    const { selectedResources, allResourcesSelected, handleSelectionChange } = useIndexResourceState(dataP);
    const rowMarkup = dataP.products.map(({ id, title, image }: { id: any, title: any, image: any }, index: number) => (
        <IndexTable.Row
            id={id}
            key={id}
            selected={selectedResources.includes(id)}
            position={index}
        >
            <IndexTable.Cell>
                <Text variant="bodyMd" fontWeight="bold" as="span">
                    {title}
                </Text>
            </IndexTable.Cell>
            <IndexTable.Cell>
                {image && <img className="w-24 h-auto" src={image.src} alt={title} />} {/* Hiển thị hình ảnh nếu có */}
            </IndexTable.Cell>
        </IndexTable.Row>
    ));
    useEffect(() => {
        setPagination({
            total: dataP.pagi?.total,
            defaultCurrent: dataP.pagi?.current,
            defaultPageSize: dataP.pagi?.pageSize,
            pageSizeOptions: [1, 5, 10],
            showSizeChanger: true,
            showTotal: (total: any, range: any) => `${range[0]}-${range[1]} of ${total} items`,
            onShowSizeChange: (defaultPageSize: number, newSize: number) => {
                setPage(1);
                setPageSize(newSize)
            },
            onChange: (newPage: number) => setPage(newPage),
        });
    }, [dispatch, page, pageSize, dataP]);
    const checkMaxAndMin = (name: string, max: number, min: number, value: any) => {
        let newValue = parseInt(value);
        if (newValue < min) {
            setData({ ...data, [name]: min });
        } else if (newValue > max) {
            setData({ ...data, [name]: max });
        } else {
            setData({ ...data, [name]: newValue });
        }
    };
    console.log(dataP);
    return (
        <Page fullWidth backAction={{ content: '', url: '/' }}
            title=" Demo Create custom "
            subtitle="Perfect for any pet">
            <Layout>
                <Layout.Section>
                    {/* <LegacyCard >
                        <div className="p-5">
                            <strong >Field Name : </strong>
                            <TextField label="" autoComplete="off" value={data.fieldName} onChange={(newValue) => setData({ ...data, fieldName: newValue })} />
                        </div>
                    </LegacyCard> */}
                    <LegacyCard>
                        <div>
                            <div className="p-5">
                                <div><strong>Textfield settings</strong></div>
                                <div><span>Here you can lable, translate, colorize and define further settings</span></div>
                            </div>
                            <hr className="border-solid border border-[#f1f1f1] w-full" />
                            <div className="p-5">
                                <FormLayout>
                                    {data.fieldSize === '0' ? <Select
                                        label="Field Size"
                                        options={options}
                                        onChange={(newValue) => setData({ ...data, fieldSize: newValue })}
                                        value={data.fieldSize}
                                    /> : <FormLayout.Group ><Select
                                        label="Field Size"
                                        options={options}
                                        onChange={(newValue) => setData({ ...data, fieldSize: newValue })}
                                        value={data.fieldSize}
                                    /><Select
                                            label="Switch of  resize"
                                            options={[{ label: 'Yes', value: '1' }, { label: 'No', value: '0' },]}
                                            onChange={(newValue) => setData({ ...data, switch: newValue })}
                                            value={data.switch}
                                        /></FormLayout.Group >}
                                    <TextField label="Textfield heading" autoComplete="off" value={data.textfield} onChange={(newValue) => setData({ ...data, textfield: newValue })} maxLength={40}
                                        showCharacterCount />
                                    <TextField label="Helptext (placeholder)" autoComplete="off" value={data.helpText} onChange={(newValue) => setData({ ...data, helpText: newValue })} maxLength={40}
                                        showCharacterCount />
                                    <FormLayout.Group condensed>
                                        <TextField min={10} max={37} value={data.textfieldSize} type="number" prefix={<strong>px</strong>} label="General font size" onChange={(newValue) => checkMaxAndMin('textfieldSize', 37, 10, newValue)} autoComplete="off" />
                                        <TextField min={10} max={37} value={data.helpTextSize} type="number" prefix={<strong>px</strong>} label="Placeholder font size" onChange={(newValue) => checkMaxAndMin('helpTextSize', 37, 10, newValue)} autoComplete="off" />
                                    </FormLayout.Group>
                                    <FormLayout.Group condensed>
                                        <TextField value={data.rounded} type="number" prefix={<strong>px</strong>} label="Rounded corners" onChange={(newValue) => setData({ ...data, rounded: newValue })} autoComplete="off" min={0} />
                                        <Select value={data.select} options={optionsInput} label="Allowed input" onChange={(newValue) => setData({ ...data, select: newValue })} />
                                    </FormLayout.Group>
                                    <FormLayout.Group condensed>
                                        <Select value={data.style} options={optionsStyle} label="Font style" onChange={(newValue) => setData({ ...data, style: newValue })} />
                                        <Select value={data.width} options={[{ label: 'Auto', value: '0' }, { label: 'Full', value: '1' }]} label="Field width" onChange={(newValue) => setData({ ...data, width: newValue })} />
                                    </FormLayout.Group>
                                    <FormLayout.Group condensed>
                                        <div>
                                            <p>Label color</p>
                                            <Input type="color" value={data.labelColor} onChange={(e) => setData({ ...data, labelColor: e.target.value })} />
                                        </div>
                                        <div>
                                            <p>Rounded color</p>
                                            <Input type="color" value={data.roundedColor} onChange={(e) => setData({ ...data, roundedColor: e.target.value })} />
                                        </div>
                                    </FormLayout.Group>
                                </FormLayout>
                            </div>
                        </div>
                    </LegacyCard>
                    <LegacyCard>
                        <div className="p-5">

                            <FormLayout>
                                <FormLayout.Group >
                                    <div className="flex items-center justify-between">
                                        <Text as="p" fontWeight="regular">
                                            Enforce a maximum length ?
                                        </Text>
                                        <Switch value={data.checkLength} onChange={(checked) => setData({ ...data, checkLength: checked })} />
                                    </div>
                                </FormLayout.Group>
                                {data.checkLength === true ?
                                    <FormLayout.Group >
                                        <TextField type="number"
                                            label="Textfield maximum lenght (min: 20, max: 255)"
                                            value={data.length}
                                            onChange={(newValue) => checkMaxAndMin('length', 255, 20, newValue)}
                                            autoComplete="off" min={20} max={255}
                                        />
                                    </FormLayout.Group> :
                                    <></>}
                                <FormLayout.Group >
                                    <div className="flex items-center justify-between">
                                        <Text as="p" fontWeight="regular">
                                            Make the text field required ?
                                        </Text>
                                        <Switch value={data.checkRequired} onChange={(checked) => setData({ ...data, checkRequired: checked })} />
                                    </div>
                                </FormLayout.Group>
                                {data.checkRequired === true ?
                                    <FormLayout.Group ><TextField type="text" label="Textfield required error message" value={data.message} onChange={(newValue) => setData({ ...data, message: newValue })} autoComplete="off" /></FormLayout.Group> : <></>}
                                <FormLayout.Group >
                                    <div className="flex items-center justify-between">
                                        <Text as="p" fontWeight="regular">
                                            Activate RTL (right to left) ?
                                        </Text>
                                        <Switch value={data.checkRtl} onChange={(checked) => setData({ ...data, checkRtl: checked })} />
                                    </div>
                                </FormLayout.Group>
                            </FormLayout>
                        </div>

                    </LegacyCard>
                    <div className="h-40"></div>
                </Layout.Section>
                <Layout.Section variant="oneThird">
                    <div className="fixed w-1/3">
                        <LegacyCard>

                            <div className="p-5">
                                <strong className="flex items-center justify-start h-10"> Choice Options :</strong>
                                <IndexTable
                                    itemCount={dataP.products.length}
                                    selectedItemsCount={
                                        allResourcesSelected ? 'All' : selectedResources.length
                                    }
                                    onSelectionChange={handleSelectionChange}
                                    headings={[
                                        // { title: 'ID' },
                                        { title: 'Title' },
                                        { title: 'Image' },
                                    ]}
                                >
                                    {dataP ? <>{rowMarkup}</> : <></>}
                                </IndexTable>
                                <hr className="w-full border-solid border border-[#f1f1f1] " />
                                <div className="flex justify-center items-center mb-2">
                                    {dataP.pagi?.total != null ? <PaginationAnt  {...pagination} /> : <></>}
                                </div>
                            </div>
                            <hr className="border-solid border border-[#f1f1f1]" />
                            <strong className="flex items-center justify-center h-10"> Live Preview </strong>
                            <hr className="border-solid border border-[#f1f1f1]" />
                            <div className="p-5 ">
                                <strong style={{ fontSize: parseInt(data.textfieldSize), color: data.labelColor }}>{data.textfield}</strong>
                                {data.fieldSize === '0' ?
                                    <input style={{ fontSize: parseInt(data.helpTextSize), borderRadius: parseInt(data.rounded), borderColor: data.roundedColor, width: '100%', height: '100%' }}
                                        placeholder={data.helpText}
                                        value={text}
                                        onChange={handleChange}
                                        maxLength={data.checkLength ? data.length : undefined}
                                    /> :
                                    <textarea style={{ fontSize: parseInt(data.helpTextSize), borderRadius: parseInt(data.rounded), borderColor: data.roundedColor, width: '100%', height: '100%' }}
                                        placeholder={data.helpText}
                                        value={text}
                                        onChange={handleChange}
                                        maxLength={data.checkLength ? data.length : undefined}
                                    />
                                }
                                {data.checkLength && <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>{remainingChars} / {data.length}</span>}

                            </div>
                        </LegacyCard>
                        <PageActions
                            secondaryActions={[
                                {
                                    content: 'Save',
                                    onAction: () => dispatch(createCustomButonActive(data)),
                                },
                            ]}
                        />
                    </div>
                </Layout.Section>
            </Layout>
        </Page >
    )
}
export default CreateF;