import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';

function QRCodeWrapper({ data }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (data) {
      setIsReady(true);
    }
  }, [data]);

  if (!isReady) {
    return null;
  }

  return <QRCode value={data} size={128} />;
}

export default QRCodeWrapper;
