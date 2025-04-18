
// Interface for the Telegram WebApp object
interface TelegramWebApp {
  initData: string;
  initDataUnsafe: {
    user?: {
      id: number;
      first_name?: string;
      last_name?: string;
      username?: string;
      photo_url?: string;
    };
    start_param?: string;
  };
  ready: () => void;
  expand: () => void;
  close: () => void;
}

// Add the Telegram WebApp to the window object
declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}

export const getTelegramUser = () => {
  if (window.Telegram?.WebApp) {
    const { user } = window.Telegram.WebApp.initDataUnsafe;
    
    if (user) {
      return {
        telegramId: user.id.toString(),
        firstName: user.first_name,
        lastName: user.last_name,
        username: user.username,
        photoUrl: user.photo_url
      };
    }
  }
  
  return null;
};

export const initTelegramApp = () => {
  if (window.Telegram?.WebApp) {
    // Notify Telegram that the WebApp is ready
    window.Telegram.WebApp.ready();
    // Expand the Telegram WebApp to fullscreen
    window.Telegram.WebApp.expand();
  }
};
