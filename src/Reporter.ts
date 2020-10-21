import { EventManager } from "./EventManager";

export const Reporter = () => {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    this.eventManager.emit("testSuiteStarted", () => {});

    this.eventManager.on("testSuiteCompleted", () => {
      console.log("testSuiteCompleted");
    });
  }, []);

  return null;
};
