/* @flow */
import React from 'react'
import { compose, lifecycle, branch, renderComponent } from 'recompose'

type ErrorMsgProps = {
  errorMsg: String
}

const ErrorMsg = (props: ErrorMsgProps) => <div>Error! {props.errorMsg}</div>
const identity = (t) => t

export const enhance = compose(
  lifecycle({
    componentDidMount() {
      /* eslint-disable immutable/no-this */
      if (this.props.testOnMount) {
        this.props.testOnMount()
      }
      /* eslint-enable immutable/no-this */
    }
  }),
  branch(
    (props) => props.errorMsg,
    renderComponent(ErrorMsg),
    identity
  )
)

export default enhance
