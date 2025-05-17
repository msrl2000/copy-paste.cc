import React, { useEffect, useRef, useState } from 'react';
import jsQR from 'jsqr';
import { useTranslation } from 'react-i18not';
import styles from './QrScannerModal.module.scss';

interface QrScannerModalProps {
  onClose: () => void;
}

export const QrScannerModal: React.FC<QrScannerModalProps> = ({ onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | undefined>(undefined);
  const { t } = useTranslation();

  // Navigate to scanned URL
  const handleScan = (data: string) => {
    try {
      if (data.startsWith('http://') || data.startsWith('https://')) {
        window.location.href = data;
      } else {
        // Assume it's a network name path like /XYZ
        window.location.hash = data;
        window.location.href = data;
      }
    } catch {}
  };

  useEffect(() => {
    let stream: MediaStream;
    let animationId: number;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          tick();
        }
      } catch (e) {
        setError('camera');
      }
    };

    const tick = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas) {
        return;
      }

      const width = video.videoWidth;
      const height = video.videoHeight;

      if (width && height) {
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0, width, height);
          const imageData = ctx.getImageData(0, 0, width, height);
          const code = jsQR(imageData.data, width, height, {
            inversionAttempts: 'dontInvert',
          });
          if (code?.data) {
            cleanup();
            handleScan(code.data);
            return;
          }
        }
      }
      animationId = requestAnimationFrame(tick);
    };

    const cleanup = () => {
      if (animationId) cancelAnimationFrame(animationId);
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      onClose();
    };

    startCamera();

    return () => cleanup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.scannerWrapper}>
      {error ? (
        <div>{t('qrScanner.error')}</div>
      ) : (
        <>
          <video ref={videoRef} className={styles.video} playsInline />
          <canvas ref={canvasRef} className={styles.canvas} />
          <div className={styles.hint}>{t('qrScanner.hint')}</div>
        </>
      )}
    </div>
  );
}; 