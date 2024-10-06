import dynamic from 'next/dynamic';

const SokobanGame = dynamic(() => import('@/components/SokobanGame'), { ssr: false });

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <SokobanGame />
    </div>
  );
}