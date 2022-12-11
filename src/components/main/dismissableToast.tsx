import * as React from "react";
import { toast, ToastBar, Toaster } from "react-hot-toast";
// import { HiX } from 'react-icons/hi';

export default function DismissableToast() {
  return (
    <div>
      <Toaster
        reverseOrder={false}
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            borderRadius: "3px",
            padding: "15px 4px",

            background: "#fff",
            color: "#000",
          },
          success: {
            style: {
              borderLeft: "6px solid green",
            },
          },
          error: {
            style: {
              borderLeft: "6px solid red",
            },
          },
        }}
      >
        {(t) => (
          <ToastBar toast={t}>
            {({ icon, message }) => (
              <>
                {icon}
                {message}
                {t.type !== "loading" && (
                  <button
                    type="button"
                    className="rounded-full p-1 px-2 ring-primary-400 transition hover:bg-primary-lower focus:outline-none focus-visible:ring"
                    onClick={() => toast.dismiss(t.id)}
                  >
                    <span>x</span>
                  </button>
                )}
              </>
            )}
          </ToastBar>
        )}
      </Toaster>
    </div>
  );
}
