import { useState, useEffect } from 'react';

export default function PWAInstallPrompt() {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    if (dismissed === 'true') {
      setIsDismissed(true);
    }

    const handler = (e) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const onClickInstall = (evt) => {
    evt.preventDefault();
    if (!promptInstall) return;

    promptInstall.prompt();

    promptInstall.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        setIsInstalled(true);
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
    });
  };

  const onDismiss = () => {
    localStorage.setItem('pwa-install-dismissed', 'true');
    setIsDismissed(true);
  };

  if (!supportsPWA || isInstalled || isDismissed) return null;

  return (
    <div className="fixed bottom-4 right-4 max-w-sm p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 z-50">
      <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
        Install Vitamin Job
      </h3>
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
        Add this app to your home screen for a better experience !
      </p>
      <div className="flex justify-end space-x-2">
        <button
          onClick={onDismiss}
          className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:underline"
        >
          Dismiss
        </button>
        <button
          onClick={onClickInstall}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
        >
          Install App
        </button>
      </div>
    </div>
  );
}
