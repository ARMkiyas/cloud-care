import attributes from "./attributes.json";
import { StoryWrapper } from "../dash_AnaliticalComponets/StoryWrapper/StoryWrapper";
import StatsGrid from "./StatsGrid";

export default { title: "StatsGrid" };

export function Usage() {
  return <StoryWrapper attributes={attributes} component={StatsGrid} />;
}
