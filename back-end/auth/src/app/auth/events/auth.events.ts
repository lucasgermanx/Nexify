import { eventEmitter } from "@/config/events.config";
import { ActivateAccountSender } from "../rabbit/senders/activate-account.sender";
import { PasswordChangedSender } from "../rabbit/senders/password-changed.sender";
import { RecoverAccountSender } from "../rabbit/senders/recover-account.sender";
import { WelcomeAccountSender } from "../rabbit/senders/welcome-account.sender";

export const AuthEvents = () => {
  eventEmitter.on("user:create", (data) => {
    console.log(data);
    WelcomeAccountSender(data, "welcome");
  });

  eventEmitter.on("user:activated", (data) => {
    ActivateAccountSender(data, "activate_account");
  });

  eventEmitter.on("user:recovered", (data) => {
    RecoverAccountSender(data, "recover_account");
  });

  eventEmitter.on("user:passwordChanged", (data) => {
    PasswordChangedSender(data, "password_changed");
  });
};
