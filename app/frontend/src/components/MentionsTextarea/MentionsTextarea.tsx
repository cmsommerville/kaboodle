import {
  MentionsInput,
  Mention,
  DisplayTransformFunc,
  SuggestionDataItem,
  MentionsInputProps,
} from "react-mentions";
import css from "./mentions.module.css";

interface MentionsTextareaProps
  extends Omit<MentionsInputProps, "onChange" | "children"> {
  value: string;
  onChange: (value: string) => any;
  onMention: (id: string | number, display: string) => void;
  userList: SuggestionDataItem[];
  markup?: string;
  displayTransform?: DisplayTransformFunc;
}

const MentionsTextarea = ({ onChange, ...props }: MentionsTextareaProps) => {
  return (
    <MentionsInput
      onChange={(e: any) => onChange(e.target.value)}
      className="mentions"
      classNames={css}
      {...props}
    >
      <Mention
        className={css.mentions__mention}
        trigger="@"
        data={props.userList}
        markup={props.markup}
        onAdd={props.onMention}
        displayTransform={props.displayTransform}
      />
    </MentionsInput>
  );
};

MentionsTextarea.defaultProps = {
  displayTransform: (id: string, display: string) => `@${display}`,
  markup: "@{__display__}",
};

export default MentionsTextarea;
