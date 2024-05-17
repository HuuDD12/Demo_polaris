import React, { useEffect, useState } from "react";
import { Page, Text, Layout, Card, BlockStack, Link, InlineStack, List, Icon, Checkbox, Frame, Navigation } from '@shopify/polaris';
import { XIcon, CheckIcon, HomeIcon, OrderIcon, ProductIcon } from '@shopify/polaris-icons';
import { DropZone, Thumbnail } from '@shopify/polaris';

import '../../assets/css/animated.css'
import { Input, InputNumber, Radio } from "antd";
import TextArea from "antd/es/input/TextArea";
const PolarisDemo: React.FC = () => {
    // const [fileList, setFileList] = useState<UploadFile[]>([]);
    // const [justify, setJustify] = React.useState<FlexProps['justify']>(justifyOptions[0]);
    // const [alignItems, setAlignItems] = React.useState<FlexProps['align']>(alignOptions[0]);
    const [checkBox, setCheckBox] = useState<{ image: Boolean, dataT: boolean, dataDes: boolean, outline: boolean }>({ image: false, dataT: false, dataDes: false, outline: false });
    const [banner, setBanner] = useState<any>({ sizeT: 'large', colorT: '#1677ff', sizeD: 'large', colorD: '#1677ff', colorB: '#1677ff', img: null, textAlign: 'center', border: 0});
    const [image, setImage] = useState<any>(null);

    const handleDropZoneDrop = (files: any) => {
        const file = files[0]; // chỉ xử lý file đầu tiên nếu có nhiều hơn một file được thả
        const reader = new FileReader();
        setCheckBox({ ...checkBox, image: true });
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(file);
        let tmp = [];
        tmp.push(URL.createObjectURL(file));
        const objectUrls = tmp;
        setBanner({ ...banner, img: objectUrls });
    };
    useEffect(() => {

    }, [banner.img]);
    return (
        <Page fullWidth
        title=" Demo Banner Polaris"
        backAction={{ content: '', url: '/' }}
  
        subtitle="Perfect for any pet"
        >
        <Layout>
            <Layout.Section>
                <BlockStack gap="500">
                    <Card>
                        <InlineStack align="space-between">

                            <Text as="h2" variant="headingMd">
                                Custom banner :
                            </Text>
                            <Checkbox label="Title" checked={checkBox.dataT}
                                onChange={(newChecked) => { setCheckBox({ ...checkBox, dataT: newChecked }) }} />
                            <Checkbox label="Description" checked={checkBox.dataDes}
                                onChange={(newChecked) => { setCheckBox({ ...checkBox, dataDes: newChecked }) }} />
                        </InlineStack>
                    </Card>
                    <Card>
                        <InlineStack align="space-between" >
                            <Text as="h3" variant="headingMd"  >Choice Image :</Text>
                            <DropZone onDrop={handleDropZoneDrop} accept="image/*" >
                                {image ? <Thumbnail source={image} alt="Uploaded Image" size="large" /> : 'Thả hoặc chọn ảnh để tải lên'}
                            </DropZone>
                        </InlineStack>
                    </Card>
                    <div className={`${checkBox.dataT || checkBox.dataDes ? '' : 'hidden'}`}>
                        <Card>
                            <InlineStack align="space-between">
                                <Text as="h3" variant="headingMd"> Choice type of text : </Text>
                                <Checkbox label="Outline" checked={checkBox.outline}
                                    onChange={(newChecked) => { setCheckBox({ ...checkBox, outline: newChecked }) }} />
                            </InlineStack>
                            <div className={`${checkBox.outline ? 'hidden':''}`}>
                            <InlineStack align="space-between">
                                <Text as="h3" variant="headingMd"> Border of text : </Text>
                                <InputNumber min={0} max={50} defaultValue={0} onChange={(value)=>{setBanner({...banner,border :value})}} />
                            </InlineStack>
                            </div>
                        </Card>
                    </div>
                    <div className={`${checkBox.dataT ? '' : 'hidden'}`}>
                        <Card>
                            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3">
                                <strong className='font-serif text-sm col-span-1'>Size Title text  </strong>
                                <div className='col-span-2'>
                                    <Radio.Group value={banner.sizeT} onChange={(e) => setBanner((prevState: any) => ({
                                        ...prevState, sizeT: e.target.value
                                    }))}>
                                        <Radio.Button value="large">Large</Radio.Button>
                                        <Radio.Button value="small">Small</Radio.Button>
                                    </Radio.Group>
                                </div>
                                <strong className='font-serif text-sm col-span-1'>Type Title text  </strong>
                                <div className='col-span-2'>
                                    <Radio.Group value={banner.flexT} onChange={(e) => setBanner((prevState: any) => ({
                                        ...prevState, flexT: e.target.value
                                    }))}>
                                        <Radio.Button value="flex-start">Flex-start</Radio.Button>
                                        <Radio.Button value="center">Center</Radio.Button>
                                        <Radio.Button value="flex-end">Flex-end</Radio.Button>
                                    </Radio.Group>
                                </div>
                                <strong className='font-serif text-sm col-span-1'>fontSize Title text  </strong>
                                <div className='col-span-2'>
                                <InputNumber min={0} max={50} defaultValue={15} onChange={(value)=>{setBanner({...banner,fontSizeH :value})}} />
                                </div>
                                <strong className='font-serif text-sm col-span-1'>Choice color Title : </strong>
                                <div className='col-span-2'>
                                    <Input
                                        addonBefore={banner.colorT}
                                        type="color"
                                        value={banner.colorT}
                                        onChange={(e) => setBanner({ ...banner, colorT: e.target.value })}
                                        className="w-40"
                                    />
                                </div>
                                <strong className='font-serif text-sm col-span-1 '>Input Title text  </strong>

                                <div className='col-span-2'>
                                    <TextArea rows={4} placeholder="maxLength is 55" onChange={(e) => setBanner((prevState: any) => ({
                                        ...prevState, title: e.target.value
                                    }))} maxLength={55} />
                                </div>
                            </div>
                        </Card>
                    </div>
                    <div className={`${checkBox.dataDes ? '' : 'hidden'}`}>
                        <Card>
                            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3">
                                <strong className='font-serif text-sm col-span-1'>Size Description text  </strong>
                                <div className='col-span-2'>
                                    <Radio.Group value={banner.sizeD} onChange={(e) => setBanner((prevState: any) => ({
                                        ...prevState, sizeD: e.target.value
                                    }))}>
                                        <Radio.Button value="large">Large</Radio.Button>
                                        <Radio.Button value="small">Small</Radio.Button>
                                    </Radio.Group>
                                </div>
                                <strong className='font-serif text-sm col-span-1'>Type Description text  </strong>
                                <div className='col-span-2'>
                                    <Radio.Group value={banner.flexD} onChange={(e) => setBanner((prevState: any) => ({
                                        ...prevState, flexD: e.target.value
                                    }))}>
                                        <Radio.Button value="flex-start">Flex-start</Radio.Button>
                                        <Radio.Button value="center">Center</Radio.Button>
                                        <Radio.Button value="flex-end">Flex-end</Radio.Button>
                                    </Radio.Group>
                                </div>
                                <strong className='font-serif text-sm col-span-1'>fontSize Description text  </strong>
                                <div className='col-span-2'>
                                <InputNumber min={0} max={50} defaultValue={15} onChange={(value)=>{setBanner({...banner,fontSizeP :value})}} />
                                </div>
                                <strong className='font-serif text-sm col-span-1'>Choice color Description : </strong>
                                <div className='col-span-2'>
                                    <Input
                                        addonBefore={banner.colorD}
                                        type="color"
                                        value={banner.colorD}
                                        onChange={(e) => setBanner({ ...banner, colorD: e.target.value })}
                                        className="w-40"
                                    />
                                </div>
                                <strong className='font-serif text-sm col-span-1 '>Input Description text  </strong>

                                <div className='col-span-2'>
                                    <TextArea rows={4} placeholder="maxLength is 255" onChange={(e) => setBanner((prevState: any) => ({
                                        ...prevState, description: e.target.value
                                    }))} maxLength={255} />
                                </div>
                            </div>
                        </Card>

                    </div>
                </BlockStack>
            </Layout.Section>
            <Layout.Section variant="oneThird">
                <BlockStack gap="500">
                    <Card>
                        <BlockStack gap="200">
                            <Text as="h2" variant="headingMd">
                                View Banner
                            </Text>
                            <BlockStack gap="200">
                                <InlineStack align="space-between">
                                    <Text as="span" variant="bodyMd">
                                        Image
                                    </Text>
                                    {checkBox && checkBox.image === false ? (
                                        <div className="animatedX-icon">
                                            <Icon source={XIcon} />
                                        </div>
                                    ) : (
                                        <div className="animatedV-icon">
                                            <Icon source={CheckIcon} />
                                        </div>
                                    )}
                                </InlineStack>
                                <InlineStack align="space-between">
                                    <Text as="span" variant="bodyMd">
                                        Title
                                    </Text>
                                    {checkBox && checkBox.dataT === false ? (
                                        <div className="animatedX-icon">
                                            <Icon source={XIcon} />
                                        </div>
                                    ) : (
                                        <div className="animatedV-icon">
                                            <Icon source={CheckIcon} />
                                        </div>
                                    )}
                                </InlineStack>
                                <InlineStack align="space-between">
                                    <Text as="span" variant="bodyMd">
                                        Description
                                    </Text>
                                    {checkBox && checkBox.dataDes === false ? (
                                        <div className="animatedX-icon">
                                            <Icon source={XIcon} />
                                        </div>
                                    ) : (
                                        <div className="animatedV-icon">
                                            <Icon source={CheckIcon} />
                                        </div>
                                    )}
                                </InlineStack>
                                <InlineStack align="space-between">
                                    <Text as="span" variant="bodyMd">
                                        Outline
                                    </Text>
                                    {checkBox && checkBox.outline === false ? (
                                        <div className="animatedX-icon">
                                            <Icon source={XIcon} />
                                        </div>
                                    ) : (
                                        <div className="animatedV-icon">
                                            <Icon source={CheckIcon} />
                                        </div>
                                    )}
                                </InlineStack>
                            </BlockStack>
                        </BlockStack>
                    </Card>
                    <Card>
                        <BlockStack gap="200">
                            <div className={` ${banner.img === null ? 'hidden' : ''} banner-container border-solid border-2 border-[#020617] rounded-lg`}>
                                <img className="banner-image" src={banner.img} alt="Banner Image" />
                                <div className={`${checkBox.dataT || checkBox.dataDes ? '' : 'hidden'} banner-content`} style={{ textAlign: banner.textAlign,borderRadius: banner.border, backgroundColor: checkBox.outline ? 'initial' : ''}}  >
                                    <h2 className="banner-title" style={{color: banner.colorT,fontSize: banner.fontSizeH,}}>{banner.title}</h2>
                                    <p className="banner-description" style={{color: banner.colorD,fontSize: banner.fontSizeP,}} >{banner.description}</p>
                                </div>
                            </div>
                        </BlockStack>
                    </Card>
                </BlockStack>
            </Layout.Section>
        </Layout>
        </Page>
    )
}

export default PolarisDemo;