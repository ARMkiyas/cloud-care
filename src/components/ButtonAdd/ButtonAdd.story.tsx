import attributes from './attributes.json';
import { StoryWrapper } from '@/components/dash_AnaliticalComponets/StoryWrapper/StoryWrapper';
import { ButtonAdd } from './ButtonAdd';

export default { title: 'ButtonMenu' };

export function Usage() {
  return <StoryWrapper attributes={attributes} component={ButtonAdd} />;
}