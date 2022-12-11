/* eslint-disable react/jsx-one-expression-per-line */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ButtonUI from "../components/utilities/ButtonUI";
import { useLoading } from "../context/loadingCtx";
import DefaultLayout from "../layouts/defaultLayout";
import { ConfirmEmailUrl, ResendEmailUrl } from "../lib/common/endpoints";
import { fetcher, postApi } from "../lib/helperFunctions/fetcher";
import formatFileName from "../lib/helperFunctions/formatFileName";

interface QueryType {
  code: string;
  userId: string;
}

const ConfirmEmail = () => {
  const router = useRouter();
  const { setLoadingStatus } = useLoading();

  const confirmAccount = (query: QueryType) => {
    router.push("/login");
    fetcher(
      `${ConfirmEmailUrl}?userId=${query.userId}&code=${query.code}`
    ).then((res) => {
      if (!res.successful) return;
      toast.success(res.message);
    });
  };

  const [currentCount, setCount] = useState(30);
  const timer = () => setCount(currentCount - 1);
  useEffect(() => {
    if (currentCount <= 0) {
      return;
    }
    const id = setInterval(timer, 1000);
    return () => clearInterval(id);
  }, [currentCount]);

  useEffect(() => {
    if (!router.isReady) return;
    if (router.query.userId || router.query.code || router.query.email) {
      const query: any = { ...router.query };
      if (query.code) {
        confirmAccount(query);
      }
      return;
    }
    router.push("login");
  }, [router]);

  const resendNotification = () => {
    setLoadingStatus(true);
    postApi(ResendEmailUrl, { email: router.query.email })
      .then((res) => {
        if (!res.successful) return;
        toast.success(res.message);
        setCount(30);
      })
      .finally(() => setLoadingStatus(false));
  };

  if (!router.query.email) return undefined;

  return (
    <div className="flex flex-col gap-2 px-2 text-center justify-center items-center h-[70vh] w-[100%]">
      <h3>
        A verification link have been sent to your email (
        {router.query.email
          ? formatFileName(router.query.email as string, 6, 8)
          : ""}
        )
      </h3>
      <p>
        If you didn&apos;t recieve the mail, click{" "}
        {currentCount !== 0 ? (
          `in ${currentCount}s`
        ) : (
          <button
            className="text-tertiary-high"
            onClick={resendNotification}
            type="button"
          >
            Here
          </button>
        )}
      </p>
      <ButtonUI onClickTrigger={() => router.push("login")} htmlType="submit">
        Go Back to Login
      </ButtonUI>
    </div>
  );
};
ConfirmEmail.getLayout = (page: any) => <DefaultLayout>{page}</DefaultLayout>;
export default ConfirmEmail;
