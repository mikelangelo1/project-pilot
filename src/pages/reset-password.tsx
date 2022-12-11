/* eslint-disable react/jsx-one-expression-per-line */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ResetPassword from "../components/main/resetPassword";

import DefaultLayout from "../layouts/defaultLayout";
import { ResetPasswordUrl } from "../lib/common/endpoints";

interface QueryParamType {
  token: string;
  email: string;
}

const ResetPasswordPage = () => {
  const router = useRouter();

  const [queryParams, setQueryParams] = useState<QueryParamType | null>(null);

  useEffect(() => {
    if (!router.isReady) return;
    if (!router.query.c || !router.query.email) {
      router.push("login");
      return;
    }
    const queryP = {
      token: encodeURIComponent(router.query.c as string),
      email: router.query.email as string,
    };
    setQueryParams(queryP);
  }, [router]);

  if (!queryParams) return undefined;

  return (
    <ResetPassword
      resetPasswordLink={ResetPasswordUrl}
      reRouteLink="login"
      extraParams={queryParams}
    />
  );
};
ResetPasswordPage.getLayout = (page: any) => (
  <DefaultLayout>{page}</DefaultLayout>
);
export default ResetPasswordPage;
