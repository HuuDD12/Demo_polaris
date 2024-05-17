// import { AssetIcon } from '@/constants/icon';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { AssetIcon } from '@/constants/icon';

const LoadingPage = () => {
  return <div className="w-full h-screen overflow-hidden items-center flex justify-center">
    <div className="text-center flex flex-col">
      <img width={200} alt="Consentik CMS" src={AssetIcon.consentik} />
      <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
    </div>
  </div>;
};
export default LoadingPage;
