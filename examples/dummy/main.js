import { NewsHandler, userSignedupHandler } from "./glee";

export default function Index() {
  const [notifications, setNotifications] = useState("");

  NewsHandler((message) => {
    setNotifications(message.payload);
  });

  return (
    <div>
      {notifications.map((notification) => (
        <div key={notification.id}>{notification.body}</div>
      ))}

      <Button
        onClick={() => {
          userSignedupHandler(() => {
            return [
              {
                reply: { payload: userData },
              },
            ];
          });
        }}
      >
        Signup
      </Button>
    </div>
  );
}
