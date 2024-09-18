import Image from 'next/image';

const Loader = () => {
  return (
    <div className="flex-center h-screen w-full">
      <Image
        src="https://raw.githubusercontent.com/adrianhajdin/zoom-clone/29cc1b776a82f804451dc56064df7de6c742a204/public/icons/loading-circle.svg"
        alt="Loading..."
        width={50}
        height={50}
      />
    </div>
  );
};

export default Loader;