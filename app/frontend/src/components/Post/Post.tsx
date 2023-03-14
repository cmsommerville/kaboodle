import AppPanel from "@/components/AppPanel";
import { User } from "@/types/User";
import { UserIcon } from "@heroicons/react/24/outline";
import moment from "moment";

interface PostProps {
  user: User | undefined;
  children: JSX.Element;
}

const Post = ({ user, children, ...props }: PostProps) => {
  return (
    <AppPanel {...props}>
      <div className="flex flex-col text-gray-600 space-y-3">
        {user ? (
          <div className="flex space-x-3">
            {user.avatar ? (
              <img
                src={`/assets/${user.avatar}`}
                className="h-12 w-12 rounded-full object-cover ring-2 ring-white"
              />
            ) : (
              <div className="h-12 w-12 rounded-full ring-2 ring-gray-200 p-2 bg-gray-200 text-gray-400">
                <UserIcon />
              </div>
            )}
            <div>
              <h4 className="text-md font-semibold">{`${user.first_name} ${user.last_name}`}</h4>
              <p className="text-xs text-gray-300">
                {moment().format("MMMM D, YYYY")}
              </p>
            </div>
          </div>
        ) : (
          <></>
        )}
        {children}
      </div>
    </AppPanel>
  );
};

export default Post;
