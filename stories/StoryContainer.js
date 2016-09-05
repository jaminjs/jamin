/* @flow */
import React from 'react'

type Props = {
  children: React.Element,
  style: Object
}

const styles = {
  container: {
    margin: '90px auto',
    width: 280
  }
}

const StoryContainer = (props: Props) => (
  <div style={{
    ...styles.container,
    ...props.style
  }}>
    {props.children}
  </div>
)

export default StoryContainer
