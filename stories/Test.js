/* @flow */
import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import StoryContainer from './StoryContainer'
import Test from 'components/Test'

storiesOf('Test', module)
  .add('standard', () => (
    <StoryContainer>
      <Test testMsg="cool!" testOnMount={action('mounted')} />
    </StoryContainer>
  ))
  .add('error', () => (
    <StoryContainer>
      <Test errorMsg="this is an error!" />
    </StoryContainer>
  ))
