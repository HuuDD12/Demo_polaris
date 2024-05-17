import React, { useState } from 'react'; // Import React if not already imported
import { Page, Card, Button, Icon } from '@shopify/polaris'; // Correct import for Card component
import { Checkbox, Col, ColorPicker, Flex, Input, Radio, Row, Segmented, Upload, Button as ButtonAnt } from 'antd';
import type { ConfigProviderProps, FlexProps, GetProp, SegmentedProps, UploadFile, UploadProps } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import '../../assets/css/banner.css'
const justifyOptions = [
    'flex-start',
    'center',
    'flex-end',
];

const alignOptions = ['flex-start', 'center', 'flex-end'];

const Home: React.FC = () => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [justify, setJustify] = React.useState<FlexProps['justify']>(justifyOptions[0]);
    const [alignItems, setAlignItems] = React.useState<FlexProps['align']>(alignOptions[0]);
    const [checkBox, setCheckBox] = useState<{ dataT: boolean, dataDes: boolean, outline: boolean }>({ dataT: false, dataDes: false, outline: false });
    const [banner, setBanner] = useState<any>({ sizeT: 'large', colorT: '#1677ff', sizeD: 'large', colorD: '#1677ff', colorB: '#000000', img: null, flexT: 'center', flexD: 'center' });
    const onChange = (checkedValues: string[]) => {
        setCheckBox(prevState => ({
            ...prevState,
            dataT: checkedValues.includes("Text"),
            // dataS: checkedValues.includes("Slibar")
        }));
    };
    const onChangeT = (checkedValues: string[]) => {
        setCheckBox(prevState => ({
            ...prevState,
            outline: checkedValues.includes("outline"),
            dataDes: checkedValues.includes("Des"),
        }));
    };

    const handleUploadChange = (info: any) => {
        let tmp = [];
        tmp.push(URL.createObjectURL(info.fileList[0].originFileObj));
        const objectUrls = tmp;
        setBanner({ ...banner, img: objectUrls });
    };
    console.log(banner);
    return (
            <div className='grid grid-cols-5 gap-4 m-8'>
                <div className="col-span-3">
                    <Card>
                        <div className='bg-white border-solid border-2 border-[#020617] rounded-lg p-3 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3'>
                            <strong className='font-serif text-sm w-24 col-span-1'> Choice type : </strong>
                            <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
                                <Row>
                                    <Col span={8}>
                                        <Checkbox value="Text">Text</Checkbox>
                                    </Col>
                                </Row>
                            </Checkbox.Group>
                        </div>
                        <div className='bg-white border-solid border-2 border-[#020617] rounded-lg mt-3 p-3 grid lg:grid-cols-3  md:grid-cols-2 sm:grid-cols-1 gap-3'>
                            <strong className='font-serif text-sm col-span-1'>Choice image : </strong>
                            <div className='col-span-2'>
                                <Upload
                                    listType="picture-card"
                                    maxCount={1}
                                    showUploadList={{ showPreviewIcon: false }}
                                    accept="image/*"
                                    onChange={handleUploadChange}
                                >
                                    <button style={{ border: 0, background: 'none' }} type="button">
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </button>
                                </Upload>
                            </div>
                        </div>
                        <div className={`${checkBox.dataT ? '' : 'hidden'}  bg-white border-solid border-2 border-[#020617] rounded-lg mt-3 p-3 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3`}>
                            <strong className='font-serif text-sm col-span-1'>Choice type of text  </strong>
                            <div className='col-span-2'>
                                <Checkbox.Group style={{ width: '100%' }} onChange={onChangeT}>
                                    <Row>
                                        <Col span={8}>
                                            <Checkbox value="Des">Description</Checkbox>
                                        </Col>
                                        <Col span={8}>
                                            <Checkbox value="outline">Outline</Checkbox>
                                        </Col>
                                    </Row>
                                </Checkbox.Group>
                            </div>
                            <strong className={`${checkBox.outline ? 'hidden' : ''} font-serif text-sm col-span-1`}>Choice color background : </strong>
                            <div className={`${checkBox.outline ? 'hidden' : ''} col-span-2`}>
                                <Input
                                    addonBefore={banner.colorB}
                                    type="color"
                                    value={banner.colorB}
                                    onChange={(e) => setBanner({ ...banner, colorB: e.target.value })}
                                    className="w-40"
                                />
                            </div>
                            <div className='col-span-3'>
                                <Flex gap="middle" align="start" vertical>
                                    <p className='font-serif text-sm '>Select justify :</p>
                                    <Segmented options={justifyOptions} onChange={setJustify as SegmentedProps['onChange']} />
                                    <p className='font-serif text-sm '>Select align :</p>
                                    <Segmented options={alignOptions} onChange={setAlignItems as SegmentedProps['onChange']} />
                                    {/* <p className='font-serif text-sm ' >Select type display :</p>
                                    <Flex style={boxStyle} justify={justify} align={alignItems} className='h-40 w-40 bg-[#e5e7eb] rounded-lg border-solid border-2 border-[#94a3b8]'>
                                        <div className='h-8 w-8 bg-[#fde68a] rounded-lg border-solid border-2 border-[#fde68a]' ></div>
                                    </Flex> */}
                                </Flex>
                            </div>
                        </div>
                        <div className={`${checkBox.dataT ? '' : 'hidden'} bg-white border-solid border-2 border-[#020617] rounded-lg mt-3 p-3 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3`}>
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
                        <div className={`${checkBox.dataDes ? '' : 'hidden'} bg-white border-solid border-2 border-[#020617] rounded-lg mt-3 p-3 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3`}>
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
                <div className="col-span-2">
                    <Card >
                        <div className={` ${banner.img === null ? 'hidden' : ''} banner-container border-solid border-2 border-[#020617] rounded-lg`}>
                            <img className="banner-image" src={banner.img} alt="Banner Image" />
                            <div className="banner-content" >
                                <h2 className="banner-title">{banner.title}</h2>
                                <p className="banner-description">{banner.description}</p>
                            </div>
                        </div>

                    </Card>
                </div>
            </div>
    );
};

export default Home;
