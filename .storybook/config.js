import { configure } from '@kadira/storybook';

function loadStories() {
  require('../stories/Test');
}

configure(loadStories, module);
