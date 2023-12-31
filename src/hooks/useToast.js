import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const toastTypes = {
  error: toast.error,
  info: toast.info,
  success: toast.success,
  warning: toast.warn,
};

function dispatchToast(message, type, duration) {
  const toastFunc = toastTypes[type];
  if (toastFunc) {
    toastFunc(message, {
      position: "top-center",
      autoClose: duration ? duration : 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  } else {
    console.error("Invalid toast type!");
  }
}

export function useToast() {
  const [toastState, setToastState] = useState({
    isTriggered: false,
    toastType: null,
    toastMessage: null,
    duration: null
  });

  useEffect(() => {
    if (
      toastState.isTriggered &&
      toastState.toastType &&
      toastState.toastMessage
    ) {
      dispatchToast(toastState.toastMessage, toastState.toastType, toastState.duration);

      // Reset error state after displaying the toast
      setToastState({
        isTriggered: false,
        toastType: null,
        toastMessage: null,
        duration: null
      });
    }
  }, [toastState]);

  const triggerToast = (message, type, duration = null) => {
    setToastState({
      isTriggered: true,
      toastType: type,
      toastMessage: message,
      duration: duration
    });
  };

  return triggerToast;
}
