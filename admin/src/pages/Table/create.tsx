import { PageActions, DropZone, Layout, LegacyCard, Page, Text, Thumbnail, FormLayout, TextField, Select, Checkbox, Tooltip, Link } from "@shopify/polaris"
import { Input } from "antd";
import React, { useState } from "react";
import {
    SearchIcon
} from '@shopify/polaris-icons';
import { checkPrime } from "crypto";
const Create: React.FC = () => {
    const [image, setImage] = useState<any>(null);
    const [data, setData] = useState<any>({ select: '0', checkInven: false, checkPro: false, checkC: false, track: 0, checkShiping: false });

    const handleDropZoneDrop = (files: any) => {
        const file = files[0]; // chỉ xử lý file đầu tiên nếu có nhiều hơn một file được thả
        const reader = new FileReader();
        // setCheckBox({ ...checkBox, image: true });
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(file);
        let tmp = [];
        tmp.push(URL.createObjectURL(file));
        const objectUrls = tmp;
        // setBanner({ ...banner, img: objectUrls });
    };

    const options: any = [
        { label: 'Active', value: '1' },
        { label: 'Draft', value: '0' },
    ];
    console.log(data);
    return (
        <Page fullWidth
            backAction={{ content: '', url: '/table' }}
            title=" Demo Create Polaris"
            subtitle="Perfect for any pet"
        >
            <Layout>
                <Layout.Section>
                    <LegacyCard >
                        <div className="p-5">
                            <FormLayout>
                                <TextField label="Title" onChange={(newValue: any) => setData({ ...data, title: newValue })} value={data.title} autoComplete="off" />
                                <TextField
                                    type="email"
                                    label="Account email"
                                    value={data.email}
                                    onChange={(newValue: any) => setData({ ...data, email: newValue })}
                                    autoComplete="email"
                                />
                            </FormLayout>
                        </div>
                    </LegacyCard>
                    <LegacyCard title="Image" >
                        <div className="p-5">
                            <DropZone onDrop={handleDropZoneDrop} accept="image/*" >
                                {image ? <Thumbnail source={image} alt="Uploaded Image" size="large" /> : 'Thả hoặc chọn ảnh để tải lên'}
                            </DropZone>
                        </div>
                    </LegacyCard>
                    <LegacyCard title="Pricing" >
                        <div className="p-5 grid grid-cols-3 gap-4">
                            <div className="col-span-3 md:col-span-2 sm:col-span-2 ">
                                <FormLayout>
                                    <FormLayout.Group condensed>
                                        <TextField
                                            label="Price"
                                            placeholder="0"
                                            prefix={
                                                <div style={{ textDecoration: 'underline' }}><Text as="span">
                                                    đ
                                                </Text></div>}
                                            onChange={() => { }}
                                            autoComplete="off"
                                        />
                                        <TextField
                                            prefix={
                                                <div style={{ textDecoration: 'underline' }}><Text as="span">
                                                    đ
                                                </Text></div>}
                                            suffix={<div><Tooltip active content="This order has shipping labels.">
                                                <Text fontWeight="bold" as="span">
                                                    <svg className="w-5 h-auto flex items-center justify-center" width="256px" height="256px" viewBox="0 0 21.00 21.00" xmlns="http://www.w3.org/2000/svg" fill="#8a8a8a" stroke="#8a8a8a" stroke-width="1.2389999999999999"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill="none" fill-rule="evenodd" transform="translate(2 2)"> <circle cx="8.5" cy="8.5" r="8" stroke="#8a8a8a" stroke-linecap="round" stroke-linejoin="round"></circle> <path d="m8.5 9.5v-1l1.41421356-1.41421356c.37507274-.37507276.58578644-.88378059.58578644-1.41421356v-.17157288c0-.61286606-.3462631-1.17313156-.89442719-1.4472136l-.21114562-.1055728c-.56305498-.2815275-1.2257994-.2815275-1.78885438 0l-.10557281.0527864c-.61286606.30643303-1 .9328289-1 1.61803399v.88196601" stroke="#8a8a8a" stroke-linecap="round" stroke-linejoin="round"></path> <circle cx="8.5" cy="12.5" fill="#8a8a8a" r="1"></circle> </g> </g></svg>
                                                </Text>
                                            </Tooltip></div>}
                                            label="Compare-at price"
                                            onChange={() => { }}
                                            autoComplete="off"
                                            placeholder="0"
                                        />
                                    </FormLayout.Group>
                                </FormLayout>

                            </div>

                            <div className="col-span-3 ">
                                <Checkbox label="Charge tax on this product" checked={data.checkC} onChange={(newChecked: any) => setData({ ...data, checkC: newChecked })}></Checkbox>
                            </div>
                            <div className="col-span-3 md:col-span-3">
                                <FormLayout>

                                    <FormLayout.Group condensed>
                                        <TextField label="Cost per item" onChange={() => { }} autoComplete="off" />
                                        <TextField label="Profit" onChange={() => { }} autoComplete="off" />
                                        <TextField label="Margin" onChange={() => { }} autoComplete="off" />
                                    </FormLayout.Group>
                                </FormLayout>
                            </div>
                        </div>
                    </LegacyCard>
                    <LegacyCard title="Inventory" >
                        <div className="p-5">
                            <Checkbox label="Track quantity " checked={data.checkInven} onChange={(newChecked: boolean) => setData({ ...data, checkInven: newChecked })}></Checkbox>
                        </div>
                        <div>
                            <strong className="ml-4">Quantity</strong>
                            <hr className="border-solid border border-[#f1f1f1] m-5" />
                            <div className="grid grid-cols-4 gap-4">
                                <div className="col-start-1 col-end-1 ml-5 ">Shop location</div>
                                {data.checkInven === true ?
                                    <div className="col-start-4 col-end-4 flex jusyify-center items-center mr-5">
                                        <TextField
                                            label=""
                                            type="number"
                                            value={data.track}
                                            onChange={(newValue) => setData({ ...data, track: newValue })}
                                            autoComplete="off" /></div> :
                                    <span className="col-start-4 col-end-4 flex jusyify-center items-center">Not tracked</span>
                                }
                            </div>
                        </div>
                        {data.checkInven === true ? <div className="p-5">
                            <Checkbox label="Continue selling when out of stock"
                                helpText={
                                    <Text as="h2">
                                        This won't affect{' '}
                                        <Link url="https://polaris.shopify.com/components/actions/account-connection?example=account-connection-default">Shopify POS</Link>. Staff will see a warning, but can complete sales when available inventory reaches zero and below.
                                    </Text>
                                }
                                checked={data.checkCo} onChange={(newChecked: boolean) => setData({ ...data, checkCo: newChecked })}></Checkbox>
                        </div> : <></>}
                        <div className="p-5">
                            <Checkbox label="This product has a SKU or barcode" checked={data.checkPro} onChange={(newChecked: boolean) => setData({ ...data, checkPro: newChecked })}></Checkbox>
                        </div>
                        {data.checkPro === true ? <div className="p-5">
                            <FormLayout>
                                <FormLayout.Group>
                                    <TextField
                                        type="text"
                                        label="SKU (Stock Keeping Unit)"
                                        onChange={() => { }}
                                        autoComplete="off"
                                    />
                                    <TextField
                                        type="text"
                                        label="Barcode (ISBN, UPC, GTIN, etc.)"
                                        onChange={() => { }}
                                        autoComplete="off"
                                    />
                                </FormLayout.Group>
                            </FormLayout>
                        </div> : <></>}
                    </LegacyCard>
                    <LegacyCard title="Shipping">

                        <div>
                            <div className="p-5">
                                <Checkbox label="This is a physical product" checked={data.checkShiping} onChange={(newChecked: boolean) => setData({ ...data, checkShiping: newChecked })}></Checkbox>
                            </div>
                            <hr className="border-solid border border-[#f1f1f1]" />
                            <div className="p-5">
                                {data.checkShiping === true ? <></> : <Text as="h2">
                                    Customers won’t enter shipping details at checkout. Learn how to set up your store for{' '}
                                    <Link url="https://polaris.shopify.com/components/actions/account-connection?example=account-connection-default"> digital products or services.</Link>.
                                </Text>}
                            </div>
                        </div>
                    </LegacyCard>
                </Layout.Section>
                <Layout.Section variant="oneThird">
                    <LegacyCard title="Status" sectioned>
                        <Select
                            label=""
                            options={options}
                            onChange={(value: string) => setData({ ...data, select: value })}
                            value={data.select}
                        />
                    </LegacyCard>
                    <LegacyCard title="Tags" sectioned>
                        <p>Add tags to your order.</p>
                    </LegacyCard>
                </Layout.Section>
            </Layout>
            <PageActions
                secondaryActions={[
                    {
                        content: 'Save',
                        onAction: () => alert('Save action'),
                    },
                ]}

            />

        </Page>
    )
}
export default Create;