import { trans } from "@mongez/localization";
import { Form, FormSubmitOptions } from "@mongez/react-form";
import { Link, navigateBack } from "@mongez/react-router";
import { useLogout } from "apps/front-office/account/hooks";
import { login } from "apps/front-office/account/service/auth";
import user from "apps/front-office/account/user";
import { SubmitButton } from "apps/front-office/design-system/components/Button";
import { EmailInputV2 } from "apps/front-office/design-system/components/Form/EmailInput";
import { PasswordInputV2 } from "apps/front-office/design-system/components/Form/PasswordInput";
import URLS from "apps/front-office/utils/urls";
import { IoMdLogOut } from "react-icons/io";
import { useToggleState } from "../../../Hooks/headerStateHook";
import "./_userDropDown.scss";

export default function UserDropDown() {
  const { groupState } = useToggleState();
  const submitLogin = ({ values }: FormSubmitOptions) => {
    login(values)
      .then(response => {
        user.login(response.data.user);
        navigateBack();
        // TODO: Display toast success
      })
      .catch(() => {});
  };

  const logout = useLogout();

  if (user.isLoggedIn() && !user.isGuest()) {
    return (
      <div
        className={`absolute top-[59px] border-primary-main overflow-hidden p-1 border-t duration-200 shadow-list transition-all bg-white   ${
          groupState.userIcon ? "opacity-100 visible" : "opacity-0 invisible"
        } rtl:left-[-50px] ltr:-right-[27px] focus:opacity-100 rtl:w-[150px]`}>
        <Link to={URLS.account.updateProfile}>Update Profile</Link>
        <Link to={URLS.orders.list}>My Orders</Link>
        <Link to={URLS.account.addressBook}>My Address</Link>
        <Link to={URLS.account.changePassword}>Change Password</Link>
        <button
          onClick={() => logout()}
          className="text-red-500 hover:text-red-700 p-2 flex items-center gap-2">
          {trans("logout")}
          <IoMdLogOut className="text-xl" />
        </button>
      </div>
    );
  }

  return (
    <div>
      <div
        className={`absolute top-[59px] border-primary-main overflow-hidden border-t duration-200 shadow-list transition-all bg-white flex flex-col w-[300px] h-[380px] p-5  ${
          groupState.userIcon ? "opacity-100 visible" : "opacity-0 invisible"
        } rtl:left-[0px] ltr:-right-[125px] pt-5 focus:opacity-100`}>
        <div className="h-[48px]">
          <span className="text-[18px] text-[#333]">{trans("signIn")}</span>
          <Link
            to={URLS.auth.register}
            className="text-primary-main text-[14px] hover:underline rtl:mr-2 ml-2">
            {trans("createAnAccount")}
          </Link>
        </div>
        <Form
          className="flex flex-col justify-between gap-4"
          onSubmit={submitLogin}>
          <EmailInputV2
            name="HeaderEmailForm"
            required
            label={trans("email")}
            placeholder={trans("email")}
            className="block w-full px-3 py-2 bg-white rounded-md"
          />

          <PasswordInputV2
            name="HeaderPasswordForm"
            required
            label={trans("password")}
            placeholder={trans("passwordLabel")}
            className="block w-full px-3 py-2 bg-white rounded-md"
          />

          <SubmitButton>{trans("login")}</SubmitButton>
        </Form>
        <div>
          <Link
            to={URLS.auth.resetPassword}
            className="text-primary-main text-[14px] hover:underline ">
            {trans("lostYourPassword")}
          </Link>
        </div>
      </div>
    </div>
  );
}
