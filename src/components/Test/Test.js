/* @flow */
import React from 'react'
import enhance from './enhance'

type Props = {
  testMsg: String
}

export const Test = (props: Props) => (
  <div>This is the message: {props.testMsg}</div>
)

export default enhance(Test)
