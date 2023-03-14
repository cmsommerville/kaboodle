import { PostRecipient } from "@/types/Post";

interface HandleProps {
  message: string;
  recipients: PostRecipient[];
}
const MessageWithHandles = ({ message, recipients }: HandleProps) => {
  const reg_ex = /(@\{[A-Za-z0-9_\-]*\})/;
  const msg_array = message.split(reg_ex);
  return (
    <>
      {msg_array.map((token) => {
        // if token doesn't match handle regex, return token
        if (!reg_ex.test(token)) return <span>{token}</span>;
        // find the recipient object
        const recipient = recipients.find((r) => {
          return `@{${r.recipient.user_code}}`.trim() === token.trim();
        });
        // if no match, return token
        if (!recipient) return <span>{token}</span>;
        // return the handle reformatted into first and last name
        return (
          <span className="text-primary-700 underline">
            {`@${recipient.recipient.first_name} ${recipient.recipient.last_name}`}
          </span>
        );
      })}
    </>
  );
};

export default MessageWithHandles;
