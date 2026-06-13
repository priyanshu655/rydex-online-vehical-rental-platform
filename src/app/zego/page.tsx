'use client';

import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const Page = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { userData } = useSelector(
    (state: RootState) => state.user
  );

  const startCall = async () => {
    if (!containerRef.current) return;

    const appID = Number(
      process.env.NEXT_PUBLIC_ZEGO_APP_ID
    );

    const serverSecret =
      process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET;

    if (!appID || !serverSecret) {
      console.error('Missing Zego credentials');
      return;
    }

    const kitToken =
      ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        'test-room',
        userData?._id?.toString() || 'guest',
        userData?.name || 'Guest'
      );

    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: containerRef.current,
      sharedLinks: [
        {
          name: 'Copy Link',
          url: window.location.href,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
    });
  };

  return (
    <div className="h-screen">
      <button
        onClick={startCall}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Start Call
      </button>

      <div
        ref={containerRef}
        className="w-full h-[100vh]"
      />
    </div>
  );
};

export default Page;