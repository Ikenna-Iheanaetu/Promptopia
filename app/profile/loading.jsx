import Image from "next/image";
import Loader from '@/public/icons/loader.svg';

const Loading = () => {
  return (
    <div className='w-full flex-center'>
      <Image
        src={Loader}
        width={50}
        height={50}
        alt='loader'
        className='object-contain'
      />
    </div>
  );
};

export default Loading;